"use client";
import React, { useState, useEffect } from "react";
import { FiLogOut, FiPlay, FiBarChart2, FiUsers, FiMenu, FiX } from "react-icons/fi";
import CajaBoxPage from "./box/page";


function NavItem({ href, children, icon, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block px-3 py-2 rounded hover:bg-gray-700 transition flex items-center"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </a>
  );
}

const formatoTitulo = (str) =>
  str
    .split("-")
    .map((palabra) => palabra[0].toUpperCase() + palabra.slice(1))
    .join(" ");

export default function CajaPanel() {
  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const tituloSeccion = seccionActiva === "inicio" ? "Inicio" : formatoTitulo(seccionActiva);
    document.title = `Panel Caja - ${tituloSeccion}`;
  }, [seccionActiva]);

  const renderContenido = () => {
    switch (seccionActiva) {
      case "caja":
           return <CajaBoxPage />;
      default:
        return <p className="text-white">Selecciona una opción del menú.</p>;
    }
  };

  const handleSeleccion = (seccion) => {
    setSeccionActiva(seccion);
    setMenuAbierto(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 overflow-hidden shadow-2xl relative">
      {/* Botón hamburguesa móvil */}
      <button
        onClick={() => setMenuAbierto(true)}
        className="fixed top-4 right-4 z-50 bg-[#161617] p-2 rounded-md md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        aria-label="Abrir menú"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex md:flex-col md:w-72 bg-[#131416] text-white p-6 flex-shrink-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-600">Panel de Caja</h1>
          <p className="text-sm text-gray-400 mt-1">Gestión de ventas y caja</p>
        </div>

        <nav className="flex flex-col space-y-4 flex-grow overflow-y-auto">
          <button
            onClick={() => handleSeleccion("caja")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition flex items-center gap-2"
          >
            <FiUsers /> Caja
          </button>

          <button
            onClick={() => handleSeleccion("iniciar-caja")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition flex items-center gap-2"
          >
            <FiPlay /> Iniciar Caja
          </button>

          <button
            onClick={() => handleSeleccion("ventas-del-dia")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition flex items-center gap-2"
          >
            <FiBarChart2 /> Ventas del Día
          </button>

          <NavItem
            href="/logout"
            icon={<FiLogOut size={18} />}
            onClick={(e) => {
              e.preventDefault();
              alert("Cerrando sesión...");
              setMenuAbierto(false);
            }}
          >
            Cerrar Sesión
          </NavItem>
        </nav>
      </aside>

      {/* Sidebar móvil (drawer) */}
      {menuAbierto && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuAbierto(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-[#131416] text-white p-6 z-50 flex flex-col shadow-lg overflow-y-auto">
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-600">Panel de Caja</h1>
              <button
                onClick={() => setMenuAbierto(false)}
                className="text-white focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
                aria-label="Cerrar menú"
              >
                <FiX size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 flex-grow">
              <button
                onClick={() => handleSeleccion("caja")}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition flex items-center gap-2"
              >
                <FiUsers /> Caja
              </button>

              <button
                onClick={() => handleSeleccion("iniciar-caja")}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition flex items-center gap-2"
              >
                <FiPlay /> Iniciar Caja
              </button>

              <button
                onClick={() => handleSeleccion("ventas-del-dia")}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition flex items-center gap-2"
              >
                <FiBarChart2 /> Ventas del Día
              </button>

              <NavItem
                href="/logout"
                icon={<FiLogOut size={18} />}
                onClick={(e) => {
                  e.preventDefault();
                  alert("Cerrando sesión...");
                  setMenuAbierto(false);
                }}
              >
                Cerrar Sesión
              </NavItem>
            </nav>
          </aside>
        </>
      )}

      {/* Contenido principal */}
      <main
        className="flex-1 p-6 md:p-10 rounded-r-lg shadow-inner overflow-auto"
        style={{ backgroundColor: "#111827", minHeight: "100vh" }}
      >
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-2 text-white">
          {seccionActiva === "inicio" ? "Inicio" : formatoTitulo(seccionActiva)}
        </h2>
        {renderContenido()}
      </main>
    </div>
  );
}
