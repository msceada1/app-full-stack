import mongoose from 'mongoose';

const ConcesionarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true },
  CIF: { type: String, required: true, unique: true }
});

export default mongoose.model('concesionario', ConcesionarioSchema);