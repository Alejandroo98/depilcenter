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

/* ==================IMPRIMIR PRECIO FINAL DE LA COTIZACION======================== */
socket.on('imprimirTotalCotizacioMujer', (valorTotal) => {
  document.querySelector(
    '.totalCotizarCorporalFacial'
  ).innerHTML = `Total : ${valorTotal}`;
});

/* ==================FIN IMPRIMIR PRECIO FINAL DE LA COTIZACION======================== */

/* ==================FIN PRECIOS COMBO======================== */

let etiquetaPintar = document.querySelector('.cotizar');
var URLactual = window.location;
let URLpintar = URLactual.pathname;
if (URLpintar === '/cotizar-combos') {
  etiquetaPintar.classList.add('pintarNav');
}

// ================COTIZAR PRECIO=================
let cajaMainCotizarMujer = document.querySelector('.cajaMainCotizarMujer');
let cajaCotizarCorporal = document.querySelector('.cajaCotizarCorporal');
let cajaCotizarFacial = document.querySelector('.cajaCotizarFacial');
let preciosPagar = [0];
let sumador = 0;

class Cotizar {
  constructor(idCaja) {
    this.totalPAgar = 0;
    this.idCaja = idCaja;
    this.pintarDespintar(idCaja);
  }

  totalCotizarMujerCorporal = () => {
    socket.emit(
      'sumarValoresMujerCorporal',
      this.idCaja,
      function (dataCorporal, bool, numeroMayor) {
        if (bool === true) {
          document.querySelector(`.a${numeroMayor.id}`).innerHTML =
            numeroMayor.precioIndividual;

          for (let i = 0; i < dataCorporal.length; i++) {
            document.querySelector(`.a${dataCorporal[i]._id}`).innerHTML =
              dataCorporal[i].precioCombo;
          }
        } else if (bool === false) {
          for (let i = 0; i < dataCorporal.length; i++) {
            document.querySelector(`.a${dataCorporal[i]._id}`).innerHTML =
              dataCorporal[i].precioIndividual;
          }
        }
      }
    );
  };

  totalCotizarMujerFacial = () => {
    socket.emit(
      'sumarValoresMujerFacial',
      this.idCaja,
      function (dataFacial, bool, numeroMayor) {
        if (bool === true) {
          document.querySelector(`.a${numeroMayor.id}`).innerHTML =
            numeroMayor.precioIndividual;

          for (let i = 0; i < dataFacial.length; i++) {
            document.querySelector(`.a${dataFacial[i]._id}`).innerHTML =
              dataFacial[i].precioCombo;
          }
        } else if (bool === false) {
          for (let i = 0; i < dataFacial.length; i++) {
            document.querySelector(`.a${dataFacial[i]._id}`).innerHTML =
              dataFacial[i].precioIndividual;
          }
        }
      }
    );
  };

  pintarDespintar = (id) => {
    let cajaDespintar = document.getElementById(id);
    cajaDespintar.classList.toggle('cajaSelecionada');
  };
}

cajaCotizarFacial.addEventListener('click', (e) => {
  if (e.target.id != '') {
    let pintarCotizar = new Cotizar(e.target.id);
    pintarCotizar.totalCotizarMujerFacial();
  }
});

cajaCotizarCorporal.addEventListener('click', (e) => {
  if (e.target.id != '') {
    let pintarCotizar = new Cotizar(e.target.id);
    pintarCotizar.totalCotizarMujerCorporal();
  }
});
