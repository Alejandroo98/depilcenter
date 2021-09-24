const jwt = require('jsonwebtoken');
const servicios = require('../DB/formData.json');

const changeValuesServicios = (idServicio, idHora) => {
  const { serviciosSelect, horaSelect } = servicios[0];
  const { name: nameServicio } = serviciosSelect.find((servicio) => {
    return servicio.id == idServicio;
  });

  const { name: nameHora } = horaSelect.find((hora) => {
    return hora.id == idHora;
  });

  return { nameServicio, nameHora };
};

const generarJWT = (reservaData) => {
  const { nameServicio, nameHora } = changeValuesServicios(reservaData.servicio, reservaData.hora);

  return new Promise((resolve, reject) => {
    reservaData.servicio = nameServicio;
    reservaData.hora = nameHora;

    const payload = { reservaData };

    jwt.sign(
      payload,
      'TOKE_SECRET_KEY',
      {
        expiresIn: '5m',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se puedo generar el token');
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generarJWT,
};
