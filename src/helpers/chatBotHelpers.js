const { getHour } = require('../helpers/getTime');
const { haveNumber } = require('./validaciones');
const zonasDB = require('../DB/chat-bot-zonas.json');

const zonasValidas = [
  'indefinida',
  'axilas',
  'media pierna',
  'piernas completas',
  'piernas',
  'bikini',
  'bikni brasilero',
  'bikni completo',
  'bikni brasileño',
  'brazos completos',
  'medio brazo',
  'espalda',
  'estomago',
  'rostro',
  'rostro completo',
  'facial',
  'facial completo',
  'gluteos',
  'patilla',
  'patillas',
  'bigote',
];

const comprovarZonas = (zonas) => {
  // for (let i = 0; i < zonasValidas.length; i++) {
  //   if (!zonas.includes(zonasValidas[i])) {
  //     return 'noResponder';
  //   }
  // }

  try {
    zonas = zonas.replace(/^\s*|\s*$/g, '');
    zonas = zonas.toLowerCase();

    const zonasSplit = zonas.split(',');

    let zonasSendsClient = '';
    for (let i = 0; i < zonasSplit.length; i++) {
      const findZona = zonasDB[0][zonasSplit[i]];

      if (findZona == undefined) {
        zonasSendsClient = zonasSendsClient + zonasDB[0].indefinida;
      } else {
        zonasSendsClient = zonasSendsClient + findZona;
      }
    }

    if (zonasSendsClient == 'undefined') {
      return false;
    } else {
      return zonasSendsClient + '\n  0️⃣ *MENU PRINCIPAL*';
    }
  } catch (error) {
    return false;
  }
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
  comprovarZonas,
};
