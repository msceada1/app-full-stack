import Venta from '../models/Venta.js';
import Coche from '../models/coche.js';

// 2.3 Lógica de Negocio: Transacción de Venta
export const registrarVenta = async (req, res) => {
    try {
        const { cocheId, cliente } = req.body;

        // 1. Buscamos el coche
        const coche = await Coche.findById(cocheId);

        if (!coche) {
            return res.status(404).json({ mensaje: "Coche no encontrado" });
        }

        // 2. Verificamos stock
        if (coche.stock < 1) {
            return res.status(400).json({ mensaje: "No hay stock disponible para este vehículo" });
        }

        // 3. Restamos stock y guardamos
        coche.stock -= 1;
        await coche.save();

        // 4. Creamos la venta con el SNAPSHOT del precio actual
        const nuevaVenta = new Venta({
            coche: coche._id,
            cliente: cliente, // Aquí iría el ID del cliente si tuvieras modelo Cliente
            precio_snapshot: coche.precio // Importante: Precio congelado al momento de venta
        });

        await nuevaVenta.save();

        res.status(201).json({
            mensaje: "Venta registrada con éxito",
            detalle: nuevaVenta,
            stock_restante: coche.stock
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2.2 Historial de ventas con Populate
export const historialVentas = async (req, res) => {
    try {
        // .populate('coche') rellena los datos del coche usando el ID guardado en la venta
        // .select('marca modelo') indica que solo queremos ver esos campos del coche
        const ventas = await Venta.find().populate('coche', 'marca modelo precio');

        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};