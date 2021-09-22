const { getHour, getDate } = require('./getTime');
const { imgRandom } = require('./imgRandom');

const desestrucutrarReserva = ({
  infoReserva,
  locales,
  servicio,
  hora,
  fecha,
  nombres,
  numeroTelefono,
  fechaCumpleanios,
  suscrito,
}) => {
  const fechaRegistro = `${getDate()} | ${getHour()}`;
  const img = imgRandom();
  const reservaData = { nombres };

  return {
    datosReserva: { nombres, numeroTelefono, fechaCumpleanios, suscrito, fechaRegistro, img },
    reserva: {
      numeroTelefono,
      locales,
      servicio,
      hora,
      fecha,
      fechaRegistro,
      infoReserva,
      reservaData,
    },
  };
};

module.exports = { desestrucutrarReserva };
