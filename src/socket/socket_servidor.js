const { io } = require('../index');

io.on('connection', (cliente) => {
  /* ===============DATOS IMPORTANTES================= */
  const { CotizarMujer } = require('../clases/cotizar_config');
  let corporalBaseDatos = [];
  let facialBaseDatos = [];
  const sumaTotal = [];
  const cotizar = [];
  let datosDB = [];
  let guardarMayor = [];

  imprimirCotizarMujer = new CotizarMujer(cotizar, guardarMayor, sumaTotal);
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

  cliente.on('sumarValoresMujerCorporal', async (id, callback) => {
    let precioDB = await imprimirCotizarMujer.buscarPrecioId(id);
    let filterCorporal = datosDB[0].corporalDB;

    if (precioDB.cantidad != 0) {
      let numeroMayor = precioDB.precioMayor[0];
      let filterCorporalMayor = filterCorporal.filter((x) => {
        return numeroMayor.id != x.id;
      });

      callback(filterCorporalMayor, true, numeroMayor);
    } else {
      callback(filterCorporal, false);
    }

    // callback(precioDB.totalPagar);
  });

  cliente.on('sumarValoresMujerFacial', async (id, callback) => {
    let precioDB = await imprimirCotizarMujer.buscarPrecioIdFacial(id);
    let filterFacial = datosDB[0].facialDB;

    if (precioDB.cantidad != 0) {
      let numeroMayor = precioDB.precioMayor[0];
      let filterCorporalMayor = filterCorporal.filter((x) => {
        return numeroMayor.id != x.id;
      });

      callback(filterCorporalMayor, true, numeroMayor);
    } else {
      callback(filterCorporal, false);
    }

    // callback(precioDB.totalPagar);
  });

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
