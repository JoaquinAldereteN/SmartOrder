"use client";
import React, { useState } from "react";

const pedidosMock = [
  {
    id: 65,
    mesa: 5,
    mozo: "Martin Water",
    estado: "Pendiente",
    hora: "12:50 PM",
    notas: "Empanadas de carne fritas, empanadas de queso al horno y 2 coca cola con hielo y limón",
    detalle: [
      { nombre: "Coca Cola", cantidad: 2, precio: 2500, total: 5000 },
      { nombre: "Empanadas de carne", cantidad: 6, precio: 1500, total: 9000 },
      { nombre: "Empanadas de queso", cantidad: 2, precio: 1500, total: 3000 },
      { nombre: "Picada de mariscos", cantidad: 1, precio: 40000, total: 40000 }
    ]
  },
  {
    id: 68,
    mesa: 15,
    mozo: "Patrick Costa",
    estado: "Pagada",
    hora: "01:25 PM",
    notas: "El lomo a punto jugoso, la milanesa al horno y las dos empanadas van de entrada y fritas",
    detalle: [
      { nombre: "Roast Beef", cantidad: 1, precio: 22000, total: 22000 },
      { nombre: "Milanesa Napolitana", cantidad: 1, precio: 18000, total: 18000 },
      { nombre: "Empanadas de carne", cantidad: 2, precio: 1500, total: 3000 }
    ]
  },
   {
    id: 69,
    mesa: 12,
    mozo: "Patrick Costa",
    estado: "Pendiente",
    hora: "00:25 PM",
    notas: "Hamburguesa sin verduras y sin salsa cheddar",
    detalle: [
      { nombre: "Hamburguesa", cantidad: 1, precio: 8000, total: 8000 },
      { nombre: "Extra Carne", cantidad: 1, precio: 7500, total: 7500 },
      { nombre: "Stella Artois 1L", cantidad: 1, precio: 8000, total: 8500 }
    ]
  }
];






const badgeColor = (estado) => {
  switch (estado) {
    case "Pendiente": return "bg-orange-800 text-orange-100";
    case "Pagada": return "bg-green-800 text-green-100";
    case "Cancelada": return "bg-red-800 text-red-100";
    default: return "bg-gray-600 text-white";
  }
};

export default function CajaBoxPage() {
  const [mesaBuscada, setMesaBuscada] = useState("");
  const [mozoSeleccionado, setMozoSeleccionado] = useState("");

  const mozosUnicos = [...new Set(pedidosMock.map((p) => p.mozo))];

  const pedidosFiltrados = pedidosMock.filter((pedido) => {
    const mesaCoincide =
      mesaBuscada === "" || pedido.mesa.toString().includes(mesaBuscada);
    const mozoCoincide =
      mozoSeleccionado === "" || pedido.mozo === mozoSeleccionado;
    return mesaCoincide && mozoCoincide;
  });

  return (
    <div className="flex flex-row gap-6 w-full">
      {/* Columna izquierda: pedidos */}
      <div className="flex-1 space-y-6">
        {pedidosFiltrados.map((pedido) => {
          const total = pedido.detalle.reduce((acc, item) => acc + item.total, 0);
          return (
            <div
              key={pedido.id}
              className="bg-[#1b1b1e] text-white border border-[#2d2d30] rounded-xl p-6 shadow-xl w-full"
            >
              <div className="flex justify-between items-center">
                <div className="text-sm text-blue-400 font-semibold">
                  Pedido: #{pedido.id.toString().padStart(3, "0")}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${badgeColor(pedido.estado)}`}>
                    {pedido.estado}
                  </span>
                  <span className="text-xs text-gray-400">{pedido.hora}</span>
                </div>
              </div>

              <div className="mt-2 mb-2">
                <span className="inline-block text-white bg-blue-600 rounded-full px-4 py-1 text-sm font-semibold">
                  Mesa {pedido.mesa}
                </span>
              </div>

              <div className="text-sm text-gray-300 flex items-center gap-2 mb-1">
                <span>👤</span>
                <span className="font-medium">Mozo: {pedido.mozo}</span>
              </div>

              <div className="text-sm text-[#ff6666] flex gap-2 mb-2">
                <span>📄</span>
                <span className="italic">"{pedido.notas}"</span>
              </div>

              <div className="bg-[#2b2b2f] rounded-lg p-4 text-sm border border-[#3a3a3f] shadow-inner">
                <div className="mb-2 text-gray-300 font-bold">Detalle del Pedido:</div>
                <div className="space-y-2">
                  {pedido.detalle.map((item, i) => (
                    <div key={i} className="flex justify-between text-gray-200">
                      <span>{item.cantidad}x {item.nombre}</span>
                      <span className="flex gap-6 font-mono text-right">
                        <span>${item.precio.toLocaleString()}</span>
                        <span>${item.total.toLocaleString()}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between font-bold text-green-400 text-lg border-t border-gray-600 pt-2">
                  <span>TOTAL:</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow">
                  🎫 Ticket
                </button>
                <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow">
                  ✔ Cobrar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Columna derecha: filtros */}
      <div className="w-full max-w-xs bg-[#1f1f25] p-6 rounded-xl border border-[#2d2d30] shadow-xl text-white space-y-6 h-fit self-start">
        <h2 className="text-lg font-bold mb-2">🔎 Buscar Pedido</h2>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Buscar por mesa:</label>
          <input
            type="text"
            value={mesaBuscada}
            onChange={(e) => setMesaBuscada(e.target.value)}
            className="w-full p-2 bg-[#2c2c34] rounded border border-[#3a3a3f] text-white focus:outline-none"
            placeholder="Ej: 5"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Filtrar por mozo:</label>
          <select
            value={mozoSeleccionado}
            onChange={(e) => setMozoSeleccionado(e.target.value)}
            className="w-full p-2 bg-[#2c2c34] rounded border border-[#3a3a3f] text-white focus:outline-none"
          >
            <option value="">Todos los mozos</option>
            {mozosUnicos.map((mozo) => (
              <option key={mozo} value={mozo}>
                {mozo}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
