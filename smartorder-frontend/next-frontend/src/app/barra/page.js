"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const badgeColor = (estado) => {
  switch (estado.toLowerCase()) {
    case "pendiente":
      return "bg-orange-700 text-orange-100";
    case "en preparación":
      return "bg-blue-900 text-blue-100";
    case "listo":
      return "bg-green-900 text-green-100";
    default:
      return "bg-gray-700 text-gray-100";
  }
};

export default function BarraPage() {
  const [pedidos, setPedidos] = useState([]);

  const fetchPedidos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filtrar solo los pedidos que tengan items con categoría bebida
      const pedidosFiltrados = response.data
        .map((pedido) => {
          const detalleBebidas = pedido.items
            .filter(
              (item) =>
                item.product?.category?.toLowerCase() === "bebida"
            )
            .map((item) => `${item.quantity}x ${item.product?.name}`);

          return {
            id: pedido._id,
            mesa: pedido.mesa?.nombre || "Desconocida",
            mozo: pedido.user?.username || "Mozo desconocido",
            estado: pedido.status,
            hora: new Date(pedido.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            notas: pedido.notes || "",
            detalle: detalleBebidas,
          };
        })
        .filter((pedido) => pedido.detalle.length > 0); // Solo pedidos con bebidas

      setPedidos(pedidosFiltrados);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    }
  };

  useEffect(() => {
    fetchPedidos();
    const interval = setInterval(fetchPedidos, 10000); // refresca cada 10 seg
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#18181c] p-8">
      <h1 className="text-white text-xl sm:text-2xl font-semibold mb-8">
        Panel de Barra (Bebidas)
      </h1>
      <div className="flex flex-wrap gap-8 justify-start">
        {pedidos.length === 0 && (
          <p className="text-gray-400">No hay pedidos con productos de bebida.</p>
        )}
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="w-full max-w-sm bg-[#18181c] rounded-2xl shadow-lg p-6 flex flex-col gap-3 border border-[#23232d]"
            style={{ boxShadow: "0 2px 16px 0 #0007" }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#65b4ff]">
                Pedido: #{pedido.id.toString().slice(-4).padStart(4, "0")}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${badgeColor(
                    pedido.estado
                  )}`}
                >
                  {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                </span>
                <span className="text-xs text-gray-400 font-mono">{pedido.hora}</span>
              </div>
            </div>
            <div className="mt-1 mb-1">
              <span className="inline-block bg-[#2563eb] text-white px-4 py-1 rounded-2xl font-bold text-sm tracking-wide shadow-sm">
                Mesa {pedido.mesa}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
              <span className="text-lg">👤</span>
              <span className="font-medium">Mozo: {pedido.mozo}</span>
            </div>
            {pedido.notas && (
              <div className="flex items-start gap-2 text-[13px] text-[#ff6666] mb-1">
                <span className="text-lg">📄</span>
                <span className="font-medium">"{pedido.notas}"</span>
              </div>
            )}
            <div className="text-[13px] text-white font-bold mb-1">Detalle del Pedido:</div>
            <div
              className="rounded-xl bg-[#2a2a2e]/80 text-gray-200 p-4 text-[15px] font-semibold shadow-inner border border-[#2a2a2e]"
              style={{ backdropFilter: "blur(4px)" }}
            >
              {pedido.detalle.map((d, i) => (
                <div key={i} className="mb-1 last:mb-0">
                  {d}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
