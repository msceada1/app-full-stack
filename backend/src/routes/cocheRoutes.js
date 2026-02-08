import express from 'express';
import { 
    crearCoche, 
    actualizarCoche, 
    eliminarCoche, 
    buscarCoches 
} from '../controllers/cocheController.js';

const router = express.Router();

// --- 1. RUTAS DE LECTURA (GET) ---

// 2.2 Consultas Avanzadas (Filtros específicos: /api/coches/search?marca=Tesla)
// El orden importa: definimos 'search' antes que los parámetros con ':'
router.get('/search', buscarCoches);

// ✨ MODIFICACIÓN: Ruta raíz para el listado general
// Permite que el frontend llame a /api/coches y reciba todos los datos
router.get('/', buscarCoches); 


// --- 2. GESTIÓN DE INVENTARIO (CRUD) ---

// 2.1 POST: Insertar un nuevo vehículo
router.post('/', crearCoche);

// 2.1 PUT: Actualizar información de un vehículo por su ID
router.put('/:id', actualizarCoche);

// 2.1 DELETE: Eliminar un vehículo por su ID
router.delete('/:id', eliminarCoche);


export default router;