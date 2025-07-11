export default function MozoPedidoActual({
  mesa,
  productos,
  pedido,
  nota,
  setNota,
  setCantidad,
  quitarProducto,
  onBack,
  onSend,
  esEdicion // <- NUEVO: true si la mesa ya tiene pedido abierto
}) {
  if (!mesa) return <p className="text-center text-red-500 mt-6">Mesa no seleccionada</p>;

  const productosEnPedido = pedido.map((p) => {
    const producto = productos.find((prod) => prod._id === p.productoId);
    return { ...p, nombre: producto?.name || "Producto desconocido", precio: producto?.price || 0 };
  });

  const total = productosEnPedido.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

  return (
    <div className="flex flex-col h-full p-4">
      <header className="mb-6">
        <button onClick={onBack} className="text-blue-400 hover:underline mb-4">
          ← Volver al menú
        </button>
        <h2 className="text-xl font-bold mb-1">Pedido para mesa {mesa.name || mesa.nombre}</h2>
        <p className="text-gray-400">Estado: {mesa.estado || "Desconocido"}</p>
      </header>

      <div className="flex-1 overflow-auto mb-4">
        {productosEnPedido.length === 0 ? (
          <p className="text-center text-gray-400">No hay productos en el pedido</p>
        ) : (
          productosEnPedido.map(({ productoId, nombre, cantidad, precio }) => (
            <div key={productoId} className="flex justify-between items-center mb-3">
              <div>
                <p className="font-semibold">{nombre}</p>
                <p className="text-sm text-gray-400">${precio.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCantidad(productoId, cantidad - 1)}
                  className="bg-red-600 px-2 py-1 rounded text-white disabled:opacity-50"
                  disabled={cantidad <= 1}
                >
                  -
                </button>
                <span>{cantidad}</span>
                <button
                  onClick={() => setCantidad(productoId, cantidad + 1)}
                  className="bg-green-600 px-2 py-1 rounded text-white"
                >
                  +
                </button>
                <button
                  onClick={() => quitarProducto(productoId)}
                  className="ml-3 text-red-400 hover:text-red-600"
                  title="Eliminar producto"
                >
                  &times;
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <textarea
        className="w-full p-2 mb-4 rounded bg-gray-800 text-white resize-none"
        placeholder="Agregar nota al pedido..."
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        rows={3}
      />
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
        <button
          onClick={onSend}
          disabled={productosEnPedido.length === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded"
        >
          {esEdicion ? "Agregar productos al pedido" : "Enviar Pedido"}
        </button>
      </div>
    </div>
  );
}
