export default function MozoMesaOcupadaPanel({
  mesa,
  pedido,
  onFinalizarCobrar,
  onEditarPedido,
  onVolver,
  onPedidoEnMesa,
  onLiberarMesa // <--- NUEVO!
}) {
  if (!mesa) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 bg-[#18181c] rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Mesa {mesa.nombre}</h2>
      <p className="text-lg mb-2 text-gray-300">
        Estado actual: <span className="font-semibold">{mesa.estado}</span>
      </p>
      {pedido && (
        <div className="mb-6 bg-[#23232d]/90 rounded-xl p-4 shadow-inner">
          <p className="font-semibold mb-2">Pedido actual:</p>
          <ul className="mb-2 text-gray-300">
            {pedido.items.map((item, idx) => (
              <li key={item._id || idx}>
                {item.product?.name} x {item.quantity} <span className="italic text-xs text-gray-400">({item.sector})</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-400 text-sm">
            Estado pedido: <span className="font-semibold">{pedido.status}</span>
          </p>
        </div>
      )}
      <div className="flex gap-4 mb-4">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-bold"
          onClick={onFinalizarCobrar}
        >
          Finalizar / Cobrar
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-bold"
          onClick={onEditarPedido}
        >
          Editar Pedido
        </button>
      </div>
      {/* BOTÓN NUEVO */}
      {pedido && pedido.status === "listo" && (
        <button
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-3 rounded-lg font-bold mt-1"
          onClick={onPedidoEnMesa}
        >
          Pedido en mesa
        </button>
      )}
      {/* BOTÓN MESA DESOCUPADA */}
      {pedido && pedido.status === "pagado" && mesa.estado !== "disponible" && (
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-bold mt-1"
          onClick={onLiberarMesa}
        >
          Mesa desocupada
        </button>
      )}
      <button
        className="mt-3 px-4 py-2 text-gray-400 hover:text-white underline"
        onClick={onVolver}
      >
        ← Volver a mesas
      </button>
    </div>
  );
}
