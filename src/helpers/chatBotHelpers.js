const { getHour } = require('../helpers/getTime');
const { haveNumber } = require('./validaciones');
const zonasDB = require('../DB/chat-bot-zonas.json');

const zonasArray = [
  'axilas',
  'media',
  'piernas completas',
  'media pierna',
  'bikini',
  'bikini brasilero',
  'rostro',
  'facial',
  'patillas',
  'medio brazo',
  'brazos completos',
  'gluteos',
];

const comprovarZonas = (zonas) => {
  zonas = zonas.replace(/^\s*|\s*$/g, '');
  zonas.toLocaleLowerCase();
  const zonasSplit = zonas.split(',');

  let zonasSendsClient = '';
  for (let i = 0; i < zonasSplit.length; i++) {
    const findZona = zonasDB[0][zonasSplit[i]];
    zonasSendsClient = zonasSendsClient + findZona;
  }

  return zonasSendsClient + '0️⃣ *MENU PRINCIPAL*';
};

const validarZonas = (zonas) => {
  zonas.toLocaleLowerCase();

  for (let i = 0; i < zonasArray.length; i++) {
    if (zonas.includes(zonasArray[i])) {
      return true;
    }
  }

  return false;
};

const palabraClave = (message) => {
  const palabraClave = message.toLocaleLowerCase().includes('promo axilas');
  if (palabraClave) return true;

  return false;
};

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
  palabraClave,
  validarZonas,
  comprovarZonas,
};
