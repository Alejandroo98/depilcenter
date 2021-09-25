const jwt = require('jsonwebtoken');
const selectHora = require('../DB/formData.json');
const servicios = require('../DB/servicios.json');

const changeValuesServicios = (idServicio, idHora) => {
  const { horaSelect } = selectHora[0];

  const { name: nameServicio, indicaciones } = servicios.find((servicio) => {
    return servicio.id == idServicio;
  });

  const { name: nameHora } = horaSelect.find((hora) => {
    return hora.id == idHora;
  });

  return { nameServicio, nameHora, indicaciones };
};

const generarJWT = (reservaData) => {
  const { nameServicio, nameHora, indicaciones } = changeValuesServicios(
    reservaData.servicio,
    reservaData.hora
  );

  return new Promise((resolve, reject) => {
    reservaData.servicio = nameServicio;
    reservaData.hora = nameHora;
    reservaData.indicaciones = indicaciones;

    const payload = { reservaData };

    jwt.sign(
      payload,
      'TOKE_SECRET_KEY',
      {
        expiresIn: '5h',
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
