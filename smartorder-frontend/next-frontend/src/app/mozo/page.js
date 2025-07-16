"use client";
import React, { useEffect, useState } from "react";
import MozoMesaSelector from "./MozoMesaSelector";
import MozoMenu from "./MozoMenu";
import MozoPedidoActual from "./MozoPedidoActual";
import MozoMesaOcupadaPanel from "./MozoMesaOcupadaPanel";
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
  const [esEdicion, setEsEdicion] = useState(false);
  const [pedidoAbiertoId, setPedidoAbiertoId] = useState(null);
  const [pedidoMesaOcupada, setPedidoMesaOcupada] = useState(null);
  const [refreshMesasKey, setRefreshMesasKey] = useState(Date.now());

  // SINCRONIZA DATOS AL INICIAR
  const cargarMesasYProductos = async () => {
    const token = localStorage.getItem("token");
    const mesasResp = await axios.get("http://localhost:3001/api/mesas", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const productosResp = await axios.get("http://localhost:3001/api/products", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMesas(mesasResp.data);
    setProductos(productosResp.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || (role !== "waiter" && role !== "admin")) {
      window.location.href = "/unauthorized";
    } else {
      setVerificandoRol(false);
      cargarMesasYProductos();
    }
  }, []);

  // RESET GENERAL: siempre deja todo limpio y actualiza mesas (después de acciones)
  const refrescarMesasYReset = async () => {
    await cargarMesasYProductos();
    setStep(0);
    setMesaSeleccionada(null);
    setPedidoMesaOcupada(null);
    setEsEdicion(false);
    setPedidoAbiertoId(null);
    setPedido([]);
    setNota("");
    setRefreshMesasKey(Date.now());
  };

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

  // ----- FLUJO AL SELECCIONAR UNA MESA -----
  const handleMesaNext = async () => {
    if (!mesaSeleccionada) return;
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3001/api/orders?mesa=" + mesaSeleccionada, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const abiertos = res.data.filter(
      o =>
        [
          "pendiente",
          "en preparación",
          "listo",
          "en mesa",
          "a cobrar",
          "pagado"
        ].includes(o.status)
    );
    if (abiertos.length > 0) {
      setEsEdicion(true);
      setPedidoAbiertoId(abiertos[0]._id);
      setPedidoMesaOcupada(abiertos[0]);
      setStep("mesa-ocupada");
    } else {
      setEsEdicion(false);
      setPedidoAbiertoId(null);
      setPedidoMesaOcupada(null);
      setPedido([]); // reset
      setNota("");   // reset
      setStep(1);
    }
  };

  // Handler para finalizar/cobrar
  const handleFinalizarCobrar = async () => {
    if (!pedidoAbiertoId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3001/api/orders/${pedidoAbiertoId}/status`,
        { status: "a cobrar" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Pedido enviado a caja para cobrar");
      await refrescarMesasYReset();
    } catch (error) {
      console.error(error);
      alert("Error al finalizar/cobrar pedido");
    }
  };

  // Handler para editar pedido (agregar productos)
  const handleEditarPedido = () => {
    setStep(1); // Va al menú para agregar productos
  };

  // Handler para marcar pedido en mesa
  const handlePedidoEnMesa = async () => {
    if (!pedidoAbiertoId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3001/api/orders/${pedidoAbiertoId}/status`,
        { status: "en mesa" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Marcado como entregado en mesa");
      await refrescarMesasYReset();
    } catch (error) {
      console.error(error);
      alert("Error al marcar pedido en mesa");
    }
  };

  // Handler para liberar mesa (solo si pedido.status === "pagado")
  const handleLiberarMesa = async () => {
    if (!mesaSeleccionada) return;
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3001/api/mesas/${mesaSeleccionada}/liberar`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Mesa liberada correctamente");
      await refrescarMesasYReset();
    } catch (error) {
      console.error(error);
      alert("Error al liberar mesa");
    }
  };

  // Función para enviar el pedido o agregar productos (igual que antes)
  const onSend = async () => {
    const token = localStorage.getItem("token");
    if (!mesaSeleccionada) {
      alert("Debe seleccionar una mesa antes de enviar el pedido.");
      return;
    }
    if (pedido.length === 0) {
      alert("No hay productos en el pedido para enviar.");
      return;
    }

    const items = pedido.map((p) => {
      const producto = productos.find(pr => pr._id === p.productoId);
      if (!producto) {
        alert(`Producto no encontrado: ${p.productoId}`);
        throw new Error(`Producto no encontrado: ${p.productoId}`);
      }
      const categoria = (producto.category || "").toString().trim().toLowerCase();
      let sector = "cocina"; // default
      if (categoria === "bebida" || categoria === "bebidas") sector = "barra";
      return {
        product: p.productoId,
        quantity: p.cantidad,
        sector
      };
    });

    if (items.some(i => !i.sector)) {
      alert("Algún producto no tiene sector. Revisá las categorías en el panel de productos.");
      return;
    }

    if (esEdicion && pedidoAbiertoId) {
      try {
        await axios.patch(
          `http://localhost:3001/api/orders/${pedidoAbiertoId}/add-products`,
          { nuevosItems: items },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Si el pedido estaba "en mesa", ponelo en "en preparación"
        if (pedidoMesaOcupada && pedidoMesaOcupada.status === "en mesa") {
          await axios.patch(
            `http://localhost:3001/api/orders/${pedidoAbiertoId}/status`,
            { status: "en preparación" },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
        alert("Productos agregados al pedido abierto");
        setPedido([]);
        setNota("");
        await refrescarMesasYReset();
      } catch (error) {
        console.error("Error al agregar productos", error);
        alert("Error al agregar productos");
      }
    } else {
      axios.post(
        "http://localhost:3001/api/orders",
        { items, notes: nota, mesa: mesaSeleccionada },
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(() => {
          alert("Pedido enviado correctamente");
          setPedido([]);
          setNota("");
          refrescarMesasYReset();
        })
        .catch((error) => {
          console.error("Error al enviar pedido", error);
          alert("Error al enviar pedido");
        });
    }
  };

  // ----- RENDER -----
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
                onNext={handleMesaNext}
                setPedidoActual={setEsEdicion}
                refreshKey={refreshMesasKey}
              />
            </div>
          )}
          {step === "mesa-ocupada" && (
            <div className="bg-[#111827] rounded-xl p-4 shadow-lg overflow-auto h-full">
              <MozoMesaOcupadaPanel
                mesa={mesas.find((m) => m._id === mesaSeleccionada) || null}
                pedido={pedidoMesaOcupada}
                onFinalizarCobrar={handleFinalizarCobrar}
                onEditarPedido={handleEditarPedido}
                onPedidoEnMesa={handlePedidoEnMesa}
                onLiberarMesa={handleLiberarMesa}
                onVolver={refrescarMesasYReset}
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
                onBack={refrescarMesasYReset}
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
                esEdicion={esEdicion}
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
              onNext={handleMesaNext}
              setPedidoActual={setEsEdicion}
              refreshKey={refreshMesasKey}
            />
          </div>
          <div
            className={`absolute w-full top-0 left-0 transition-all duration-500 ease-in-out ${
              step === "mesa-ocupada"
                ? "opacity-100 translate-x-0 z-10"
                : step < 1
                ? "opacity-0 -translate-x-10 pointer-events-none z-0"
                : "opacity-0 translate-x-10 pointer-events-none z-0"
            }`}
            style={{ height: "100vh", overflowY: "auto" }}
          >
            <MozoMesaOcupadaPanel
              mesa={mesas.find((m) => m._id === mesaSeleccionada) || null}
              pedido={pedidoMesaOcupada}
              onFinalizarCobrar={handleFinalizarCobrar}
              onEditarPedido={handleEditarPedido}
              onPedidoEnMesa={handlePedidoEnMesa}
              onLiberarMesa={handleLiberarMesa}
              onVolver={refrescarMesasYReset}
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
              onBack={refrescarMesasYReset}
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
              esEdicion={esEdicion}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
