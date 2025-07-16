"use client";
import React, { useState, useEffect } from "react";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
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

export default function CajaPanel() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [verificandoRol, setVerificandoRol] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || (role !== 'cashier' && role !== 'admin')) {
      window.location.href = '/unauthorized';
    } else {
      setVerificandoRol(false);
    }
    document.title = "Panel Caja - Caja";
  }, []);

  if (verificandoRol) return null;

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
          <NavItem
            href="/logout"
            icon={<FiLogOut size={18} />}
            onClick={e => {
              e.preventDefault();
              localStorage.removeItem('token');
              localStorage.removeItem('role');
              window.location.href = '/login';
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
              <NavItem
                href="/logout"
                icon={<FiLogOut size={18} />}
                onClick={e => {
                  e.preventDefault();
                  localStorage.removeItem('token');
                  localStorage.removeItem('role');
                  window.location.href = '/login';
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
          Caja
        </h2>
        <CajaBoxPage />
      </main>
    </div>
  );
}
