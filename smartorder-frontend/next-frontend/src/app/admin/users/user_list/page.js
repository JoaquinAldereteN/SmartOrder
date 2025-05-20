"use client";

import React from "react";

export default function VerUsuarios() {
  const usuarios = [
    { id: 1, nombre: "Martin Water", rol: "Caja" },
    { id: 2, nombre: "Patrick Costa", rol: "Mozo" },
    { id: 3, nombre: "Anabel Freschi", rol: "Cocina" },
    // Agregá más usuarios acá si querés
  ];

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4"
      style={{ backgroundColor: "#2C2B2B" }}
    >
      <div className="w-full max-w-6xl bg-[#161617] p-6 md:p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Listado de Empleados
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1F1F1F] rounded-lg overflow-hidden shadow-md">
            <thead>
              <tr className="bg-[#2D2D2D] text-white">
                <th className="py-4 px-6 text-left text-lg sm:text-xl">Nombre de Usuario</th>
                <th className="py-4 px-6 text-left text-lg sm:text-xl">Rol</th>
                <th className="py-4 px-6 text-center text-lg sm:text-xl w-1/3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-700 hover:bg-[#333] hover:scale-[1.01] transition-all duration-200 ease-in-out"
                >
                  <td className="py-4 px-6 text-gray-200 text-base sm:text-lg">{usuario.nombre}</td>
                  <td className="py-4 px-6 text-gray-300 text-base sm:text-lg">{usuario.rol}</td>
                  <td className="py-4 px-6 text-center flex items-center justify-center space-x-2">
                    <button
                      className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                      Eliminar
                    </button>
                    <button
                      className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
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
