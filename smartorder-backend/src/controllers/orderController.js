const Order = require('../models/Order');

// Crear nuevo pedido
const createOrder = async (req, res) => {
  try {
    const { items, notes, mesa } = req.body;

    const newOrder = new Order({
      items,
      user: req.user._id,
      notes,
      mesa
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pedido', error });
  }
};

// Obtener todos los pedidos
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.product', 'name price')
      .populate('user', 'username')
      .populate('mesa', 'nombre');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos', error });
  }
};

// Obtener un pedido por ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name price')
      .populate('user', 'username');

    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el pedido', error });
  }
};

// Actualizar un pedido
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el pedido', error });
  }
};

// Eliminar un pedido
const deleteOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
      res.json({ message: 'Pedido eliminado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el pedido', error });
    }
  };

  // Actualizar estado de pedido
  const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Validar estados permitidos
      const allowedStatuses = ['pendiente', 'en preparación', 'listo', 'entregado', 'pagado'];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Estado inválido' });
      }
  
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
  
      order.status = status;
      await order.save();
  
      res.json({ message: 'Estado actualizado correctamente', order });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el estado', error });
    }
  };

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus
};
