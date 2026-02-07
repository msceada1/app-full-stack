import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './src/config/db.js';
import seedRoutes from './src/routes/seedRoutes.js';
import cors from 'cors';

// Importamos las nuevas rutas
import cocheRoutes from './src/routes/cocheRoutes.js';
import ventaRoutes from './src/routes/ventaRoutes.js';

// 1. Cargamos las variables de entorno
dotenv.config();

const app = express();

// 2. Conectamos a la Base de Datos (MongoDB)
connectDB();

// 3. Middlewares
app.use(express.json()); // Para que el servidor entienda JSON
app.use(cors()); // Para permitir solicitudes desde otros dominios

// 4. Definimos el Puerto
// Intentará leer el puerto del archivo .env, si no existe usa el 3000
const PORT = process.env.PORT || 3000;

// 5. Rutas
// Ruta base de bienvenida
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API del Concesionario!');
});

// Rutas de la API
app.use('/api/admin', seedRoutes);   // Semillas
app.use('/api/coches', cocheRoutes); // Inventario y Búsquedas (Puntos 2.1 y 2.2)
app.use('/api/ventas', ventaRoutes); // Transacciones e Historial (Puntos 2.2 y 2.3)

// 6. Inicio del Servidor
app.listen(PORT, () => {
    console.log('🚗 API del Concesionario funcionando en http://localhost:${PORT}');
    console.log('🚀 Presiona Ctrl+C para detener el servidor');
});