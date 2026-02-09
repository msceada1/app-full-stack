import express from 'express';
import { 
    crearCoche, 
    actualizarCoche, 
    eliminarCoche, 
    buscarCoches 
} from '../controllers/cocheController.js';

const router = express.Router();


// Consultas Avanzadas (Filtros específicos: /api/coches/search?marca=Tesla)
// El orden importa, definimos 'search' antes que los parámetros con ':'
router.get('/search', buscarCoches);

// Ruta raíz para el listado general
router.get('/', buscarCoches); 

// Insertar un nuevo vehículo POST
router.post('/', crearCoche);

// Actualizar información de un vehículo por su ID PUT
router.put('/:id', actualizarCoche);

// Eliminar un vehículo por su ID DELETE
router.delete('/:id', eliminarCoche);


export default router;