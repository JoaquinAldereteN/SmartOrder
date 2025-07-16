const Mesa = require('../models/Mesa');
const Order = require('../models/Order');

const getMesas = async (req, res) => {
  try {
    const mesas = await Mesa.find();
    res.json(mesas);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener mesas" });
  }
};

const createMesa = async (req, res) => {
  const { nombre } = req.body;
  try {
    const nuevaMesa = new Mesa({ nombre });
    await nuevaMesa.save();
    res.status(201).json(nuevaMesa);
  } catch (err) {
    res.status(400).json({ message: "Error al crear la mesa" });
  }
};

const updateEstadoMesa = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const mesa = await Mesa.findByIdAndUpdate(id, { estado }, { new: true });
    if (!mesa) return res.status(404).json({ message: "Mesa no encontrada" });
    res.json(mesa);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar estado" });
  }
};

// NUEVO: liberar mesa solo actualiza el estado, no borra pedido pagado
const liberarMesa = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("[LIBERAR MESA] ID mesa:", id);

    // 1. Cambiar la mesa a disponible
    const mesa = await Mesa.findByIdAndUpdate(id, { estado: "disponible" }, { new: true });
    if (!mesa) {
      console.log("[ERROR] Mesa no encontrada");
      return res.status(404).json({ message: "Mesa no encontrada" });
    }

    // 2. Cambiar el estado del pedido pagado a finalizado
    const result = await Order.updateMany({ mesa: id, status: "pagado" }, { status: "cerrado" });
    console.log("[UPDATE ORDERS] Modified:", result.modifiedCount);

    res.json({ message: "Mesa liberada, pedido finalizado", mesa });
  } catch (err) {
    console.error("[ERROR liberarMesa]:", err);
    res.status(500).json({ message: "Error al liberar mesa", error: err.message });
  }
};

const deleteMesa = async (req, res) => {
  const { id } = req.params;
  try {
    const mesaEliminada = await Mesa.findByIdAndDelete(id);
    if (!mesaEliminada) return res.status(404).json({ message: "Mesa no encontrada" });
    res.json({ message: "Mesa eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar mesa" });
  }
};

module.exports = {
  getMesas,
  createMesa,
  updateEstadoMesa,
  deleteMesa,
  liberarMesa
};
