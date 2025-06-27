"use client";
import React, { useEffect, useState } from "react";
import MozoMesaSelector from "./MozoMesaSelector";
import MozoMenu from "./MozoMenu";
import MozoPedidoActual from "./MozoPedidoActual";
import axios from "axios";

export default function MozoPage() {
  const [mesas, setMesas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [pedido, setPedido] = useState([]);
  const [nota, setNota] = useState("");
  const [step, setStep] = useState(0);
  const [verificandoRol, setVerificandoRol] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
  
    if (!token || (role !== 'waiter' && role !== 'admin')) {
      window.location.href = '/unauthorized';
    } else {
      setVerificandoRol(false);
    }
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:3001/api/mesas", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        console.log("Mesas recibidas:", res.data);
        setMesas(res.data);
      })
      .catch((error) => {
        console.error("Error al cargar mesas", error);
        alert("Error al cargar mesas");
      });

    axios.get("http://localhost:3001/api/products", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        console.log("Productos recibidos:", res.data);
        setProductos(res.data);
      })
      .catch((error) => {
        console.error("Error al cargar productos", error);
        alert("Error al cargar productos");
      });
  }, []);

  const getCantidad = (id) => pedido.find((p) => p.productoId === id)?.cantidad || 0;

  const setCantidad = (id, cantidad) => {
    setPedido((prev) => {
      if (cantidad < 1) return prev.filter((p) => p.productoId !== id);
      if (prev.find((p) => p.productoId === id)) {
        return prev.map((p) => (p.productoId === id ? { ...p, cantidad } : p));
      } else {
        return [...prev, { productoId: id, cantidad }];
      }
    });
  };

  const quitarProducto = (id) => setPedido((prev) => prev.filter((p) => p.productoId !== id));

  // Función para enviar el pedido al backend
  const onSend = () => {
    const token = localStorage.getItem("token");
    if (!mesaSeleccionada) {
      alert("Debe seleccionar una mesa antes de enviar el pedido.");
      return;
    }
    if (pedido.length === 0) {
      alert("No hay productos en el pedido para enviar.");
      return;
    }

    const items = pedido.map((p) => ({
      product: p.productoId,
      quantity: p.cantidad,
    }));

    axios.post(
      "http://localhost:3001/api/orders",
      { items, notes: nota, mesa: mesaSeleccionada }, // Aseguramos que mesa sea número
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        alert("Pedido enviado correctamente");
        setPedido([]);
        setNota("");
        setStep(0);
        setMesaSeleccionada(null);
      })
      .catch((error) => {
        console.error("Error al enviar pedido", error);
        alert("Error al enviar pedido");
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#131416] text-white h-screen w-screen">
      <header className="sticky top-0 z-30 bg-gray-900 px-4 md:px-6 py-4 flex items-center justify-between shadow-md">
        <h1 className="text-white text-lg md:text-2xl font-semibold">
          Panel del Mozo
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/";
          }}
          className="text-sm bg-red-600 hover:bg-red-700 transition-colors text-white px-3 py-1 rounded-md"
          title="Cerrar sesión"
        >
          Cerrar sesión
        </button>
      </header>

      <main className="flex-1 p-3 md:p-4 overflow-auto flex justify-center items-start h-full w-full">
        {/* Escritorio */}
        <div className="hidden md:block w-full max-w-3xl mx-auto h-full">
          {step === 0 && (
            <div className="bg-[#111827] rounded-xl p-4 shadow-lg overflow-auto h-full">
              <MozoMesaSelector
                mesas={mesas}
                mesaSeleccionada={mesaSeleccionada}
                setMesaSeleccionada={setMesaSeleccionada}
                onNext={() => setStep(1)}
              />
            </div>
          )}
          {step === 1 && (
            <div className="bg-[#111827] rounded-xl p-4 shadow-lg overflow-auto h-full">
              <MozoMenu
                productos={productos}
                pedido={pedido}
                setCantidad={setCantidad}
                getCantidad={getCantidad}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                onBack={() => setStep(0)}
                onNext={() => setStep(2)}
              />
            </div>
          )}
          {step === 2 && (
            <div className="bg-[#111827] rounded-xl p-4 shadow-lg overflow-auto h-full">
              <MozoPedidoActual
                mesa={mesas.find((m) => m._id === mesaSeleccionada) || null}
                productos={productos}
                pedido={pedido}
                nota={nota}
                setNota={setNota}
                setCantidad={setCantidad}
                quitarProducto={quitarProducto}
                onBack={() => setStep(1)}
                onSend={onSend}
              />
            </div>
          )}
        </div>

        {/* Móvil */}
        <div className="md:hidden relative w-full max-w-full h-screen">
          <div
            className={`absolute w-full top-0 left-0 transition-all duration-500 ease-in-out ${
              step === 0 ? "opacity-100 translate-x-0 z-10" : "opacity-0 -translate-x-10 pointer-events-none z-0"
            }`}
            style={{ height: "100vh", overflowY: "auto" }}
          >
            <MozoMesaSelector
              mesas={mesas}
              mesaSeleccionada={mesaSeleccionada}
              setMesaSeleccionada={setMesaSeleccionada}
              onNext={() => setStep(1)}
            />
          </div>

          <div
            className={`absolute w-full top-0 left-0 transition-all duration-500 ease-in-out ${
              step === 1
                ? "opacity-100 translate-x-0 z-10"
                : step < 1
                ? "opacity-0 -translate-x-10 pointer-events-none z-0"
                : "opacity-0 translate-x-10 pointer-events-none z-0"
            }`}
            style={{ height: "100vh", overflowY: "auto" }}
          >
            <MozoMenu
              productos={productos}
              pedido={pedido}
              setCantidad={setCantidad}
              getCantidad={getCantidad}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              onBack={() => setStep(0)}
              onNext={() => setStep(2)}
            />
          </div>

          <div
            className={`absolute w-full top-0 left-0 transition-all duration-500 ease-in-out ${
              step === 2 ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-10 pointer-events-none z-0"
            }`}
            style={{ height: "100vh", overflowY: "auto" }}
          >
            <MozoPedidoActual
              mesa={mesas.find((m) => m._id === mesaSeleccionada) || null}
              productos={productos}
              pedido={pedido}
              nota={nota}
              setNota={setNota}
              setCantidad={setCantidad}
              quitarProducto={quitarProducto}
              onBack={() => setStep(1)}
              onSend={onSend}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
