const { getHour, getDate } = require('./getTime');
const { imgRandom } = require('./imgRandom');

const desestrucutrarReserva = ({
  nombres,
  numeroTelefono,
  fechaCumpleanios,
  suscrito,
  ...rest
}) => {
  if (fechaCumpleanios == '') fechaCumpleanios = '00-00-0000';

  const fechaRegistro = `${getDate()} | ${getHour()}`;
  const img = imgRandom();
  const reservaData = { nombres };

  return {
    datosReserva: { nombres, numeroTelefono, fechaCumpleanios, suscrito, fechaRegistro, img },
    reserva: {
      numeroTelefono,
      reservaData,
      fechaRegistro,
      ...rest,
    },
  };
};

module.exports = { desestrucutrarReserva };
