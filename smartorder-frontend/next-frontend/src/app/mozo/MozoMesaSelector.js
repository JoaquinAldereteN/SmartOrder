import React from "react";

export default function MozoMesaSelector({ mesas, mesaSeleccionada, setMesaSeleccionada, onNext }) {
  const sectores = [
    { nombre: "Especiales", mesas: mesas.filter(m => m.sector === "Especiales") },
    { nombre: "Interior", mesas: mesas.filter(m => m.sector === "Interior") },
    { nombre: "Exterior", mesas: mesas.filter(m => m.sector === "Exterior") },
    { nombre: "Deck", mesas: mesas.filter(m => m.sector === "Deck") },
  ];

  return (
    <div className="animate-fadein flex flex-col w-full h-screen px-6 pb-6 font-[Montserrat,Inter,sans-serif] bg-[#18181c] rounded-3xl shadow-lg box-border">
      <style>{`
        .mesa-sector-anim { animation: fadeInUp 0.7s cubic-bezier(.22,1,.36,1) both; }
        .mesa-btn-anim { animation: popIn 0.5s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(32px);} to { opacity:1; transform:none;} }
        @keyframes popIn { from { opacity:0; transform:scale(0.7);} 70% { transform:scale(1.05);} to { opacity:1; transform:scale(1);} }

        /* Scrollbar sutil sin espacio blanco */
        .scroll-fina::-webkit-scrollbar {
          width: 6px;
        }
        .scroll-fina::-webkit-scrollbar-track {
          background: transparent;
          margin: 0;
        }
        .scroll-fina::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          border: 1.5px solid transparent;
          transition: background-color 0.3s ease;
        }
        .scroll-fina::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        /* Firefox */
        .scroll-fina {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
        }
        .scroll-fina:hover {
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }
      `}</style>

      <div className="flex items-center gap-2 py-4 mb-4">
        <h3 className="text-3xl font-extrabold flex-1 text-center tracking-wide text-white drop-shadow-md">
          Seleccionar Mesa
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto scroll-fina space-y-6">
        {sectores.map((sector, i) => (
          <section
            key={sector.nombre}
            className="mesa-sector-anim bg-[#23232d]/90 rounded-3xl p-6 shadow-2xl backdrop-blur-md"
            style={{ animationDelay: `${i * 0.12 + 0.05}s` }}
          >
            <h4 className="font-bold text-blue-400 text-xl mb-5 tracking-wide uppercase border-l-4 border-blue-600/70 pl-4 drop-shadow">
              {sector.nombre}
            </h4>

            <div className="flex flex-row flex-wrap xl:flex-col gap-4 justify-center xl:justify-start">
              {sector.mesas.length === 0 && (
                <p className="text-gray-500 italic text-center w-full">No hay mesas disponibles</p>
              )}
              {sector.mesas.map(mesa => (
                <button
                  key={mesa.id}
                  aria-label={`Mesa ${mesa.numero} del sector ${sector.nombre}`}
                  type="button"
                  className={`mesa-btn-anim px-8 py-5 rounded-3xl border-2 text-lg font-bold shadow-lg transition-transform duration-300 focus:outline-none select-none focus-visible:ring-4 focus-visible:ring-blue-400/70 active:scale-95
                    ${mesaSeleccionada === mesa.id
                      ? "bg-gradient-to-r from-blue-700 to-blue-400 text-white border-blue-300 scale-105 shadow-blue-600/50"
                      : "bg-[#23232d]/90 text-blue-400 border-blue-700 hover:bg-blue-900/90 hover:text-white hover:shadow-blue-700/50"
                    }`}
                  onClick={() => setMesaSeleccionada(mesa.id)}
                  tabIndex={0}
                  aria-pressed={mesaSeleccionada === mesa.id}
                  style={{ animationDelay: `${i * 0.07 + 0.03}s` }}
                >
                  {mesa.numero}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <button
        className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 rounded-3xl w-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg tracking-wide transition"
        disabled={!mesaSeleccionada}
        onClick={onNext}
        type="button"
      >
        Confirmar Mesa
      </button>
    </div>
  );
}
