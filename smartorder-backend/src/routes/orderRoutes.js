const express = require('express');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus
} = require('../controllers/orderController');

const router = express.Router();

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Todas protegidas con token
router.post('/', protect, authorizeRoles('waiter', 'admin'), createOrder);
router.get('/', protect, authorizeRoles('waiter', 'admin', 'cashier'), getOrders);
router.get('/:id', protect, authorizeRoles('waiter', 'admin'), getOrderById);
router.put('/:id', protect, updateOrder);
router.delete('/:id', protect, authorizeRoles('admin', 'waiter'), deleteOrder);
router.patch('/:id/status', protect, updateOrderStatus);


module.exports = router;
