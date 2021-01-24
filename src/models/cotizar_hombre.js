const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let datosCotizarHombre = new Schema({
  nombre: {
    type: String,
  },

  precioIndividual: {
    type: String,
  },

  precioCombo: {
    type: String,
  },

  tipo: {
    type: String,
  },
});

module.exports = mongoose.model('cotizarhombres', datosCotizarHombre);
