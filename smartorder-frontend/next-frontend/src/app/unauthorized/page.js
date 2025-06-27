'use client';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">⛔ Acceso Denegado</h1>
      <p className="text-lg mb-6">No tienes permisos para acceder a esta sección.</p>
      <Link href="/login" className="text-blue-500 underline hover:text-blue-300">
        Volver al login
      </Link>
    </div>
  );
}
