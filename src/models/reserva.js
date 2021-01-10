const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const datosReserva = require('./datosReserva');

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
    type: String,
    required: [true, 'La fecha es necesario'],
  },

  fechaRegistro: {
    type: String,
    required: [true, 'La fecha de registro es importante'],
  },

  idUser: {
    type: Schema.Types.ObjectId,
    ref: datosReserva,
  },
});

module.exports = mongoose.model('Reserva', reservaSchema);
