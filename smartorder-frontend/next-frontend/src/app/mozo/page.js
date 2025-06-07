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

  const getCantidad = id => pedido.find(p => p.productoId === id)?.cantidad || 0;
  const setCantidad = (id, cantidad) => {
    setPedido(prev => {
      if (cantidad < 1) return prev.filter(p => p.productoId !== id);
      if (prev.find(p => p.productoId === id)) {
        return prev.map(p => p.productoId === id ? { ...p, cantidad } : p);
      } else {
        return [...prev, { productoId: id, cantidad }];
      }
    });
  };
  const quitarProducto = id => setPedido(prev => prev.filter(p => p.productoId !== id));


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#23232d] p-2">
      <div className="bg-[#161617] text-white rounded-2xl shadow-md w-full max-w-md flex flex-col relative overflow-hidden" style={{minHeight: 650, maxHeight: '98vh'}}>
        <header className="sticky top-0 z-30 bg-gradient-to-r from-blue-900 to-blue-700 rounded-t-2xl px-6 py-5 flex items-center justify-between shadow-xl gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white text-blue-900 font-black rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-xl border-2 border-blue-400">
              M
            </div>
            <span className="font-black text-white text-2xl tracking-wide drop-shadow font-[Montserrat,Inter,sans-serif]">Martin Water</span>
          </div>
          <button className="relative p-2 rounded-full bg-blue-800 hover:bg-blue-600 transition shadow focus:outline-none" aria-label="Notificaciones">
            <span className="text-2xl">🔔</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow border-2 border-blue-800 animate-pulse">1</span>
          </button>
        </header>
        <div className="relative w-full flex-1 flex flex-col bg-[#18181c] pt-2 px-0" style={{overflowY: 'auto', minHeight: 0}}>
            
          <div className={`absolute w-full top-0 left-0 transition-all duration-500 ${step === 0 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 -translate-x-10 pointer-events-none z-0'}`} style={{minHeight: 'calc(70vh - 2rem)'}}>
            <MozoMesaSelector
              mesas={mesasMock}
              mesaSeleccionada={mesaSeleccionada}
              setMesaSeleccionada={setMesaSeleccionada}
              onNext={() => setStep(1)}
            />
          </div>

          <div className={`absolute w-full top-0 left-0 transition-all duration-500 ${step === 1 ? 'opacity-100 translate-x-0 z-10' : step < 1 ? 'opacity-0 -translate-x-10 pointer-events-none z-0' : 'opacity-0 translate-x-10 pointer-events-none z-0'}`} style={{minHeight: 'calc(70vh - 2rem)'}}>
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
          
          <div className={`absolute w-full top-0 left-0 transition-all duration-500 ${step === 2 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-10 pointer-events-none z-0'}`} style={{minHeight: 'calc(70vh - 2rem)'}}>
            <MozoPedidoActual
              mesa={mesasMock.find(m => m.id === mesaSeleccionada) || null}
              productos={productosMock}
              pedido={pedido}
              nota={nota}
              setNota={setNota}
              setCantidad={setCantidad}
              quitarProducto={quitarProducto}
              onBack={() => setStep(1)}
              onSend={() => alert('Pedido enviado (mock)')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}