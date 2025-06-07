import React from "react";

export default function MozoMenu({ productos, pedido, setCantidad, getCantidad, busqueda, setBusqueda, onBack, onNext }) {
  const productosComida = productos.filter(p => p.categoria === "Comida" && (!busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase())));
  const productosBebida = productos.filter(p => p.categoria === "Bebida" && (!busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase())));

  return (
    <div className="animate-fadein flex flex-col gap-7 max-h-[70vh] overflow-y-auto menu-scroll px-4 pb-4 font-[Montserrat,Inter,sans-serif]">
      <style>{`
        .cat-anim { animation: fadeInUp 0.8s cubic-bezier(.22,1,.36,1) both; }
        .prod-anim { animation: popIn 0.6s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(32px);} to { opacity:1; transform:none;}}
        @keyframes popIn { from { opacity:0; transform:scale(0.7);} 70% { transform:scale(1.05);} to { opacity:1; transform:scale(1);}}
      `}</style>
      
      <div className="flex items-center gap-2 sticky top-0 z-20 bg-[#18181c] py-3 shadow-sm mb-2">
        <button className="text-blue-400 font-bold text-2xl px-2 rounded hover:bg-blue-900/40 focus:outline-none transition" onClick={onBack}>&lt;</button>
        <h3 className="text-3xl font-black flex-1 text-center tracking-wide text-white drop-shadow font-[Montserrat,Inter,sans-serif]">Menú</h3>
      </div>
      
      <div className="relative mb-2">
        <input
          type="text"
          className="w-full rounded-xl px-4 py-3 pl-10 bg-[#23232d] border border-blue-900 focus:border-blue-500 text-white placeholder-gray-400 shadow focus:ring-2 focus:ring-blue-600/30 transition"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-lg pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </span>
      </div>
      
      <div className="mb-4 cat-anim" style={{animationDelay:'0.08s'}}>
        <div className="font-extrabold text-2xl mb-4 text-blue-400 mt-3 tracking-wide drop-shadow">Comida</div>
        {productosComida.length === 0 && <div className="text-gray-500 text-sm mb-4">Sin resultados</div>}
        <div className="flex flex-col gap-3">
          {productosComida.map((prod, idx) => (
            <div key={prod.id} className="prod-anim flex items-center rounded-2xl bg-[#23232d]/85 shadow-2xl px-6 py-4 gap-2 justify-between hover:scale-[1.025] hover:shadow-blue-700/30 hover:bg-blue-900/10 transition-all duration-200 backdrop-blur-md" style={{animationDelay: `${idx * 0.04 + 0.07}s`}}>
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-semibold text-base text-white leading-tight">{prod.nombre}</span>
                <span className="inline-block bg-gradient-to-r from-blue-700 to-blue-400 text-white text-sm font-extrabold rounded-full px-4 py-1 w-fit shadow-lg border border-blue-300/40">${prod.precio}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 rounded-full bg-blue-900 text-white text-xl flex items-center justify-center shadow hover:bg-blue-700 focus:outline-none transition disabled:bg-gray-700"
                  onClick={() => setCantidad(prod.id, getCantidad(prod.id) - 1)}
                  disabled={getCantidad(prod.id) === 0}
                  aria-label="Quitar 1"
                >-</button>
                <span className="w-7 text-center font-bold text-lg text-blue-300 select-none">{getCantidad(prod.id)}</span>
                <button
                  className="w-8 h-8 rounded-full bg-blue-500 text-white text-xl flex items-center justify-center shadow hover:bg-blue-600 focus:outline-none transition"
                  onClick={() => setCantidad(prod.id, getCantidad(prod.id) + 1)}
                  aria-label="Agregar 1"
                >+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-4 cat-anim" style={{animationDelay:'0.18s'}}>
        <div className="font-extrabold text-2xl mb-4 text-blue-400 mt-3 tracking-wide drop-shadow">Bebida</div>
        {productosBebida.length === 0 && <div className="text-gray-500 text-sm mb-4">Sin resultados</div>}
        <div className="flex flex-col gap-3">
          {productosBebida.map((prod, idx) => (
            <div key={prod.id} className="prod-anim flex items-center rounded-2xl bg-[#23232d]/85 shadow-2xl px-6 py-4 gap-2 justify-between hover:scale-[1.025] hover:shadow-blue-700/30 hover:bg-blue-900/10 transition-all duration-200 backdrop-blur-md" style={{animationDelay: `${idx * 0.04 + 0.09}s`}}>
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-semibold text-base text-white leading-tight">{prod.nombre}</span>
                <span className="inline-block bg-gradient-to-r from-blue-700 to-blue-400 text-white text-sm font-extrabold rounded-full px-4 py-1 w-fit shadow-lg border border-blue-300/40">${prod.precio}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 rounded-full bg-blue-900 text-white text-xl flex items-center justify-center shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 active:scale-90 transition disabled:bg-gray-700"
                  onClick={() => setCantidad(prod.id, getCantidad(prod.id) - 1)}
                  disabled={getCantidad(prod.id) === 0}
                  aria-label="Quitar 1"
                >-</button>
                <span className="w-7 text-center font-bold text-lg text-blue-300 select-none">{getCantidad(prod.id)}</span>
                <button
                  className="w-9 h-9 rounded-full bg-blue-500 text-white text-xl flex items-center justify-center shadow hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 active:scale-90 transition"
                  onClick={() => setCantidad(prod.id, getCantidad(prod.id) + 1)}
                  aria-label="Agregar 1"
                >+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white w-full py-3 rounded-xl font-bold mt-4 shadow-lg text-lg tracking-wide transition disabled:bg-gray-600"
        disabled={pedido.length === 0}
        onClick={onNext}
      >
        Ver Pedido
      </button>
    </div>
  );
}
