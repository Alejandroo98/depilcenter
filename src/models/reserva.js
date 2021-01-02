const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reservaSchema = new Schema({
  local: {
    type: String,
    required: [true, 'El local es necesario'],
  },

  servicio: {
    type: String,
    required: [true, 'El servicio es necesario'],
  },

  hora: {
    type: String,
    required: [true, 'La hora es necesaria'],
  },

  fecha: {
    type: Number,
    required: [true, 'La fecha es necesario'],
  },

  fechaRegistro: {
    type: Number,
    required: [true, 'La fecha de registro es importante'],
  },
});

module.exports = mongoose.model('Reserva', reservaSchema);
