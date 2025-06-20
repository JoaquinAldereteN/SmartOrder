const mongoose = require('mongoose');

const mesaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  estado: {
    type: String,
    enum: ["disponible", "ocupada"],
    default: "disponible"
  }
});

module.exports = mongoose.model('Mesa', mesaSchema);
