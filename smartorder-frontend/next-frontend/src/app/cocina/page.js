"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const badgeColor = (estado) => {
  switch (estado) {
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

export default function CocinaPage() {
  const [verificandoRol, setVerificandoRol] = useState(true);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || (role !== "kitchen" && role !== "admin")) {
      window.location.href = "/unauthorized";
    } else {
      setVerificandoRol(false);
    }
  }, []);

  // Trae TODOS los productos de cocina aunque estén listos (mientras el pedido siga activo)
  const fetchPedidos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/api/orders/sector/cocina", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const pedidosFormateados = response.data.map((pedido) => ({
        id: pedido._id,
        mesa: pedido.mesa?.nombre || "Desconocida",
        mozo: pedido.user?.username || "Mozo desconocido",
        hora: new Date(pedido.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        notas: pedido.notes || "",
        items: pedido.items,
        status: pedido.status,
      }));

      setPedidos(pedidosFormateados);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    }
  };

  // Cambia estado SOLO de un ITEM de cocina
  const cambiarEstado = async (pedidoId, itemId, nuevoEstado) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3001/api/orders/${pedidoId}/item/${itemId}/status`,
        { status: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPedidos();
    } catch (error) {
      console.error("Error al cambiar estado del item:", error);
    }
  };

  useEffect(() => {
    fetchPedidos();
    const interval = setInterval(fetchPedidos, 10000);
    return () => clearInterval(interval);
  }, []);

  if (verificandoRol) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-[#18181c] p-8 relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded shadow"
        title="Cerrar sesión"
      >
        Cerrar sesión
      </button>
      <h1 className="text-white text-xl sm:text-2xl font-semibold mb-8">
        Panel de Cocina
      </h1>
      <div className="flex flex-wrap gap-8 justify-start">
        {pedidos.length === 0 && (
          <p className="text-gray-400">No hay productos pendientes de cocina.</p>
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
              <span className="text-xs text-gray-400 font-mono">{pedido.hora}</span>
            </div>
            <div className="mb-2">
              <span className="inline-block bg-[#2563eb] text-white px-4 py-1 rounded-2xl font-bold text-sm tracking-wide shadow-sm">
                {pedido.mesa}
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
            <div className="text-[13px] text-white font-bold mb-1">
              Productos de cocina:
            </div>
            <div className="rounded-xl bg-[#2a2a2e]/80 text-gray-200 p-4 text-[15px] font-semibold shadow-inner border border-[#2a2a2e]">
              {pedido.items.map((item, i) => (
                <div key={item._id} className="mb-3 last:mb-0 flex flex-col gap-1">
                  <span>
                    {item.quantity}x {item.product?.name}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${badgeColor(item.status)}`}>
                    {item.status}
                  </span>
                  <div>
                    <label className="text-sm text-gray-300 mr-2 font-semibold">
                      Cambiar estado:
                    </label>
                    <select
                      value={item.status}
                      onChange={(e) => {
                        const nuevoEstado = e.target.value;
                        if (nuevoEstado === "listo") {
                          const confirmar = confirm("¿Confirmás que este producto está listo?");
                          if (!confirmar) return;
                        }
                        cambiarEstado(pedido.id, item._id, nuevoEstado);
                      }}
                      className="bg-[#2a2a2e] text-white text-sm px-3 py-1 rounded border border-gray-600 mt-1"
                    >
                      <option value="pendiente">🕓 Pendiente</option>
                      <option value="en preparación">🍳 En preparación</option>
                      <option value="listo">✅ Listo</option>
                    </select>
                  </div>
                  {item.agregado && (
                    <span className="text-xs text-yellow-400 italic">(Agregado después)</span>
                  )}
                </div>
              ))}
            </div>
            {/* Estado general del pedido: */}
            <div className="mt-2 text-xs text-gray-400">
              Estado general: <span className="font-bold">{pedido.status}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
