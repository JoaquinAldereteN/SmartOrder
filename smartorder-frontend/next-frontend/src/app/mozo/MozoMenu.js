export default function MozoMenu({
  productos,
  pedido,
  setCantidad,
  getCantidad,
  busqueda,
  setBusqueda,
  onBack,
  onNext,
}) {
  const productosComida = productos.filter(
    (p) =>
      p.categoria === "Comida" &&
      (!busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  );
  const productosBebida = productos.filter(
    (p) =>
      p.categoria === "Bebida" &&
      (!busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full sm:h-screen font-[Montserrat,Inter,sans-serif] bg-[#18181c] rounded-3xl shadow-lg px-4 sm:px-6 py-4 sm:py-5">
      <style>{`
        .cat-anim { animation: fadeInUp 0.8s cubic-bezier(.22,1,.36,1) both; }
        .prod-anim { animation: popIn 0.6s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(32px);} to { opacity:1; transform:none;}}
        @keyframes popIn { from { opacity:0; transform:scale(0.7);} 70% { transform:scale(1.05);} to { opacity:1; transform:scale(1);}}

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
      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-900 to-blue-700 rounded-t-xl px-4 py-3 sm:px-5 sm:py-4 shadow-lg">
        <button
          className="text-white text-2xl sm:text-3xl font-bold px-2 sm:px-3 rounded hover:bg-blue-800 transition focus:outline-none"
          onClick={onBack}
          aria-label="Volver"
        >
          ←
        </button>
        <h3 className="flex-1 text-center text-white font-extrabold text-2xl sm:text-3xl tracking-wide drop-shadow select-none">
          Menú
        </h3>
        <div className="w-10 sm:w-12" />
      </div>

      {/* Buscador */}
      <div className="relative my-5 sm:my-6">
        <input
          type="text"
          className="w-full rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 pl-11 sm:pl-12 bg-[#23232d] border border-blue-900 focus:border-blue-500 text-white placeholder-gray-400 shadow focus:ring-2 focus:ring-blue-600/40 transition text-sm sm:text-base"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          autoComplete="off"
        />
        <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg sm:text-xl pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 sm:w-6 h-5 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </span>
      </div>

      {/* Contenedor scroll vertical con barra fina */}
      <div className="flex-1 scroll-fina pb-4">
        {/* Comida */}
        <section className="cat-anim" style={{ animationDelay: "0.08s" }}>
          <h4 className="text-2xl sm:text-3xl font-extrabold text-blue-400 mb-4 sm:mb-5 tracking-wide drop-shadow select-none">
            Comida
          </h4>
          {productosComida.length === 0 && (
            <p className="text-gray-500 text-sm sm:text-base mb-5">Sin resultados</p>
          )}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {productosComida.map((prod, idx) => (
              <div
                key={prod.id}
                className="prod-anim flex flex-col rounded-2xl sm:rounded-3xl bg-[#23232d]/90 shadow-xl px-6 sm:px-8 py-4 sm:py-5 hover:scale-[1.03] hover:shadow-blue-700/40 hover:bg-blue-900/15 transition-all duration-200 backdrop-blur-md"
                style={{ animationDelay: `${idx * 0.04 + 0.07}s` }}
              >
                <p className="font-semibold text-base sm:text-lg text-white leading-tight mb-2 sm:mb-3">
                  {prod.nombre}
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-gradient-to-r from-blue-700 to-blue-400 text-white text-xs sm:text-sm font-extrabold rounded-full px-4 py-1 shadow-lg border border-blue-300/50 whitespace-nowrap select-none">
                    ${prod.precio}
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-900 text-white text-lg sm:text-xl flex items-center justify-center shadow hover:bg-blue-700 focus:outline-none transition disabled:bg-gray-700"
                      onClick={() => setCantidad(prod.id, getCantidad(prod.id) - 1)}
                      disabled={getCantidad(prod.id) === 0}
                      aria-label={`Quitar 1 ${prod.nombre}`}
                    >
                      –
                    </button>
                    <span className="w-6 sm:w-8 text-center font-bold text-lg sm:text-xl text-blue-300 select-none">
                      {getCantidad(prod.id)}
                    </span>
                    <button
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 text-white text-lg sm:text-xl flex items-center justify-center shadow hover:bg-blue-600 focus:outline-none transition"
                      onClick={() => setCantidad(prod.id, getCantidad(prod.id) + 1)}
                      aria-label={`Agregar 1 ${prod.nombre}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bebida */}
        <section className="cat-anim" style={{ animationDelay: "0.18s" }}>
          <h4 className="text-2xl sm:text-3xl font-extrabold text-blue-400 mb-4 mt-8 sm:mb-5 tracking-wide drop-shadow select-none">
            Bebida
          </h4>
          {productosBebida.length === 0 && (
            <p className="text-gray-500 text-sm sm:text-base mb-5">Sin resultados</p>
          )}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {productosBebida.map((prod, idx) => (
              <div
                key={prod.id}
                className="prod-anim flex flex-col rounded-2xl sm:rounded-3xl bg-[#23232d]/90 shadow-xl px-6 sm:px-8 py-4 sm:py-5 hover:scale-[1.03] hover:shadow-blue-700/40 hover:bg-blue-900/15 transition-all duration-200 backdrop-blur-md"
                style={{ animationDelay: `${idx * 0.04 + 0.09}s` }}
              >
                <p className="font-semibold text-base sm:text-lg text-white leading-tight mb-2 sm:mb-3">
                  {prod.nombre}
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-gradient-to-r from-blue-700 to-blue-400 text-white text-xs sm:text-sm font-extrabold rounded-full px-4 py-1 shadow-lg border border-blue-300/50 whitespace-nowrap select-none">
                    ${prod.precio}
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-900 text-white text-lg sm:text-xl flex items-center justify-center shadow hover:bg-blue-700 focus:outline-none transition disabled:bg-gray-700"
                      onClick={() => setCantidad(prod.id, getCantidad(prod.id) - 1)}
                      disabled={getCantidad(prod.id) === 0}
                      aria-label={`Quitar 1 ${prod.nombre}`}
                    >
                      –
                    </button>
                    <span className="w-6 sm:w-8 text-center font-bold text-lg sm:text-xl text-blue-300 select-none">
                      {getCantidad(prod.id)}
                    </span>
                    <button
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 text-white text-lg sm:text-xl flex items-center justify-center shadow hover:bg-blue-600 focus:outline-none transition"
                      onClick={() => setCantidad(prod.id, getCantidad(prod.id) + 1)}
                      aria-label={`Agregar 1 ${prod.nombre}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Botón Ver Pedido */}
        <button
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white w-full py-4 rounded-2xl font-extrabold mt-6 shadow-lg text-lg sm:text-xl tracking-wide transition disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={pedido.length === 0}
          onClick={onNext}
          type="button"
        >
          Ver Pedido
        </button>
      </div>
    </div>
  );
}
