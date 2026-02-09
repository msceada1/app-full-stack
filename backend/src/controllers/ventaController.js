import Venta from '../models/venta.js';
import Coche from '../models/coche.js';
import Cliente from '../models/cliente.js';

/**
 * Registra una venta vinculando un coche con un cliente (existente o nuevo)
 */
export const registrarVenta = async (req, res) => {
    try {
        const { cocheId, nombreCliente, dniCliente, metodoPago } = req.body;

        // Validación del Vehículo
        const coche = await Coche.findById(cocheId);
        if (!coche) {
            return res.status(404).json({ mensaje: "Vehículo no encontrado en la base de datos" });
        }

        // Verificamos si hay stock disponible
        if (coche.stock < 1) {
            return res.status(400).json({ mensaje: `Lo sentimos, el ${coche.modelo} ya no tiene stock.` });
        }

        // Buscamos primero por DNI
        let clienteFinal = await Cliente.findOne({ dni: dniCliente });
        
        // Si no lo encontramos, lo creamos automáticamente para no interrumpir el flujo
        if (!clienteFinal) {
            clienteFinal = new Cliente({
                nombre: nombreCliente,
                dni: dniCliente,
                email: "contacto@cliente.com", // Valor por defecto
                telefono: "000000000"          // Valor por defecto
            });
            await clienteFinal.save();
            console.log(`Nuevo cliente registrado: ${nombreCliente}`);
        }

        // Nueva instancia de venta
        const nuevaVenta = new Venta({
            coche_id: coche._id,         
            cliente_id: clienteFinal._id, 
            precio_final: coche.precio,   
            metodo_pago: metodoPago || "Efectivo" // Recibe el valor del dropdown del Modal
        });

        // Restamos una unidad del inventario
        coche.stock -= 1;
        
        await coche.save();
        await nuevaVenta.save();

        res.status(201).json({
            mensaje: "¡Venta procesada con éxito!",
            detalle: {
                coche: `${coche.marca} ${coche.modelo}`,
                cliente: clienteFinal.nombre,
                metodo: nuevaVenta.metodo_pago,
                stock_restante: coche.stock
            }
        });

    } catch (error) {
        console.error("Error en registrarVenta:", error.message);
        res.status(500).json({ error: "Hubo un fallo al procesar la venta. Revisa los logs." });
    }
};

/**
 * Obtiene el historial completo de ventas con datos legibles
 */
export const historialVentas = async (req, res) => {
    try {
        const ventas = await Venta.find()
            .sort({ fecha: -1 }) // Las más recientes primero
            .populate('coche_id', 'marca modelo precio')
            .populate('cliente_id', 'nombre dni');
            
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};