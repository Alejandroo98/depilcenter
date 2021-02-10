const { io } = require('../index');

io.on('connection', (cliente) => {
  /* ===============DATOS IMPORTANTES COTIZAR MUJER================= */
  let corporalBaseDatos = [];
  let facialBaseDatos = [];
  const sumaTotalFacial = [];
  let datosDB = [];
  let datosHombreDB = [];
  let guardarMayor = [];
  let facialBaseDatosHombre = [];
  let corporalBaseDatosHombre = [];
  let guardarMayorHombre = [];
  let sumaTotalFacialHombre = [];
  /* EXPORTAR CLASE MUJER */
  const { CotizarMujer } = require('../clases/cotizar_config');
  imprimirCotizarMujer = new CotizarMujer(guardarMayor, sumaTotalFacial);
  /* ===============FIN DATOS IMPORTANTES COTIZAR MUJER================= */

  /* ===============DATOS IMPORTANTES COTIZAR HOMBRE================= */

  /* EXPORTAR CLASE HOMBRE*/
  const { CotizarHombre } = require('../clases/cotizar_hombre');
  imprimirCotizarHombre = new CotizarHombre(
    guardarMayorHombre,
    sumaTotalFacialHombre
  );

  /* ===============FIN DATOS IMPORTANTES COTIZAR HOMBRE================= */

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
      cliente.emit('imprimirTotalCotizacioMujer', precioDB.totalPagar);
    } else {
      callback(filterCorporal, false);
      cliente.emit('imprimirTotalCotizacioMujer', precioDB.totalPagar);
    }

    // callback(precioDB.totalPagar);
  });

  cliente.on('sumarValoresMujerFacial', async (id, callback) => {
    let precioDB = await imprimirCotizarMujer.buscarPrecioIdFacial(id);
    let filterFacial = datosDB[0].facialDB;

    if (precioDB.cantidad != 0) {
      let numeroMayor = precioDB.precioMayor[0];
      let filterFacialMayor = filterFacial.filter((x) => {
        return numeroMayor.id != x.id;
      });

      callback(filterFacialMayor, true, numeroMayor);
      cliente.emit('imprimirTotalCotizacioMujer', precioDB.totalPagar);
    } else {
      callback(filterFacial, false);
      cliente.emit('imprimirTotalCotizacioMujer', precioDB.totalPagar);
    }

    // callback(precioDB.totalPagar);
  });

  /* FUNCIONES PARA COTIZACION HOMBRE */

  cliente.on('datosCotizarHombre', async (data, callback) => {
    let datos = await imprimirCotizarHombre.buscarDatos();
    datosHombreDB.push(datos);

    // console.log(datos.facialDB);

    let corporalDB = datos.corporalDB;
    let facialDB = datos.facialDB;

    for (let i = 0; i < corporalDB.length; i++) {
      await corporalBaseDatosHombre.push(
        `<div id="${corporalDB[i]._id}" class="griDiv" >${corporalDB[i].nombre} <span class="a${corporalDB[i]._id}">${corporalDB[i].precioIndividual}</span></div>`
      );
    }

    for (let i = 0; i < facialDB.length; i++) {
      await facialBaseDatosHombre.push(
        `<div id="${facialDB[i]._id}" class="griDiv" >${facialDB[i].nombre} <span class="a${facialDB[i]._id}">${facialDB[i].precioIndividual}</span></div>`
      );
    }

    await callback(corporalBaseDatosHombre, facialBaseDatosHombre);
  });

  cliente.on('sumarValoresHombreCorporal', async (id, callback) => {
    let precioDB = await imprimirCotizarHombre.buscarPrecioId(id);
    let filterCorporal = datosHombreDB[0].corporalDB;

    if (precioDB.cantidad != 0) {
      let numeroMayor = precioDB.precioMayor[0];
      let filterCorporalMayor = filterCorporal.filter((x) => {
        return numeroMayor.id != x.id;
      });

      callback(filterCorporalMayor, true, numeroMayor);
      cliente.emit('imprimirTotalCotizacionHombre', precioDB.totalPagar);
    } else {
      callback(filterCorporal, false);
      cliente.emit('imprimirTotalCotizacionHombre', precioDB.totalPagar);
    }
  });

  cliente.on('sumarValoresHombreFacial', async (id, callback) => {
    let precioDB = await imprimirCotizarHombre.buscarPrecioIdFacial(id);
    let filterFacial = datosHombreDB[0].facialDB;

    if (precioDB.cantidad != 0) {
      let numeroMayor = precioDB.precioMayor[0];
      let filterFacialMayor = filterFacial.filter((x) => {
        return numeroMayor.id != x.id;
      });

      callback(filterFacialMayor, true, numeroMayor);
      cliente.emit('imprimirTotalCotizacionHombre', precioDB.totalPagar);
    } else {
      callback(filterFacial, false);
      cliente.emit('imprimirTotalCotizacionHombre', precioDB.totalPagar);
    }

    // callback(precioDB.totalPagar);
  });

  /* FIN FUNCIONES PARA COTIZACION HOMBRE */

  cliente.on('disconnect', () => {
    eliminarDatos();
    imprimirCotizarMujer.reiniciarArray();
    imprimirCotizarHombre.reiniciarArray();
  });
});

let eliminarDatos = () => {
  /* ====MUJER===== */
  facialBaseDatos = [];
  corporalBaseDatos = [];
  datosDB = [];
  /* ====HOMBRE===== */
  facialBaseDatosHombre = [];
  corporalBaseDatosHombre = [];
  datosHombreDB = [];
};
