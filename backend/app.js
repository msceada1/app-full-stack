require('dotenv').config(); // Cargamos las variables de entorno al inicio
const express = require('express'); // Importamos Express
const connectDB = require('./src/config/db'); // Importamos la función


const app = express(); // Creamos la aplicación de Express


// Conectamos a la Base de Datos
connectDB();


app.use(express.json()); // Middleware para parsear JSON


// Rutas (La comentamos por ahora para probar que el servidor arranca)
// app.use('/api/juegos', require('./src/routes/videojuegoRoutes'));


app.listen(PORT, () => console.log(`Server funcionando en puerto ${process.env.PORT} 🚀`));
