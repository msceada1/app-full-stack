import mongoose from 'mongoose';

const ClienteSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String }
});

export default mongoose.model('cliente', ClienteSchema);