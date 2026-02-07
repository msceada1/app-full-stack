import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './src/config/db.js';
import seedRoutes from './src/routes/seedRoutes.js';

// 1. Cargamos las variables de entorno
dotenv.config();

const app = express();

// 2. Conectamos a la Base de Datos (MongoDB)
connectDB();

// 3. Middlewares
app.use(express.json()); // Para que el servidor entienda JSON

// 4. Definimos el Puerto
// Intentará leer el puerto del archivo .env, si no existe usa el 3000
const PORT = process.env.PORT || 3000;

// 5. Rutas (Las activaremos cuando creemos los archivos en /src/routes)
// app.use('/api/coches', cocheRoutes);

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API del Concesionario!');
});

// Usar las rutas
app.use('/api/admin', seedRoutes);
app.use('/api/coches', cocheRoutes); // Inventario y Búsquedas
app.use('/api/ventas', ventaRoutes); // Transacciones 

// 6. Inicio del Servidor
app.listen(PORT, () => {
    console.log(`🚗 API del Concesionario funcionando en http://localhost:${PORT}`);
    console.log(`🚀 Presiona Ctrl+C para detener el servidor`);
});