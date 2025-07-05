import { useState } from "react";

export default function MozoMenu({ productos, pedido, setCantidad, getCantidad, busqueda, setBusqueda, onBack, onNext }) {
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");

  // Filtrar productos por categoría y búsqueda
  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria = categoriaFiltro === "Todas" || p.category === categoriaFiltro;
    const coincideBusqueda = p.name?.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="flex flex-col h-full">
      <header className="mb-4">
        <button onClick={onBack} className="text-blue-400 hover:underline mb-2">
          ← Volver a Mesas
        </button>

        {/* Botones para filtrar categoría */}
        <div className="mb-2 flex gap-2">
          {["Todas", "Comida", "Bebida"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaFiltro(cat)}
              className={`px-3 py-1 rounded ${
                categoriaFiltro === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full rounded px-3 py-2 text-white"
        />
      </header>

      <div className="flex-1 overflow-y-auto">
        {productosFiltrados.length === 0 ? (
          <p className="text-gray-400 text-center">No se encontraron productos</p>
        ) : (
          productosFiltrados.map((producto) => (
            <div
              key={producto._id || producto.id}
              className="flex items-center justify-between border-b border-gray-700 py-3 px-2"
            >
              <div>
                <p className="font-semibold">{producto.name}</p>
                <p className="text-sm text-gray-400">${producto.price.toFixed(2)}</p>
              </div>
              <div>
                <button
                  onClick={() =>
                    setCantidad(producto._id || producto.id, Math.max(getCantidad(producto._id || producto.id) - 1, 0))
                  }
                  className="px-3 py-1 bg-red-600 rounded text-white mr-2"
                >
                  -
                </button>
                <span>{getCantidad(producto._id || producto.id)}</span>
                <button
                  onClick={() => setCantidad(producto._id || producto.id, getCantidad(producto._id || producto.id) + 1)}
                  className="px-3 py-1 bg-green-600 rounded text-white ml-2"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={onNext}
        disabled={pedido.length === 0}
        className="mt-4 bg-blue-600 disabled:bg-blue-400 text-white py-3 rounded"
      >
        Confirmar Pedido
      </button>
    </div>
  );
}
