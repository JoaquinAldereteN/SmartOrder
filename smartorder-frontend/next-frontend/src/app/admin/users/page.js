'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UsersAdminPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Obtener lista de usuarios
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Crear nuevo usuario
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/users', newUser);
      console.log('Usuario creado:', res.data);
      setNewUser({ name: '', email: '', password: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Eliminar usuario
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administrar Usuarios</h1>

      {/* Formulario de creación */}
      <form onSubmit={handleCreateUser} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
          className="border px-3 py-2 w-full rounded"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
          className="border px-3 py-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
          className="border px-3 py-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Usuario
        </button>
      </form>

      {/* Lista de usuarios */}
      <h2 className="text-xl font-semibold mb-2">Usuarios existentes:</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center border px-4 py-2 rounded"
          >
            <span>{user.name} - {user.email}</span>
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
