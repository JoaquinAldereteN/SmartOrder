const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'El nombre es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  category: {
    type: String,
    enum: ['Comida', 'Bebida', 'Postre'],
    required: [true, 'La categoria es obligatoria'],
  },
  available: {
    type: Boolean,
    default: true
  },
  },
  {
    timestamps: true, //Agrega createdAt y updatedAt automaticamente
  }

);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
