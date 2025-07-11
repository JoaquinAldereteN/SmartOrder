const Order = require('../models/Order');
const Mesa = require('../models/Mesa');

// Crear nuevo pedido (solo si la mesa NO tiene un pedido abierto)
const createOrder = async (req, res) => {
  try {
    const { items, notes, mesa } = req.body;
    // Verificar si ya existe un pedido abierto para esa mesa
    const existingOrder = await Order.findOne({
      mesa,
      status: { $in: ['pendiente', 'en preparación', 'listo', 'en mesa'] }
    });
    if (existingOrder) {
      return res.status(400).json({ message: 'Ya hay un pedido abierto para esta mesa.' });
    }
    const newOrder = new Order({
      items,
      user: req.user._id,
      notes,
      mesa
    });
    const savedOrder = await newOrder.save();
    await Mesa.findByIdAndUpdate(mesa, { estado: 'ocupada' });
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el pedido', error });
  }
};

// Obtener todos los pedidos (permite filtrar por mesa si viene en el query)
const getOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.mesa) {
      filter.mesa = req.query.mesa;
    }
    const orders = await Order.find(filter)
      .populate('items.product', 'name price category')
      .populate('user', 'username')
      .populate('mesa', 'nombre');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos', error });
  }
};

// Obtener pedidos a cobrar (para caja)
const getOrdersToCharge = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'a cobrar' })
      .populate('items.product', 'name price category')
      .populate('user', 'username')
      .populate('mesa', 'nombre');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos a cobrar', error });
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

// Agregar productos a un pedido abierto (los nuevos van con agregado: true)
const addProductsToOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevosItems } = req.body;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
    nuevosItems.forEach(item => {
      order.items.push({ ...item, agregado: true });
    });
    await order.save();
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar producto', error });
  }
};

// Actualizar estado de un item individual (cocina/barra)
const updateOrderItemStatus = async (req, res) => {
  try {
    const { id, itemId } = req.params;
    const { status } = req.body;
    const allowedItemStatuses = ['pendiente', 'en preparación', 'listo', 'en mesa'];
    if (!allowedItemStatuses.includes(status)) {
      return res.status(400).json({ message: 'Estado de item inválido' });
    }
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
    const item = order.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item no encontrado' });
    item.status = status;
    await order.save();

    // ---- AUTO ACTUALIZA ESTADO DE PEDIDO A 'listo' SI TODOS LOS ITEMS ESTAN 'listo' O 'en mesa'
    const allListoOMesa = order.items.length > 0 &&
      order.items.every(i => i.status === 'listo' || i.status === 'en mesa');
    if (allListoOMesa && order.status !== 'listo') {
      order.status = 'listo';
      await order.save();
      console.log(`[AUTO] Pedido ${order._id} ahora está LISTO (todos los items listos o en mesa)`);
    }

    res.json({ message: 'Estado de item actualizado', item });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar estado de item', error });
  }
};

// Actualizar estado de pedido (en mesa, a cobrar, pagado, etc)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatuses = ['pendiente', 'en preparación', 'listo', 'en mesa', 'a cobrar', 'pagado'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Estado inválido' });
    }
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    // --- DEBUG LOGS ---
    console.log(`[UPDATE STATUS] Pedido: ${id} - Estado pedido actual: ${order.status} - Nuevo estado: ${status}`);
    console.log(`[UPDATE STATUS] Items actuales:`, order.items);

    // Si el pedido pasa a 'en mesa', actualizar items que estén 'listo' a 'en mesa'
    if (status === "en mesa") {
      let anyListo = false;
      order.items.forEach(item => {
        if (item.status === "listo") {
          item.status = "en mesa";
          anyListo = true;
        }
      });
      if (!anyListo) {
        return res.status(400).json({ message: 'No hay productos listos para entregar en mesa.' });
      }
    }

    order.status = status;
    await order.save();

    // if (status === 'pagado') {
    //   await Mesa.findByIdAndUpdate(order.mesa, { estado: 'disponible' });
    // }
    res.json({ message: 'Estado actualizado correctamente', order });
  } catch (error) {
    console.error("Error en updateOrderStatus:", error);
    res.status(500).json({ message: 'Error al actualizar el estado', error: error.message });
  }
};

// Eliminar un pedido
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    await Mesa.findByIdAndUpdate(order.mesa, { estado: 'disponible' });
    res.json({ message: 'Pedido eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el pedido', error });
  }
};

// Pedidos por sector (cocina o barra) — NO mostrar los items "en mesa"
const getOrdersBySector = async (req, res) => {
  try {
    const { sector } = req.params; // 'cocina' o 'barra'
    const orders = await Order.find({
      status: { $in: ['pendiente', 'en preparación', 'listo', 'en mesa'] }
    })
      .populate('items.product', 'name price category')
      .populate('mesa', 'nombre')
      .populate('user', 'username');
    // Filtrar SOLO items del sector que NO estén en mesa
    const result = orders.map(order => {
      const items = order.items.filter(i => i.sector === sector && i.status !== 'en mesa');
      return items.length > 0 ? { ...order.toObject(), items } : null;
    }).filter(Boolean);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al filtrar pedidos por sector', error });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrdersToCharge,
  getOrderById,
  addProductsToOrder,
  updateOrderItemStatus,
  updateOrderStatus,
  deleteOrder,
  getOrdersBySector,
};
