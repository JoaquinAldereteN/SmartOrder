"use client";
import React, { useState } from "react";
import MozoMesaSelector from "./MozoMesaSelector";
import MozoMenu from "./MozoMenu";
import MozoPedidoActual from "./MozoPedidoActual";

const mesasMock = [
  { id: 1, sector: "Especiales", numero: "VIP 1", nombre: "VIP 1" },
  { id: 2, sector: "Interior", numero: "10", nombre: "10" },
  { id: 3, sector: "Interior", numero: "11", nombre: "11" },
  { id: 4, sector: "Exterior", numero: "18", nombre: "18" },
  { id: 5, sector: "Exterior", numero: "19", nombre: "19" },
  { id: 6, sector: "Deck", numero: "Deck 1", nombre: "Deck 1" },
];
const productosMock = [
  { id: 1, nombre: "Milanesa Napolitana", categoria: "Comida", precio: 2500 },
  { id: 2, nombre: "Roast Beef", categoria: "Comida", precio: 4000 },
  { id: 3, nombre: "Empanada de carne", categoria: "Comida", precio: 1500 },
  { id: 4, nombre: "Empanada de queso", categoria: "Comida", precio: 1300 },
  { id: 5, nombre: "Blue Label", categoria: "Bebida", precio: 12000 },
  { id: 6, nombre: "Coca Cola 500cc", categoria: "Bebida", precio: 2500 },
  { id: 7, nombre: "Sprite 500cc", categoria: "Bebida", precio: 2500 },
  { id: 8, nombre: "Limonada 1L", categoria: "Bebida", precio: 4000 },
];

export default function MozoPage() {
  const [step, setStep] = useState(0);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [pedido, setPedido] = useState([]);
  const [nota, setNota] = useState("");

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

    return (
    <div className="min-h-screen flex flex-col bg-[#131416] text-white h-screen w-screen">
     <header className="sticky top-0 z-30 bg-gray-900 px-4 md:px-6 py-4 flex items-center justify-between shadow-md">
          <h1 className="text-white text-lg md:text-2xl font-semibold">
            Panel del Mozo
          </h1>
     </header>


      <main className="flex-1 p-3 md:p-4 overflow-auto flex justify-center items-start h-full w-full">
        {/* Escritorio */}
        <div className="hidden md:block w-full max-w-3xl mx-auto h-full">
          {step === 0 && (
            <div className="bg-[#111827] rounded-xl p-4 shadow-lg overflow-auto h-full">
              <MozoMesaSelector
                mesas={mesasMock}
                mesaSeleccionada={mesaSeleccionada}
                setMesaSeleccionada={setMesaSeleccionada}
                onNext={() => setStep(1)}
              />
            </div>
          )}
          {step === 1 && (
            <div className="bg-[#111827] rounded-xl p-4 shadow-lg overflow-auto h-full">
              <MozoMenu
                productos={productosMock}
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
                mesa={mesasMock.find((m) => m.id === mesaSeleccionada) || null}
                productos={productosMock}
                pedido={pedido}
                nota={nota}
                setNota={setNota}
                setCantidad={setCantidad}
                quitarProducto={quitarProducto}
                onBack={() => setStep(1)}
                onSend={() => alert("Pedido enviado (mock)")}
              />
            </div>
          )}
        </div>

        {/* Móvil */}
        <div className="md:hidden relative w-full max-w-full h-screen">
          <div
            className={`absolute w-full top-0 left-0 transition-all duration-500 ease-in-out ${
              step === 0
                ? "opacity-100 translate-x-0 z-10"
                : "opacity-0 -translate-x-10 pointer-events-none z-0"
            }`}
            style={{ height: "100vh", overflowY: "auto" }}
          >
            <MozoMesaSelector
              mesas={mesasMock}
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
              productos={productosMock}
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
              step === 2
                ? "opacity-100 translate-x-0 z-10"
                : "opacity-0 translate-x-10 pointer-events-none z-0"
            }`}
            style={{ height: "100vh", overflowY: "auto" }}
          >
            <MozoPedidoActual
              mesa={mesasMock.find((m) => m.id === mesaSeleccionada) || null}
              productos={productosMock}
              pedido={pedido}
              nota={nota}
              setNota={setNota}
              setCantidad={setCantidad}
              quitarProducto={quitarProducto}
              onBack={() => setStep(1)}
              onSend={() => alert("Pedido enviado (mock)")}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
