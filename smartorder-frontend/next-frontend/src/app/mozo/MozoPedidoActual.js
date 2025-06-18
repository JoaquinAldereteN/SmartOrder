export default function MozoPedidoActual({ mesa, productos, pedido, nota, setNota, setCantidad, quitarProducto, onBack, onSend }) {
  const pedidoComida = pedido.filter(item => productos.find(p => p.id === item.productoId)?.categoria === "Comida");
  const pedidoBebida = pedido.filter(item => productos.find(p => p.id === item.productoId)?.categoria === "Bebida");
  const total = pedido.reduce((acc, item) => {
    const prod = productos.find(p => p.id === item.productoId);
    return acc + (prod ? prod.precio * item.cantidad : 0);
  }, 0);

  return (
    <div className="flex flex-col w-full h-screen bg-[#18181c] font-[Montserrat,Inter,sans-serif] p-4 box-border rounded-3xl shadow-lg">
      <style>{`
        /* Scroll con barra muy fina y sutil */
        .scroll-fina {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(100,100,100,0.3) transparent;
        }
        .scroll-fina::-webkit-scrollbar {
          width: 6px;
        }
        .scroll-fina::-webkit-scrollbar-track {
          background: transparent;
        }
        .scroll-fina::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.3);
          border-radius: 10px;
          border: 2px solid transparent;
        }
        .scroll-fina:hover::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.5);
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center gap-3 pb-4">
        <button
          className="text-blue-400 font-bold text-3xl px-3 rounded hover:bg-blue-900/40 focus:outline-none transition"
          onClick={onBack}
          aria-label="Volver"
        >
          ←
        </button>
        <h3 className="text-3xl font-extrabold flex-1 text-center tracking-wide text-white drop-shadow truncate">
          Pedido Actual
        </h3>
      </div>

      {/* Contenedor scrollable de pedidos con scroll fino */}
      <section className="scroll-fina flex-1 bg-[#23232d]/90 rounded-3xl p-4 shadow-2xl border border-blue-900/40 backdrop-blur-md">
        {/* Mesa */}
        <div className="text-xs text-gray-400 mb-1 truncate">Mesa</div>
        <div className="font-semibold text-lg text-blue-300 mb-6 truncate">{mesa?.nombre || "Sin mesa"}</div>

        {/* Comida */}
        <div className="mb-6">
          <h4 className="font-extrabold text-2xl mb-5 text-blue-400 tracking-wide drop-shadow">
            Comida
          </h4>
          {pedidoComida.length === 0 && <p className="text-gray-500 text-sm mb-4 italic">Sin comidas</p>}
          <div className="flex flex-col gap-4">
            {pedidoComida.map((item) => {
              const prod = productos.find(p => p.id === item.productoId);
              return prod ? (
                <div
                  key={item.productoId}
                  className="flex items-center rounded-3xl bg-[#23232d]/85 shadow-2xl px-4 py-3 gap-4 justify-between hover:scale-[1.03] hover:shadow-blue-700/40 hover:bg-blue-900/10 transition-all duration-200 backdrop-blur-md"
                >
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="font-semibold text-base text-white truncate">{prod.nombre}</span>
                    <span className="inline-block bg-gradient-to-r from-blue-700 to-blue-400 text-white text-sm font-extrabold rounded-full px-4 py-1 shadow-lg border border-blue-300/40 w-fit">
                      ${prod.precio}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      className="w-9 h-9 rounded-full bg-blue-900 text-white text-xl flex items-center justify-center shadow hover:bg-blue-700 focus:outline-none transition disabled:bg-gray-700"
                      onClick={() => setCantidad(prod.id, item.cantidad - 1)}
                      disabled={item.cantidad === 1}
                      aria-label="Quitar 1"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-lg text-blue-300 select-none">{item.cantidad}</span>
                    <button
                      className="w-9 h-9 rounded-full bg-blue-500 text-white text-xl flex items-center justify-center shadow hover:bg-blue-600 focus:outline-none transition"
                      onClick={() => setCantidad(prod.id, item.cantidad + 1)}
                      aria-label="Agregar 1"
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-400 font-bold text-xl hover:text-red-600 transition"
                      onClick={() => quitarProducto(prod.id)}
                      aria-label="Quitar producto"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* Bebida */}
        <div className="mb-6">
          <h4 className="font-extrabold text-2xl mb-5 text-blue-400 tracking-wide drop-shadow">
            Bebida
          </h4>
          {pedidoBebida.length === 0 && <p className="text-gray-500 text-sm mb-4 italic">Sin bebidas</p>}
          <div className="flex flex-col gap-4">
            {pedidoBebida.map((item) => {
              const prod = productos.find(p => p.id === item.productoId);
              return prod ? (
                <div
                  key={item.productoId}
                  className="flex items-center rounded-3xl bg-[#23232d]/85 shadow-2xl px-4 py-3 gap-4 justify-between hover:scale-[1.03] hover:shadow-blue-700/40 hover:bg-blue-900/10 transition-all duration-200 backdrop-blur-md"
                >
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="font-semibold text-base text-white truncate">{prod.nombre}</span>
                    <span className="inline-block bg-gradient-to-r from-blue-700 to-blue-400 text-white text-sm font-extrabold rounded-full px-4 py-1 shadow-lg border border-blue-300/40 w-fit">
                      ${prod.precio}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      className="w-9 h-9 rounded-full bg-blue-900 text-white text-xl flex items-center justify-center shadow hover:bg-blue-700 focus:outline-none transition disabled:bg-gray-700"
                      onClick={() => setCantidad(prod.id, item.cantidad - 1)}
                      disabled={item.cantidad === 1}
                      aria-label="Quitar 1"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-lg text-blue-300 select-none">{item.cantidad}</span>
                    <button
                      className="w-9 h-9 rounded-full bg-blue-500 text-white text-xl flex items-center justify-center shadow hover:bg-blue-600 focus:outline-none transition"
                      onClick={() => setCantidad(prod.id, item.cantidad + 1)}
                      aria-label="Agregar 1"
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-400 font-bold text-xl hover:text-red-600 transition"
                      onClick={() => quitarProducto(prod.id)}
                      aria-label="Quitar producto"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : null;
            })}
          </div>

          {/* Notas */}
          <div className="mt-6">
            <label htmlFor="nota-pedido" className="font-semibold text-xs mb-1 text-gray-400 block">
              Notas del pedido
            </label>
            <textarea
              id="nota-pedido"
              className="w-full rounded-3xl bg-[#23232d]/70 border border-blue-500/40 text-white px-4 py-3 text-base shadow focus:ring-2 focus:ring-blue-600/30 transition backdrop-blur-md placeholder:text-blue-300/60 resize-none"
              rows={3}
              value={nota}
              onChange={e => setNota(e.target.value)}
              placeholder="Notas para cocina/bar..."
            />
          </div>
        </div>
      </section>

      {/* Total y botón enviar */}
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between border-t border-blue-900/30 pt-5">
          <span className="font-bold text-lg text-white">Total a pagar:</span>
          <span className="text-2xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-extrabold drop-shadow animate-pulse">
            $ {total.toFixed(2)}
          </span>
        </div>

        <button
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white w-full py-4 rounded-3xl font-bold shadow-lg text-lg tracking-wide transition disabled:bg-gray-600 disabled:cursor-not-allowed"
          onClick={onSend}
          disabled={pedido.length === 0}
          type="button"
        >
          Enviar Pedido
        </button>
      </div>
    </div>
  );
}
