"use client";
import React, { useState, useEffect } from "react";
import CrearUsuario from "./users/create_user/page";
import VerUsuarios from "./users/user_list/page";
import CrearProducto from "./products/create_product/page";

import { FiLogOut, FiUsers, FiBox, FiMenu, FiX } from "react-icons/fi";

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

const formatoTitulo = (str) => {
  return str
    .split("-")
    .map((palabra) => palabra[0].toUpperCase() + palabra.slice(1))
    .join(" ");
};

export default function AdminPanel() {
  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Actualiza el título de la pestaña cada vez que cambia seccionActiva
  useEffect(() => {
    const tituloSeccion = seccionActiva === "inicio" ? "Inicio" : formatoTitulo(seccionActiva);
    document.title = `Panel Administración - ${tituloSeccion}`;
  }, [seccionActiva]);

  const renderContenido = () => {
    switch (seccionActiva) {
      case "crear-usuario":
        return <CrearUsuario />;
      case "ver-usuarios":
        return <VerUsuarios />;
      case "crear-producto":
        return <CrearProducto />;

      default:
        return <p className="text-white">Selecciona una opción del menú.</p>;
    }
  };

  const handleSeleccion = (seccion) => {
    setSeccionActiva(seccion);
    setMenuAbierto(false); // cerrar menú al seleccionar opción en móvil
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 overflow-hidden shadow-2xl relative">
      {/* Botón hamburguesa fijo arriba a la derecha */}
      <button
        onClick={() => setMenuAbierto(true)}
        className="fixed top-4 right-4 z-50 bg-[#161617] p-2 rounded-md md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        aria-label="Abrir menú"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar fijo en desktop */}
      <aside className="hidden md:flex md:flex-col md:w-72 bg-[#131416] text-white p-6 flex-shrink-0">
        {/* Título y subtítulo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-600">Panel de Admin</h1>
          <p className="text-sm text-gray-400 mt-1">Gestión de usuarios y productos</p>
        </div>

        <nav className="flex flex-col space-y-4 flex-grow overflow-y-auto">
          <DropdownMenu title="Gestión de usuarios" icon={<FiUsers />}>
            <button
              onClick={() => handleSeleccion("crear-usuario")}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              Crear Usuario
            </button>
            <button
              onClick={() => handleSeleccion("ver-usuarios")}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              Ver Usuarios
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

      {/* Sidebar móvil como drawer */}
      {menuAbierto && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuAbierto(false)}
          />

          {/* Panel lateral */}
          <aside className="fixed inset-y-0 left-0 w-64 bg-[#131416] text-white p-6 z-50 flex flex-col shadow-lg overflow-y-auto">
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-600">Panel de Admin</h1>
              <button
                onClick={() => setMenuAbierto(false)}
                className="text-white focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
                aria-label="Cerrar menú"
              >
                <FiX size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 flex-grow">
              <DropdownMenu title="Gestión de usuarios" icon={<FiUsers />}>
                <button
                  onClick={() => handleSeleccion("crear-usuario")}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
                >
                  Crear Usuario
                </button>
                <button
                  onClick={() => handleSeleccion("ver-usuarios")}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
                >
                  Ver Usuarios
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
        style={{ backgroundColor: "#2C2B2B", minHeight: "100vh" }}
      >
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-2 text-white">
          {seccionActiva === "inicio" ? "Inicio" : formatoTitulo(seccionActiva)}
        </h2>
        {renderContenido()}
      </main>
    </div>
  );
}

function DropdownMenu({ title, icon, children }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-3 py-2 font-medium hover:bg-gray-700 rounded transition"
      >
        <span className="flex items-center gap-2 whitespace-nowrap">
          {icon && icon}
          {title}
        </span>
        <span
          className={`transform transition-transform ${open ? "rotate-180" : "rotate-0"}`}
        >
          ▼
        </span>
      </button>
      {open && <div className="mt-2 pl-4 space-y-2">{children}</div>}
    </div>
  );
}
