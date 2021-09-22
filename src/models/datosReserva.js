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

  suscrito: {
    type: String,
    required: false,
    default: false,
  },

  fechaRegistro: {
    type: String,
    required: [true, 'La fecha de registro es importante'],
  },

  img: {
    type: String,
  },
});

module.exports = mongoose.model('datosReservas', datosReservaSchema);
