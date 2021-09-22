const DatosUsuario = require('../models/datosReserva');
const DatosReserva = require('../models/reserva');

const guardarDB = {};

guardarDB.guardarDatosUsuario = async ({ numeroTelefono, ...rest }) => {
  const user = await DatosUsuario.findOne({ numeroTelefono });
  try {
    if (!user) {
      const nuevoRegistro = new DatosUsuario({ numeroTelefono, ...rest });
      await nuevoRegistro.save();
    }
    return true;
  } catch (error) {
    return false;
  }
};

guardarDB.guardarDatosReserva = async ({ numeroTelefono, ...rest }) => {
  try {
    const { _id: idUser } = await DatosUsuario({ numeroTelefono });
    const reserva = new DatosReserva({ ...rest, idUser });
    reserva.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = guardarDB;
