const mongoose = require('moongose');
const Schema = mongoose.Schema;

let datosCotizarMujer = new Schema({
  nombre: {
    type: String,
  },

  precioindividual: {
    type: String,
  },

  precioCombo: {
    type: String,
  },
});

module.exports = mongoose.model('cotizarMujer', datosCotizarMujer);
