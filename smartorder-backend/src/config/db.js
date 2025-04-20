const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();  // Asegúrate de tener un archivo .env con la variable MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB conectado con éxito");
  } catch (error) {
    console.error("Error al conectar con MongoDB", error);
    process.exit(1); // Finaliza el proceso si no se conecta a la base de datos
  }
};

module.exports = connectDB;

