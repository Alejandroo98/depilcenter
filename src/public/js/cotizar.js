/* ===========SOCKET============ */
let socket = io();

socket.on('connect', () => {
  socket.emit('traerDatosMujerCotizar', false, function (corporal, facial) {
    for (let i = 0; i < corporal.length; i++) {
      document.querySelector('.cajaCotizarCorporal').innerHTML += corporal[i];
    }

    for (let i = 0; i < facial.length; i++) {
      document.querySelector('.cajaCotizarFacial').innerHTML += facial[i];
    }
  });
});

/* ==========FIN SOCKET============ */

/* ==================PRECIOS COMBO======================== */

document
  .querySelector('.cajaCotizarCorporal')
  .addEventListener('click', (e) => {
    if (e.target.id != '') {
      socket.on('preciosCombosCorporal', (dataDBB) => {
        let dataDB = dataDBB.filterCorporal;
        let dataBDCombo = dataDBB.filterCorporalMayor;
        if (dataDBB.val === true) {
          let numeroNoPRomo = dataDBB.numeroMayor;
          document.querySelector(`.a${numeroNoPRomo.id}`).innerHTML =
            numeroNoPRomo.precioIndividual;

          for (let i = 0; i < dataBDCombo.length; i++) {
            document.querySelector(`.a${dataBDCombo[i]._id}`).innerHTML =
              dataBDCombo[i].precioCombo;
          }
        } else if (dataDBB.val === false) {
          for (let i = 0; i < dataDB.length; i++) {
            document.querySelector(`.a${dataDB[i]._id}`).innerHTML =
              dataDB[i].precioIndividual;
          }
        }
      });
    }
  });

/* ==================FIN PRECIOS COMBO======================== */

let etiquetaPintar = document.querySelector('.cotizar');
var URLactual = window.location;
let URLpintar = URLactual.pathname;
if (URLpintar === '/cotizar-combos') {
  etiquetaPintar.classList.add('pintarNav');
}

// ================COTIZAR PRECIO=================
let cajaMainCotizarMujer = document.querySelector('.cajaMainCotizarMujer');
let preciosPagar = [0];
let sumador = 0;

class Cotizar {
  constructor() {
    this.totalPAgar = 0;
  }

  pintarDespintar = (corporal) => {
    this.toggle(corporal.id);
    socket.emit('sumarValores', corporal.id, function (precioCorporal) {
      document.querySelector(
        '.totalCotizarCorporalFacial'
      ).innerHTML = `Total : ${precioCorporal}`;
    });
  };

  toggle = (id) => {
    let cajaDespintar = document.getElementById(id);
    cajaDespintar.classList.toggle('cajaSelecionada');
  };
}

cajaMainCotizarMujer.addEventListener('click', (e) => {
  if (e.target.id != '') {
    let pintarCotizar = new Cotizar();
    pintarCotizar.pintarDespintar({
      id: e.target.id,
    });
  }
});
