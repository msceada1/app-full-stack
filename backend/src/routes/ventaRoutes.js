import express from 'express';
import { registrarVenta, historialVentas } from '../controllers/ventaController.js';

const router = express.Router();

router.post('/', registrarVenta);

router.get('/historial', historialVentas);

export default router;