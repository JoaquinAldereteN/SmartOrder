const express = require('express');
const {
  getMesas,
  createMesa,
  updateEstadoMesa,
  deleteMesa,
  liberarMesa
} = require('../controllers/mesaController');

const router = express.Router();

router.get("/", getMesas);
router.post("/", createMesa);
router.put("/:id", updateEstadoMesa);
router.delete("/:id", deleteMesa);

// NUEVO: Liberar mesa (poner en "disponible")
router.patch("/:id/liberar", liberarMesa);

module.exports = router;
