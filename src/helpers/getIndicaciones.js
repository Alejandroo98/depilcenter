const servicios = require('../DB/indicaciones.json');

const getIndicaciones = (query) => {
  const servicio = servicios[0][query];

  if (servicio) return [servicio];

  return Object.values(servicios[0]);
};

module.exports = { getIndicaciones };
