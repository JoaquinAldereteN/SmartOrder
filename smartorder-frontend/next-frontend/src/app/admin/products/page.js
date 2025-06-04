'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DropdownCustom from '@/components/DropdownCustom';
export default function ProductsAdminPage() {
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
  });

  // Estados para edición
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({
    name: '',
    category: '',
    price: '',
  });

  // Obtener productos
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3001/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Crear producto
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3001/api/products',
        {
          ...newProduct,
          price: parseFloat(newProduct.price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Producto creado:', res.data);
      setNewProduct({ name: '', category: '', price: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error creando producto:', error);
    }
  };

  // Eliminar producto
  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  // Comenzar edición
  const startEditing = (product) => {
    setEditProductId(product._id);
    setEditProductData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
    });
  };

  // Cancelar edición
  const cancelEditing = () => {
    setEditProductId(null);
    setEditProductData({ name: '', category: '', price: '' });
  };

  // Guardar edición
  const saveEditProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3001/api/products/${editProductId}`,
        {
          ...editProductData,
          price: parseFloat(editProductData.price),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditProductId(null);
      setEditProductData({ name: '', category: '', price: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error actualizando producto:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>

      {/* Formulario de creación */}
      <form onSubmit={handleCreateProduct} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          required
          className="border px-3 py-2 w-full rounded"
        />

        <DropdownCustom
        options={[
        { value: '', label: 'Seleccionar categoría' },
        { value: 'Comida', label: 'Comida' },
        { value: 'Bebida', label: 'Bebida' },
        ]}
        value={newProduct.category}
        onChange={(val) => setNewProduct({ ...newProduct, category: val })}
        placeholder="Seleccionar categoría"
        />


        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
          className="border px-3 py-2 w-full rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear Producto
        </button>
      </form>

      {/* Filtros */}
      <div className="flex items-center gap-4 mb-4">
        <DropdownCustom
        options={[
        { value: 'Todos', label: 'Todos' },
        { value: 'Comida', label: 'Comida' },
        { value: 'Bebida', label: 'Bebida' },
        ]}
        value={filterCategory}
        onChange={setFilterCategory}
        placeholder="Filtrar categoría"
        />


        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      {/* Lista de productos filtrada */}
      <h2 className="text-xl font-semibold mb-2">Productos existentes:</h2>
      <ul className="space-y-2">
        {products
          .filter(
            (product) =>
              filterCategory === 'Todos' || product.category === filterCategory
          )
          .filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((product) => (
            <li
              key={product._id}
              className="flex justify-between items-center border px-4 py-2 rounded"
            >
              {editProductId === product._id ? (
                <>
                  <input
                    type="text"
                    value={editProductData.name}
                    onChange={(e) =>
                      setEditProductData({
                        ...editProductData,
                        name: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded mr-2 bg-gray-700"
                  />
                  <select
                    value={editProductData.category}
                    onChange={(e) =>
                      setEditProductData({
                        ...editProductData,
                        category: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded mr-2 bg-gray-700"
                  >
                    <option value="Comida">Comida</option>
                    <option value="Bebida">Bebida</option>
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    value={editProductData.price}
                    onChange={(e) =>
                      setEditProductData({
                        ...editProductData,
                        price: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded mr-2 w-20 bg-gray-700"
                  />
                  <button
                    onClick={saveEditProduct}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <span>
                    {product.name} - ${product.price}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(product)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                    onClick={() => {
                    if (window.confirm(`¿Estás seguro de que querés eliminar el producto "${product.name}"?`)) {
                    handleDeleteProduct(product._id);
                    }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                       Eliminar
                    </button>

                  </div>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
