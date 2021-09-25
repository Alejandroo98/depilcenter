const servicios = require('../DB/servicios.json');

const filterServicios = (item, value) => {
  const serviciosFind = servicios.filter((servicio) => {
    return servicio[item] == value;
  });

  return serviciosFind;
};

module.exports = { filterServicios };
