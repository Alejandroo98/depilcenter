const { datosCumpleanieros } = require('../clases/cumpleanieros');
const { io } = require('../index');

io.on('connection', (cliente) => {
  /* ======================= CUMPLEANIEROS ======================= */
  datosCumpleanieros().then((x) => {
    let timeToday = new Date();
    let cumpleMes = x.filter((persona) => {
      let monthToday = timeToday.getMonth() + 1;
      return persona.fechaCumpleanios.split('-')[1] == monthToday;
    });
    cliente.emit('imprimirCumpleañeros', cumpleMes);
  });

  cliente.on('disconnect', () => {});
});
