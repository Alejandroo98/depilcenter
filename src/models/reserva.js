const mongoose = require('mongoose');
const datosReserva = require('./datosReserva');
const Schema = mongoose.Schema;

let reservaSchema = new Schema({
  reservaData: {
    type: Object,
  },

  locales: {
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

  infoReserva: {
    type: String,
  },

  zonas: {
    type: String,
  },

  valorTotal: {
    type: String,
  },

  idUser: {
    type: Schema.Types.ObjectId,
    ref: datosReserva,
  },
});

module.exports = mongoose.model('reservas', reservaSchema);
