import mongoose from 'mongoose';

const VentaSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    cliente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente',
        required: true
    },
    coche_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coche',
        required: true
    },
    precio_final: { type: Number, required: true }, // Snapshot del precio acordado
    metodo_pago: {
        type: String,
        enum: ['Efectivo', 'Tarjeta', 'Financiación'],
        required: true
    }
});

export default mongoose.model('venta', VentaSchema);