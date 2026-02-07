import express from 'express';
import Concesionario from '../models/concesionario.js';
import Coche from '../models/coche.js';
import Cliente from '../models/cliente.js';
import Venta from '../models/venta.js';

const router = express.Router();

router.post('/reset-db', async (req, res) => {
    try {
        // Limpiar colecciones
        await Promise.all([
            Concesionario.deleteMany({}),
            Coche.deleteMany({}),
            Cliente.deleteMany({}),
            Venta.deleteMany({})
        ]);

        // Crear Concesionario
        const concesionario = await Concesionario.create({
            nombre: "Gaming Motors Madrid",
            ubicacion: "Calle Tech 123",
            CIF: "B12345678"
        });

        // Crear Coche
        const coche = await Coche.create({
            marca: "Tesla",
            modelo: "Model 3",
            precio: 45000,
            stock: 10,
            anio: 2024,
            concesionario_id: concesionario._id
        });

        // Crear Cliente
        const cliente = await Cliente.create({
            dni: "12345678Z",
            nombre: "Iván García",
            email: "ivan@ejemplo.com",
            telefono: "600123456"
        });

        // Crear Venta
        const venta = await Venta.create({
            cliente_id: cliente._id,
            coche_id: coche._id,
            precio_final: 44500,
            metodo_pago: "Financiación"
        });

        res.status(201).json({
            message: "Base de datos inicializada (ESM)",
            data: { venta_id: venta._id }
        });

    } catch (error) {
        res.status(500).json({ 
            error: "Error en el seeding", 
            details: error.message 
        });
    }
});

// La exportación por defecto para que app.js lo reconozca
export default router;