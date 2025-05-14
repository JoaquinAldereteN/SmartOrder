const Product = require('../models/Product');

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    console.log(req.body);  
    try {
    const { name, price, category, available } = req.body;
    const newProduct = new Product({ name, price, category, available });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el producto' });
  }
};

// Eliminar un producto por ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

// Editar un producto por ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, category } = req.body;

        // Buscar el producto por ID y actualizarlo
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, category },
            { new: true } // Devuelve el documento actualizado
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

// Buscar productos por nombre
const getProductsByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "Se requiere el parámetro 'name'" });
    }

    // Búsqueda insensible a mayúsculas/minúsculas y parcial
    const products = await Product.find({
      name: { $regex: name, $options: 'i' }
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar productos", error });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsByName
};
