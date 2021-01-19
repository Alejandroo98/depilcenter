const { io } = require('../index');

io.on('connection', (cliente) => {
  /* ===============DATOS IMPORTANTES================= */
  const { CotizarMujer } = require('../clases/cotizar_config');
  const corporal = [];
  const facial = [];
  let corporalBaseDatos = [];
  let facialBaseDatos = [];
  const sumaTotal = [];
  const cotizar = [];
  let datosDB = [];
  let guardarMayor = [];

  imprimirCotizarMujer = new CotizarMujer(
    corporal,
    facial,
    cotizar,
    guardarMayor,
    sumaTotal
  );
  /* ===============FIN DATOS IMPORTANTES================= */

  console.log('usuario nuevo conectado');
  cliente.on('traerDatosMujerCotizar', async (data, callback) => {
    // console.log(imprimirCotizarMujer.buscarDatos());
    let datos = await imprimirCotizarMujer.buscarDatos();
    datosDB.push(datos);
    // console.log(datos.facialDB);

    let corporalDB = datos.corporalDB;
    let facialDB = datos.facialDB;

    for (let i = 0; i < corporalDB.length; i++) {
      await corporalBaseDatos.push(
        `<div id="${corporalDB[i]._id}" class="griDiv" >${corporalDB[i].nombre} <span class="a${corporalDB[i]._id}">${corporalDB[i].precioIndividual}</span></div>`
      );
    }

    for (let i = 0; i < facialDB.length; i++) {
      await facialBaseDatos.push(
        `<div id="${facialDB[i]._id}" class="griDiv" >${facialDB[i].nombre} <span class="a${facialDB[i]._id}">${facialDB[i].precioIndividual}</span></div>`
      );
    }

    await callback(corporalBaseDatos, facialBaseDatos);
  });

  cliente.on('sumarValores', async (id, callback) => {
    let precioDB = await imprimirCotizarMujer.buscarPrecioId(id);
    console.log(precioDB.precioMayor[0], 'bieeeeeeeeeen');
    let filterCorporal = datosDB[0].corporalDB;

    if (precioDB.cantidad != 0) {
      cliente.emit('preciosCombosCorporal', {
        filterCorporal,
        val: true,
      });
    } else {
      cliente.emit('preciosCombosCorporal', {
        filterCorporal,
        val: false,
      });
    }

    callback(precioDB.totalPagar);
  });

  // cliente.on('preciosCombosCorporalUnico', (data, callback) => {
  //   /* Aqui lo que aremos es con filter es trare todos los datos que sena diferentes al id que me envian y solo a esos les bajare el precio */
  //   let filterCorporal = datosDB[0].corporalDB;
  //   let dbCorporal = filterCorporal.filter((x) => {
  //     return x._id != data;
  //   });

  //   callback(dbCorporal);
  // });

  cliente.on('disconnect', () => {
    eliminarDatos();
    imprimirCotizarMujer.reiniciarArray();
  });
});

let eliminarDatos = () => {
  facialBaseDatos = [];
  corporalBaseDatos = [];
  datosDB = [];
};
