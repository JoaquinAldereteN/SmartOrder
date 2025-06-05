import React, { useState } from "react";

export default function MozoLogin({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación mock: usuario y contraseña no vacíos
    if (usuario.trim() && password.trim()) {
      setError("");
      onLogin({ usuario });
    } else {
      setError("Ingrese usuario y contraseña");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#23232d] p-2">
      <form
        onSubmit={handleSubmit}
        className="bg-[#161617] text-white rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center gap-6 p-8 relative"
        style={{ minHeight: 480 }}
      >
        <img
          src="/logo-mozos.png"
          alt="Logo Mozo"
          className="w-24 h-24 rounded-full bg-[#23232d] object-contain mx-auto mb-2 border-4 border-[#23232d] shadow"
          onError={e => (e.target.style.display = 'none')}
        />
        <div className="text-3xl font-black text-center mb-1 font-[Montserrat,Inter,sans-serif]">SmartOrder</div>
        <div className="text-gray-400 text-center mb-4 text-base">Acceso para mozos</div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm font-bold mb-1" htmlFor="usuario">Nombre de usuario</label>
          <input
            id="usuario"
            className="rounded-lg px-4 py-3 bg-[#23232d] border border-blue-900 focus:border-blue-500 text-white placeholder-gray-400 shadow focus:ring-2 focus:ring-blue-600/30 transition"
            placeholder="Ingrese su usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm font-bold mb-1" htmlFor="password">Contraseña</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="rounded-lg px-4 py-3 bg-[#23232d] border border-blue-900 focus:border-blue-500 text-white placeholder-gray-400 shadow focus:ring-2 focus:ring-blue-600/30 transition w-full pr-10"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                <span role="img" aria-label="Ocultar">🙈</span>
              ) : (
                <span role="img" aria-label="Mostrar">👁️</span>
              )}
            </button>
          </div>
        </div>
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        <button
          type="submit"
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl w-full shadow-lg text-lg tracking-wide transition-all"
        >
          Iniciar Sesión
        </button>
        <div className="text-xs text-gray-500 mt-6">© 2025 SmartOrder. Todos los derechos reservados.</div>
      </form>
    </div>
  );
}
