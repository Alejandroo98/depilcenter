const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let datosReservaSchema = new Schema({
  nombres: {
    type: String,
    required: [true, 'Los nombres son necesarios'],
  },

  numeroTelefono: {
    type: String,
    required: false,
  },

  fechaCumpleanios: {
    type: String,
    required: false,
  },

  email: {
    type: String,
  },

  suscrito: {
    type: Boolean,
    required: false,
    default: false,
  },

  fechaRegistro: {
    type: Date,
    required: [true, 'La fecha de registro es importante'],
  },

  img: {
    type: String,
  },
});

module.exports = mongoose.model('datosReserva', datosReservaSchema);
