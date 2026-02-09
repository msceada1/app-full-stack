import Coche from '../models/coche.js';

// Insertar vehículo con validación - POST
export const crearCoche = async (req, res) => {
    try {
        const { marca, modelo, precio, stock } = req.body;

        // Validación: Precio mayor a 0
        if (precio <= 0) {
            return res.status(400).json({ mensaje: "El precio debe ser mayor que 0" });
        }

        const nuevoCoche = new Coche(req.body);
        await nuevoCoche.save();
        res.status(201).json(nuevoCoche);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar información PUT
export const actualizarCoche = async (req, res) => {
    try {
        const cocheActualizado = await Coche.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Devuelve el objeto ya modificado
        );
        res.json(cocheActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar vehículo DELETE
export const eliminarCoche = async (req, res) => {
    try {
        await Coche.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Vehículo eliminado del inventario" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Búsqueda avanzada con Query Strings GET
export const buscarCoches = async (req, res) => {
    try {
        const { precio_max, marca, disponibilidad } = req.query;
        let query = {};

        // Filtro por marca
        if (marca) {
            query.marca = { $regex: marca, $options: 'i' }; // Búsqueda insensible a mayúsculas
        }

        // Filtro por precio máximo
        if (precio_max) {
            query.precio = { $lte: precio_max }; // Menor o igual a
        }

        // Filtro por disponibilidad (stock > 0)
        if (disponibilidad === 'true') {
            query.stock = { $gt: 0 }; // Stock mayor a 0
        } else if (disponibilidad === 'false') {
            query.stock = { $lte: 0 };  // Stock menor o igual a 0 
        }

        const coches = await Coche.find(query);
        res.json(coches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};