const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Registro y Login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Ruta protegida - Perfil del usuario logueado
router.get('/profile', protect, getUserProfile);

module.exports = router;
