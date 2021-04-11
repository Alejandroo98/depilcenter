const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let datosReservaSchema = new Schema({
  nombres: {
    type: String,
    required: [true, 'Los nombres son necesarios'],
  },

  email: {
    type: String,
    required: [true, 'El email es necesario'],
  },

  numeroTelefono: {
    type: String,
    required: [true, 'EL numero telefonico es necesario'],
  },

  fechaCumpleanios: {
    type: String,
    required : false
  },

  suscrito : {
    type : Boolean,
    required : false,
    default : false
  },

  fechaRegistro: {
    type: String,
    required: [true, 'La fecha de registro es importante'],
  },
});

module.exports = mongoose.model('datosReserva', datosReservaSchema);
