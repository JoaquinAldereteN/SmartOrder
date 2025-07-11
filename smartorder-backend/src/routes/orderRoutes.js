const express = require('express');
const {
  createOrder,
  getOrders,
  getOrdersToCharge,
  getOrderById,
  addProductsToOrder,
  updateOrderItemStatus,
  updateOrderStatus,
  deleteOrder,
  getOrdersBySector,
} = require('../controllers/orderController');

const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Crear pedido (solo mozo o admin)
router.post('/', protect, authorizeRoles('waiter', 'admin'), createOrder);

// Listar todos los pedidos (admin, mozo, caja, cocina, barra)
router.get('/', protect, getOrders);

// Obtener pedidos a cobrar (solo caja, podrías cambiar 'cashier' o 'admin' según tu sistema de roles)
router.get('/to-charge', protect, authorizeRoles('cashier', 'admin'), getOrdersToCharge);

// Listar pedidos por sector (cocina/barra)
router.get('/sector/:sector', protect, authorizeRoles('kitchen', 'bar', 'admin'), getOrdersBySector);

// Obtener pedido por id (admin, mozo)
router.get('/:id', protect, authorizeRoles('waiter', 'admin'), getOrderById);

// Agregar productos a un pedido abierto (solo mozo)
router.patch('/:id/add-products', protect, authorizeRoles('waiter', 'admin'), addProductsToOrder);

// Actualizar estado de un item (solo cocina/barra)
router.patch('/:id/item/:itemId/status', protect, authorizeRoles('kitchen', 'bar', 'admin'), updateOrderItemStatus);

// Actualizar estado general del pedido (mozo, admin, caja)
router.patch('/:id/status', protect, authorizeRoles('waiter', 'admin', 'cashier'), updateOrderStatus);

// Eliminar pedido (admin, mozo)
router.delete('/:id', protect, authorizeRoles('admin', 'waiter'), deleteOrder);

module.exports = router;
