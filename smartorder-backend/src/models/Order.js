const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  sector: { // cocina o barra
    type: String,
    enum: ['cocina', 'barra'],
    required: true
  },
  status: { // Estado de este item puntual
    type: String,
    enum: ['pendiente', 'en preparación', 'listo', 'en mesa'],
    default: 'pendiente'
  },
  agregado: { // Para distinguir si fue agregado después de creado el pedido
    type: Boolean,
    default: false
  }
});

const orderSchema = new mongoose.Schema({
  items: [itemSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: { // Estado general del pedido
    type: String,
    enum: ['pendiente', 'en preparación', 'listo', 'en mesa', 'a cobrar', 'pagado', 'cerrado'],
    default: 'pendiente'
  },
  notes: { type: String },
  mesa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mesa',
    required: true
    // unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
