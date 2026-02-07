const mongoose = require('mongoose');

const ConcesionarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true },
  CIF: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Concesionario', ConcesionarioSchema);