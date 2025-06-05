import React from "react";

export default function MozoMesaSelector({ mesas, mesaSeleccionada, setMesaSeleccionada, onNext }) {
  // Agrupar mesas por sector
  const sectores = [
    { nombre: "Especiales", mesas: mesas.filter(m => m.sector === "Especiales") },
    { nombre: "Interior", mesas: mesas.filter(m => m.sector === "Interior") },
    { nombre: "Exterior", mesas: mesas.filter(m => m.sector === "Exterior") },
    { nombre: "Deck", mesas: mesas.filter(m => m.sector === "Deck") },
  ];

  return (
    <div className="animate-fadein flex flex-col gap-8 max-h-[70vh] overflow-y-auto menu-scroll px-4 pb-4 font-[Montserrat,Inter,sans-serif]">
      <style>{`
        .mesa-sector-anim { animation: fadeInUp 0.7s cubic-bezier(.22,1,.36,1) both; }
        .mesa-btn-anim { animation: popIn 0.5s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(32px);} to { opacity:1; transform:none;}}
        @keyframes popIn { from { opacity:0; transform:scale(0.7);} 70% { transform:scale(1.05);} to { opacity:1; transform:scale(1);}}
      `}</style>
      <div className="flex items-center gap-2 sticky top-0 z-20 bg-[#18181c] py-3 shadow-sm mb-2">
  <h3 className="text-3xl font-black flex-1 text-center tracking-wide text-white drop-shadow font-[Montserrat,Inter,sans-serif]">
    Seleccionar Mesa
  </h3>
</div>
      {sectores.map((sector, i) => (
        <div key={sector.nombre} className={"mb-6 bg-[#23232d]/80 rounded-2xl p-5 shadow-2xl backdrop-blur-md mesa-sector-anim"} style={{animationDelay: `${i * 0.12 + 0.05}s`}}>
          <div className="font-bold text-blue-300 text-xl mb-4 pl-1 tracking-wide uppercase border-l-4 border-blue-600/60 pl-3">{sector.nombre}</div>
          <div className="flex flex-wrap gap-3 mt-2">
            {sector.mesas.map(mesa => (
              <button
                key={mesa.id}
                className={`mesa-btn-anim px-7 py-4 rounded-2xl border-2 text-lg font-bold shadow-lg transition-all duration-300 focus:outline-none select-none focus-visible:ring-4 focus-visible:ring-blue-400/60 active:scale-95
                  ${mesaSeleccionada === mesa.id ? "bg-gradient-to-r from-blue-700 to-blue-400 text-white border-blue-300 scale-105 shadow-blue-600/30" : "bg-[#23232d]/90 text-blue-400 border-blue-700 hover:bg-blue-800/80 hover:text-white hover:shadow-blue-700/40"}`}
                onClick={() => setMesaSeleccionada(mesa.id)}
                tabIndex={0}
                aria-pressed={mesaSeleccionada === mesa.id}
                style={{animationDelay: `${i * 0.07 + 0.03}s`}}
              >
                <span className="transition-colors duration-300">{mesa.numero}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl w-full shadow-lg disabled:opacity-50 text-lg tracking-wide transition-all"
        disabled={!mesaSeleccionada}
        onClick={onNext}
      >
        Confirmar Mesa
      </button>
    </div>
  );
}
