const { getHour } = require('../helpers/getTime');
const { haveNumber } = require('./validaciones');

const oneName = (nombres) => {
  const nombre = nombres.split(' ');
  return nombre[0];
};

const timeDay = () => {
  const saludo = ['buen día ☀', 'buenas tardes ☁', 'buenas noches 🌓'];
  const hora = getHour().split(':')[0];
  const minutos = getHour().split(':')[1];
  console.log('Esta es la hora', hora);

  if (hora >= 19) {
    return saludo[2];
  } else if (hora >= 12) {
    return saludo[1];
  } else if (hora >= 0) {
    return saludo[0];
  }
};

const saludo = (nombreClienteEvaluar) => {
  console.log(nombreClienteEvaluar);

  let nombreCliente = '';

  if (haveNumber(nombreClienteEvaluar)) {
    nombreCliente = oneName(nombreClienteEvaluar);
  }

  const horaDelDia = timeDay();

  return `Señorita ${nombreCliente}, ${horaDelDia}. Gracias por su mensaje, responderemos lo antes posible. `;
};

module.exports = {
  oneName,
  timeDay,
  saludo,
};
