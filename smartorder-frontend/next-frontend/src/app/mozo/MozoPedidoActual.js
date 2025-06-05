import React from "react";

export default function MozoPedidoActual({ mesa, productos, pedido, nota, setNota, setCantidad, quitarProducto, onBack, onSend }) {
  const pedidoComida = pedido.filter(item => productos.find(p => p.id === item.productoId)?.categoria === "Comida");
  const pedidoBebida = pedido.filter(item => productos.find(p => p.id === item.productoId)?.categoria === "Bebida");
  const total = pedido.reduce((acc, item) => {
    const prod = productos.find(p => p.id === item.productoId);
    return acc + (prod ? prod.precio * item.cantidad : 0);
  }, 0);

  return (
    <div className="animate-fadein flex flex-col gap-7 max-h-[70vh] overflow-y-auto menu-scroll px-4 pb-4 font-[Montserrat,Inter,sans-serif]">
      <style>{`
        .pedido-cat-anim { animation: fadeInUp 0.8s cubic-bezier(.22,1,.36,1) both; }
        .pedido-prod-anim { animation: popIn 0.6s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(32px);} to { opacity:1; transform:none;}}
        @keyframes popIn { from { opacity:0; transform:scale(0.7);} 70% { transform:scale(1.05);} to { opacity:1; transform:scale(1);}}
      `}</style>
      {/* Header sticky con botón volver */}
      <div className="flex items-center gap-2 sticky top-0 z-20 bg-[#18181c] py-3 shadow-sm mb-2">
        <button className="text-blue-400 font-bold text-2xl px-2 rounded hover:bg-blue-900/40 focus:outline-none transition" onClick={onBack}>&lt;</button>
        <h3 className="text-3xl font-black flex-1 text-center tracking-wide text-white drop-shadow font-[Montserrat,Inter,sans-serif]">Pedido Actual</h3>
      </div>
      {/* Info de mesa */}
      <div className="bg-[#23232d]/90 rounded-2xl p-6 mb-4 shadow-2xl border border-blue-900/40 backdrop-blur-md">
        <div className="text-xs text-gray-400 mb-2">Mesa</div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-lg text-blue-300">{mesa?.nombre || "Sin mesa"}</span>
        </div>
        {/* Productos Comida */}
        <div className="mb-2">
          <div className="pedido-cat-anim font-extrabold text-2xl mb-4 text-blue-400 mt-3 tracking-wide drop-shadow" style={{animationDelay:'0.08s'}}>Comida</div>
          {pedidoComida.length === 0 && <div className="text-gray-500 text-sm mb-4">Sin comidas</div>}
          <div className="flex flex-col gap-3">
            {pedidoComida.map((item, idx) => {
              const prod = productos.find(p => p.id === item.productoId);
              return prod ? (
                <div key={item.productoId} className="pedido-prod-anim flex items-center rounded-2xl bg-[#23232d]/85 shadow-2xl px-6 py-4 gap-2 justify-between hover:scale-[1.025] hover:shadow-blue-700/30 hover:bg-blue-900/10 transition-all duration-200 backdrop-blur-md" style={{animationDelay: `${idx * 0.04 + 0.07}s`}}>
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="font-semibold text-base text-white leading-tight">{prod.nombre}</span>
                    <span className="inline-block bg-gradient-to-r from-blue-700 to-blue-400 text-white text-sm font-extrabold rounded-full px-4 py-1 w-fit shadow-lg border border-blue-300/40">${prod.precio}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 rounded-full bg-blue-900 text-white text-xl flex items-center justify-center shadow hover:bg-blue-700 focus:outline-none transition disabled:bg-gray-700"
                      onClick={() => setCantidad(prod.id, item.cantidad - 1)}
                      disabled={item.cantidad === 1}
                      aria-label="Quitar 1"
                    >-</button>
                    <span className="w-7 text-center font-bold text-lg text-blue-300 select-none">{item.cantidad}</span>
                    <button
                      className="w-8 h-8 rounded-full bg-blue-500 text-white text-xl flex items-center justify-center shadow hover:bg-blue-600 focus:outline-none transition"
                      onClick={() => setCantidad(prod.id, item.cantidad + 1)}
                      aria-label="Agregar 1"
                    >+</button>
                    <button
                      className="ml-3 text-red-400 font-bold text-lg hover:text-red-600 transition"
                      onClick={() => quitarProducto(prod.id)}
                      aria-label="Quitar producto"
                    >×</button>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
        {/* Productos Bebida */}
        <div className="mb-2">
          <div className="pedido-cat-anim font-extrabold text-2xl mb-4 text-blue-400 mt-3 tracking-wide drop-shadow" style={{animationDelay:'0.17s'}}>Bebida</div>
          {pedidoBebida.length === 0 && <div className="text-gray-500 text-sm mb-4">Sin bebidas</div>}
          <div className="flex flex-col gap-3">
            {pedidoBebida.map((item, idx) => {
              const prod = productos.find(p => p.id === item.productoId);
              return prod ? (
                <div key={item.productoId} className="pedido-prod-anim flex items-center rounded-2xl bg-[#23232d]/85 shadow-2xl px-6 py-4 gap-2 justify-between hover:scale-[1.025] hover:shadow-blue-700/30 hover:bg-blue-900/10 transition-all duration-200 backdrop-blur-md" style={{animationDelay: `${idx * 0.04 + 0.09}s`}}>
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="font-semibold text-base text-white leading-tight">{prod.nombre}</span>
                    <span className="inline-block bg-gradient-to-r from-blue-700 to-blue-400 text-white text-sm font-extrabold rounded-full px-4 py-1 w-fit shadow-lg border border-blue-300/40">${prod.precio}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 rounded-full bg-blue-900 text-white text-xl flex items-center justify-center shadow hover:bg-blue-700 focus:outline-none transition disabled:bg-gray-700"
                      onClick={() => setCantidad(prod.id, item.cantidad - 1)}
                      disabled={item.cantidad === 1}
                      aria-label="Quitar 1"
                    >-</button>
                    <span className="w-7 text-center font-bold text-lg text-blue-300 select-none">{item.cantidad}</span>
                    <button
                      className="w-8 h-8 rounded-full bg-blue-500 text-white text-xl flex items-center justify-center shadow hover:bg-blue-600 focus:outline-none transition"
                      onClick={() => setCantidad(prod.id, item.cantidad + 1)}
                      aria-label="Agregar 1"
                    >+</button>
                    <button
                      className="ml-3 text-red-400 font-bold text-lg hover:text-red-600 transition"
                      onClick={() => quitarProducto(prod.id)}
                      aria-label="Quitar producto"
                    >×</button>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
        {/* Notas */}
        <div className="mt-4">
          <div className="font-semibold text-xs mb-1 text-gray-400">Notas del pedido</div>
          <textarea
            className="w-full rounded-xl bg-[#23232d]/70 border border-blue-500/40 text-white px-3 py-2 text-base shadow focus:ring-2 focus:ring-blue-600/30 transition backdrop-blur-md placeholder:text-blue-300/60"
            rows={3}
            value={nota}
            onChange={e => setNota(e.target.value)}
            placeholder="Notas para cocina/bar..."
          />
        </div>
        {/* Total */}
        <div className="flex items-center justify-between mt-6 border-t border-blue-900/30 pt-4">
          <span className="font-bold text-lg text-white">Total a pagar:</span>
          <span className="text-3xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-extrabold drop-shadow animate-pulse">$ {total}</span>
        </div>
      </div>
      <button
        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white w-full py-3 rounded-xl font-bold mt-2 mb-4 shadow-lg text-lg tracking-wide transition disabled:bg-gray-600"
        onClick={onSend}
        disabled={pedido.length === 0}
      >
        Enviar Pedido
      </button>
    </div>
  );
}
