const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Cargar variables de entorno
dotenv.config();

// Conexión a MongoDB
connectDB();

const app = express();

// Middleware para JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡SmartOrder backend funcionando!');
});

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);

app.use('/api/orders', require('./routes/orderRoutes'));

// Servidor escuchando
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
