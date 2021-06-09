const reserva = require('../models/reserva');
const DatosReserva = require('../models/reserva');
const DatosUsuario = require('../models/reserva');

const guardarDB = {};

guardarDB.guardarDatosUsuario = async ({ nombres, celular, fechaRegistro, fechaCumpleanios, suscrito }) => {
  const usuario = new DatosUsuario({
    nombres,
    celular,
    fechaRegistro,
    fechaCumpleanios,
    suscrito,
  });

  usuario.save((err, user) => {
    if (err) {
      return { ok: false };
    }

    return { ok: true, user };
  });
};

guardarDB.guardarDatosReserva = async ({ celular, lugar, servicio, hora, fecha }) => {
  const { _id: idUser } = await DatosReserva.findOne({ celular });

  const reserva = new Reserva({
    idUser,
    lugar,
    servicio,
    hora,
    fecha,
    fechaCumpleanios,
  });

  reserva.save((err, user) => {
    if (err) {
      return { ok: false };
    }

    return { ok: true, user };
  });
};

module.exports = guardarDB;
