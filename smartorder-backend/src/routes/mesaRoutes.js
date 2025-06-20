const express = require('express');
const {
  getMesas,
  createMesa,
  updateEstadoMesa,
  deleteMesa
} = require('../controllers/mesaController');

const router = express.Router();

router.get("/", getMesas);
router.post("/", createMesa);
router.put("/:id", updateEstadoMesa);
router.delete("/:id", deleteMesa);

module.exports = router;
