const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductsByName,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Proteger todas las rutas
router.post('/', protect, authorizeRoles('admin'), createProduct);
router.get('/', protect, getAllProducts); // accesible a usuarios logueados
router.get('/search', protect, getProductsByName); // accesible a usuarios logueados
router.put('/:id', protect, authorizeRoles('admin'), updateProduct);
router.delete('/:id', protect, authorizeRoles('admin'), deleteProduct);

module.exports = router;
