const { io } = require('../index');
const { CotizarMujer } = require('../clases/cotizar_config');
const corporal = [];
const facial = [];
const sumaTotal = [];
let imprimirCotizarMujer = new CotizarMujer(corporal, facial, sumaTotal);

io.on('connection', (cliente) => {
  console.log('usuario nuevo conectado');

  cliente.on('traerDatosMujerCotizar', async (data, callback) => {
    // console.log(imprimirCotizarMujer.buscarDatos());
    let datos = imprimirCotizarMujer.buscarDatos();
    console.log(datos);
    await callback(datos.corporalDB, datos.facialDB);
  });

  cliente.on('sumarValores', async (id, callback) => {
    let precioDB = await imprimirCotizarMujer.buscarPrecioId(id);
    callback(precioDB);
  });

  cliente.on('disconnect', () => {
    imprimirCotizarMujer.reiniciarArray();
  });
});
