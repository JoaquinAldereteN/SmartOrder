const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Función para generar el token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Registro
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Este usuario ya existe' });

    const newUser = await User.create({ username, password, role });
    const token = generateToken(newUser);

    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ message: 'Registro fallido', error });
  }
};

// Login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Credenciales invalidas' });
    }

    // Verificar que process.env.JWT_SECRET esté correctamente cargado
    // console.log('JWT Secret:', process.env.JWT_SECRET);  // Esto debe mostrar la clave secreta en consola

    const token = generateToken(user);
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Inicio de sesion fallido', error });
  }
};

const getUserProfile = (req, res) => {
    try {
      res.json(req.user); // Ya viene completo desde el middleware
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el perfil' });
    }
  };
  
  module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
  };