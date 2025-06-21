const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'en preparación', 'listo', 'entregado', 'pagado'],
    default: 'pendiente'
  },
  notes: {
    type: String
  },
  mesa: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Mesa',
  required: true
}

}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
