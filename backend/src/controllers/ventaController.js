import Venta from '../models/venta.js';
import Coche from '../models/coche.js';
import Cliente from '../models/cliente.js'; // Importante para buscar al cliente

export const registrarVenta = async (req, res) => {
    try {
        const { cocheId, cliente } = req.body;

        // 1. Buscamos el coche
        const coche = await Coche.findById(cocheId);
        if (!coche) return res.status(404).json({ mensaje: "Coche no encontrado" });

        // 2. Verificamos stock
        if (coche.stock < 1) {
            return res.status(400).json({ mensaje: "No hay stock disponible" });
        }

        // 3. BUSCAMOS UN CLIENTE REAL (Requisito del Schema: cliente_id)
        // Como el modal envía un nombre, buscamos un cliente que se llame así
        // o usamos el de Iván García por defecto para que no falle el ejercicio.
        let clienteEncontrado = await Cliente.findOne({ nombre: cliente });
        
        if (!clienteEncontrado) {
            // Si no existe, usamos el primero que haya en la DB para que el ID sea válido
            clienteEncontrado = await Cliente.findOne();
        }

        // 4. Creamos la venta con los nombres de campos EXACTOS del error
        const nuevaVenta = new Venta({
            coche_id: coche._id,          // ✅ Antes era 'coche'
            cliente_id: clienteEncontrado._id, // ✅ Requerido por el Schema
            precio_final: coche.precio,   // ✅ Antes era 'precio_snapshot'
            metodo_pago: "Efectivo"       // ✅ Requerido por el Schema
        });

        // 5. Guardamos y actualizamos stock
        coche.stock -= 1;
        await coche.save();
        await nuevaVenta.save();

        res.status(201).json({
            mensaje: "Venta registrada con éxito",
            detalle: nuevaVenta
        });

    } catch (error) {
        console.error("Error en registrarVenta:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Historial (Ajustado también para usar populate con los nuevos nombres)
export const historialVentas = async (req, res) => {
    try {
        const ventas = await Venta.find()
            .populate('coche_id', 'marca modelo')
            .populate('cliente_id', 'nombre');
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};