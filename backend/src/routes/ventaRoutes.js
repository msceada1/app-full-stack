import express from 'express';

const router = express.Router();

// Ruta mínima: listar ventas (placeholder)
router.get('/', (req, res) => {
  res.json({ message: 'Listado de ventas (placeholder)' });
});

export default router;
