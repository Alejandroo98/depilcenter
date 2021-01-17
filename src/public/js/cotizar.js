/* ===========SOCKET============ */
let socket = io();

socket.on('connect', () => {
  socket.emit(
    'traerDatosMujerCotizar',
    false,
    function async(corporalDB, facialDB) {
      for (let i = 0; i < corporalDB.length; i++) {
        document.querySelector('.cajaCotizarCorporal').innerHTML +=
          corporalDB[i];
      }

      for (let i = 0; i < facialDB.length; i++) {
        document.querySelector('.cajaCotizarFacial').innerHTML += facialDB[i];
      }
    }
  );
});

/* ==========FIN SOCKET============ */

/* ==================PRECIOS COMBO======================== */
document.querySelector('.cajaCotizarCorporal').addEventListener('click', () => {
  socket.emit('traerDatosMujerCotizar', true);
});

/* ==================FIN PRECIOS COMBO======================== */

let etiquetaPintar = document.querySelector('.cotizar');
var URLactual = window.location;
let URLpintar = URLactual.pathname;
if (URLpintar === '/cotizar-combos') {
  etiquetaPintar.classList.add('pintarNav');
}

// ================COTIZAR=================
let cajaMainCotizarMujer = document.querySelector('.cajaMainCotizarMujer');
let preciosPagar = [0];
let sumador = 0;
let cajasPintadas = [];

class Cotizar {
  constructor(coleccion) {
    this.cejasPintadas = coleccion;
    this.totalPAgar = 0;
  }

  pintarDespintar = (data) => {
    this.toggle(data.id);
    socket.emit('sumarValores', data.id, function (data) {
      document.querySelector(
        '.totalCotizarCorporalFacial'
      ).innerHTML = `Total : ${data}`;
      console.log(data);
    });
  };

  toggle = (id) => {
    let cajaDespintar = document.getElementById(id);
    cajaDespintar.classList.toggle('cajaSelecionada');
  };
}

cajaMainCotizarMujer.addEventListener('click', (e) => {
  if (e.target.id != '') {
    let pintarCotizar = new Cotizar(cajasPintadas);
    pintarCotizar.pintarDespintar({
      id: e.target.id,
      precio: e.target.dataset.precio,
    });
  }
});
