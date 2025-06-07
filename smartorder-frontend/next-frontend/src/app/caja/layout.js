"use client";
import React, { useState, useEffect } from "react";
import {
  FiLogOut,
  FiUsers,
  FiBox,
  FiMenu,
  FiX,
  FiPlay,
  FiBarChart2,
} from "react-icons/fi";

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

function DropdownMenu({ title, icon, children }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div>
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center px-3 py-2 font-medium hover:bg-gray-700 rounded transition"
        aria-expanded={open}
        aria-controls={`dropdown-${title.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <span className="flex items-center gap-2 whitespace-nowrap">
          {icon}
          {title}
        </span>
        <span
          className={`transform transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>
      {open && (
        <div
          id={`dropdown-${title.replace(/\s+/g, "-").toLowerCase()}`}
          className="mt-2 pl-4 space-y-2"
        >
          {children}
        </div>
      )}
    </div>
  );
}

const formatoTitulo = (str) =>
  str
    .split("-")
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");

export default function CajaPanel() {
  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const titulo = seccionActiva === "inicio" ? "Inicio" : formatoTitulo(seccionActiva);
    document.title = `Panel Caja - ${titulo}`;
  }, [seccionActiva]);

  const renderContenido = () => {
    switch (seccionActiva) {
      // case "ver-pedidos":
      //   return <VerPedidos />;
      // case "cerrar-caja":
      //   return <CerrarCaja />;
      // case "iniciar-caja":
      //   return <IniciarCaja />;
      // case "ventas-del-dia":
      //   return <VentasDelDia />;
      default:
        return <p className="text-white">Selecciona una opción del menú.</p>;
    }
  };

  const handleSeleccion = (seccion) => {
    setSeccionActiva(seccion);
    setMenuAbierto(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gray-50 overflow-hidden shadow-2xl relative">
      <button
        onClick={() => setMenuAbierto(true)}
        className="fixed top-4 right-4 z-50 bg-[#161617] p-2 rounded-md md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        aria-label="Abrir menú"
      >
        <FiMenu size={24} />
      </button>

      <aside className="hidden md:flex md:flex-col md:w-72 bg-[#131416] text-white p-6 flex-shrink-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-600">Panel de Caja</h1>
          <p className="text-sm text-gray-400 mt-1">
            Gestión de facturación, pagos y pedidos
          </p>
        </div>

        <nav className="flex flex-col space-y-4 flex-grow overflow-y-auto" aria-label="Menú principal">
          <DropdownMenu title="Caja" icon={<FiUsers />}>
            <button
              onClick={() => handleSeleccion("ver-pedidos")}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              Ver Pedidos
            </button>
            <button
              onClick={() => handleSeleccion("cerrar-caja")}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              Cerrar Caja
            </button>
          </DropdownMenu>

          <DropdownMenu title="Gestión de productos" icon={<FiBox />}>
            <button
              onClick={() => handleSeleccion("crear-producto")}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              Crear Producto
            </button>
            <button
              onClick={() => handleSeleccion("ver-productos")}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              Ver Productos
            </button>
          </DropdownMenu>

          <NavItem href="#" icon={<FiPlay />} onClick={() => handleSeleccion("iniciar-caja")}>
            Iniciar Caja
          </NavItem>
          <NavItem href="#" icon={<FiBarChart2 />} onClick={() => handleSeleccion("ventas-del-dia")}>
            Ventas del Día
          </NavItem>

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

      {menuAbierto && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuAbierto(false)}
            aria-hidden="true"
          />
          <aside
            className="fixed inset-y-0 left-0 w-64 bg-[#131416] text-white p-6 z-50 flex flex-col shadow-lg overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
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

            <nav className="flex flex-col space-y-4 flex-grow" aria-label="Menú principal móvil">
              <DropdownMenu title="Caja" icon={<FiUsers />}>
                <button
                  onClick={() => handleSeleccion("ver-pedidos")}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
                >
                  Ver Pedidos
                </button>
                <button
                  onClick={() => handleSeleccion("cerrar-caja")}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
                >
                  Cerrar Caja
                </button>
              </DropdownMenu>

              <DropdownMenu title="Gestión de productos" icon={<FiBox />}>
                <button
                  onClick={() => handleSeleccion("crear-producto")}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
                >
                  Crear Producto
                </button>
                <button
                  onClick={() => handleSeleccion("ver-productos")}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
                >
                  Ver Productos
                </button>
              </DropdownMenu>

              <NavItem href="#" icon={<FiPlay />} onClick={() => handleSeleccion("iniciar-caja")}>
                Iniciar Caja
              </NavItem>
              <NavItem href="#" icon={<FiBarChart2 />} onClick={() => handleSeleccion("ventas-del-dia")}>
                Ventas del Día
              </NavItem>

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

      <main
        className="flex-1 p-6 md:p-10 rounded-r-lg shadow-inner overflow-auto"
        style={{ backgroundColor: "#2C2B2B", minHeight: "100vh" }}
      >
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-2 text-white" tabIndex={-1}>
          {seccionActiva === "inicio" ? "Inicio" : formatoTitulo(seccionActiva)}
        </h2>
        {renderContenido()}
      </main>
    </div>
  );
}
