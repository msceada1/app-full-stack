import express from 'express';
import { 
    crearCoche, 
    actualizarCoche, 
    eliminarCoche, 
    buscarCoches 
} from '../controllers/cocheController.js';

const router = express.Router();

// 2.2 Consultas Avanzadas (El orden importa: search va antes de :id)
router.get('/search', buscarCoches);

// 2.1 Gestión de Inventario (CRUD)
router.post('/', crearCoche);
router.put('/:id', actualizarCoche);
router.delete('/:id', eliminarCoche);

export default router;