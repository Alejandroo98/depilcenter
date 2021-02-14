const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let datosCombosDB = new Schema({
  nombreCombo: {
    type: String,
  },

  zonas: {
    type: Array,
  },

  precio: {
    type: Number,
  },
});

module.exports = mongoose.model('combos', datosCombosDB);
