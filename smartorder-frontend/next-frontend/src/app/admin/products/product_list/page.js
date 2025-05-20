"use client";

import React from "react";

export default function VerProductos() {
  const productos = [
    { id: 1, nombre: "Blue Label", precio: "25000", categoria: "Bebida" },
    { id: 2, nombre: "Milanesa Napolitana", precio: "17000", categoria: "Comida" },
    { id: 3, nombre: "Roast Beef", precio: "22000", categoria: "Comida" },
  ];

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4"
      style={{ backgroundColor: "#2C2B2B" }}
    >
      <div className="w-full max-w-7xl bg-[#161617] p-4 sm:p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Listado de Productos
        </h2>

        {/* Scroll horizontal en móviles */}
        <div className="overflow-x-auto">
          <table className="w-full bg-[#1F1F1F] rounded-lg shadow-md table-fixed min-w-[600px]">
            <thead>
              <tr className="bg-[#2D2D2D] text-white">
                {/* Anchos responsivos */}
                <th className="w-[40%] py-3 px-4 sm:px-8 text-left text-base sm:text-lg break-words">Nombre</th>
                <th className="w-[15%] py-3 px-4 sm:px-8 text-left text-base sm:text-lg break-words">Precio</th>
                <th className="w-[25%] py-3 px-4 sm:px-8 text-center text-base sm:text-lg break-words">Categoría</th>
                <th className="w-[20%] py-3 px-4 sm:px-8 text-center text-base sm:text-lg break-words">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-700 hover:bg-[#333] hover:scale-[1.01] transition-all duration-200 ease-in-out"
                >
                  <td className="py-3 px-4 sm:px-8 text-gray-200 text-sm sm:text-base break-words">{producto.nombre}</td>
                  <td className="py-3 px-4 sm:px-8 text-gray-300 text-sm sm:text-base break-words">{producto.precio}</td>
                  <td className="py-3 px-4 sm:px-8 text-gray-300 text-sm sm:text-base break-words text-center">{producto.categoria}</td>
                  <td className="py-3 px-4 sm:px-8 text-center flex items-center justify-center space-x-3">
                    <button className="px-3 py-1 sm:px-5 sm:py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-300 whitespace-nowrap text-xs sm:text-sm">
                      Eliminar
                    </button>
                    <button className="px-3 py-1 sm:px-5 sm:py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 whitespace-nowrap text-xs sm:text-sm">
                      Modificar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
