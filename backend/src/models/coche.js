import mongoose from 'mongoose';

const CocheSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  precio: { type: Number, required: true }, // Soporta decimales
  stock: { type: Number, required: true, min: 0 },
  anio: { type: Number, required: true },
  concesionario_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'concesionario', 
    required: true 
  }
});

export default mongoose.model('coche', CocheSchema);