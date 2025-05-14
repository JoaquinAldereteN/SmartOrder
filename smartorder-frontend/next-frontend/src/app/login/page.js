'use client';
import { useState } from 'react';
import Image from 'next/image';
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-black text-white flex flex-col items-center p-8 rounded-lg">
        <div className="mb-6">
          <Image
            src="/logo.png"
            alt="SmartOrder Logo"
            width={225}
            height={225}
            className="rounded-full object-contain"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">SmartOrder</h1>

        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Nombre de usuario"
            className="bg-gray-800 text-white p-3 rounded-md outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              className="bg-gray-800 text-white p-3 pr-12 rounded-md w-full outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Botón mostrar/ocultar */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-200"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="bg-[#1E1E8F] hover:bg-[#151572] transition-colors text-white py-3 rounded-md font-semibold"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
