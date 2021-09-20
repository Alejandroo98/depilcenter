const CotizarHombreDB = require('../models/datosReserva');

module.exports.datosCumpleanieros = async () => {
  const data = await CotizarHombreDB.find({});
  return data;
};
