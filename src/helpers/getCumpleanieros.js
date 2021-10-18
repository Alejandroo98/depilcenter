const CotizarHombreDB = require('../models/datosReserva');
const { getDate } = require('./getTime');

module.exports.datosCumpleanieros = async () => {
  const data = await CotizarHombreDB.find({});
  const today = getDate().split('-')[1];

  const cumpleToday = data.filter((user) => {
    const userToday = user.fechaCumpleanios.split('-')[1];
    return userToday == today;
  });

  return cumpleToday;
};
