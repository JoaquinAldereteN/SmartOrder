const pedidosMock = [
  {
    id: 65,
    mesa: 5,
    mozo: "Martin Water",
    estado: "Pendiente",
    hora: "12:50 PM",
    notas: "2 gin tonic, 1 fernet con coca, 1 limonada",
    detalle: [
      "2x Gin Tonic",
      "1x Fernet con Coca",
      "1x Limonada"
    ]
  },
  {
    id: 66,
    mesa: 7,
    mozo: "Patrick Costa",
    estado: "En preparación",
    hora: "12:51 PM",
    notas: "3 caipiroska, 1 agua tónica",
    detalle: [
      "3x Caipiroska",
      "1x Agua Tónica"
    ]
  },
  {
    id: 67,
    mesa: 8,
    mozo: "McLovin",
    estado: "Listo",
    hora: "12:52 PM",
    notas: "1 gin tonic sin alcohol",
    detalle: [
      "1x Gin Tonic (sin alcohol)"
    ]
  },
  {
    id: 68,
    mesa: 2,
    mozo: "Ana Torres",
    estado: "Pendiente",
    hora: "12:53 PM",
    notas: "2 mojito, 1 caipirinha",
    detalle: [
      "2x Mojito",
      "1x Caipirinha"
    ]
  },
  {
    id: 69,
    mesa: 11,
    mozo: "Juan Perez",
    estado: "En preparación",
    hora: "12:54 PM",
    notas: "1 campari orange, 2 gin tonic",
    detalle: [
      "1x Campari Orange",
      "2x Gin Tonic"
    ]
  },
  {
    id: 70,
    mesa: 3,
    mozo: "Sofía López",
    estado: "Listo",
    hora: "12:55 PM",
    notas: "1 limonada, 1 agua",
    detalle: [
      "1x Limonada",
      "1x Agua"
    ]
  }
];

const badgeColor = estado => {
  switch (estado) {
    case "Pendiente": return "bg-orange-700 text-orange-100";
    case "En preparación": return "bg-blue-900 text-blue-100";
    case "Listo": return "bg-green-900 text-green-100";
    default: return "bg-gray-700 text-gray-100";
  }
};

export default function CocinaPage() {
  return (
    <main className="min-h-screen bg-[#18181c] p-8">
      <h1 className="text-white text-xl sm:text-2xl font-semibold mb-8">Panel de Barra</h1>
      <div className="flex flex-wrap gap-8 justify-start">
        {pedidosMock.map((pedido) => (
          <div
            key={pedido.id}
            className="w-full max-w-sm bg-[#18181c] rounded-2xl shadow-lg p-6 flex flex-col gap-3 border border-[#23232d]"
            style={{ boxShadow: "0 2px 16px 0 #0007" }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#65b4ff]">Pedido: #{pedido.id}</span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${badgeColor(pedido.estado)}`}
                >
                  {pedido.estado}
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
            <div className="flex items-start gap-2 text-[13px] text-[#ff6666] mb-1">
              <span className="text-lg">📄</span>
              <span className="font-medium">"{pedido.notas}"</span>
            </div>
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