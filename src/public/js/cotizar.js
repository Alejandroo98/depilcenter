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

/* ==================IMPRIMIR PRECIO FINAL DE LA COTIZACION======================== */
socket.on('imprimirTotalCotizacioMujer', (valorTotal) => {
  document.querySelector(
    '.totalCotizarCorporalFacial'
  ).innerHTML = `Total : ${valorTotal}`;
});

/* ==================FIN IMPRIMIR PRECIO FINAL DE LA COTIZACION======================== */

let etiquetaPintar = document.querySelector('.cotizar');
var URLactual = window.location;
let URLpintar = URLactual.pathname;
if (URLpintar === '/cotizar-combos') {
  etiquetaPintar.classList.add('pintarNav');
} else if (URLpintar === '/cotizar-combos/hombre') {
  console.log('dentro');
  document.getElementById('profile-tab').click();
}

// ================COTIZAR PRECIO=================
let cajaMainCotizarMujer = document.querySelector('.cajaMainCotizarMujer');
let clickCotizarHombre = document.querySelector('#profile-tab');
let cajaCotizarCorporal = document.querySelector('.cajaCotizarCorporal');
let cajaCotizarFacial = document.querySelector('.cajaCotizarFacial');
// let preciosPagar = [0];
// let sumador = 0;

class Cotizar {
  constructor(idCaja) {
    this.totalPAgar = 0;
    this.idCaja = idCaja;
  }

  totalCotizarMujerCorporal = (id) => {
    this.pintarDespintar(id);
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

  totalCotizarMujerFacial = (id) => {
    this.pintarDespintar(id);
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

  /* FUNCIONES PARA COTIZACION DEL HOMBRE */

  cargarMostrarDatosCotizarHombre = () => {
    socket.emit('datosCotizarHombre', null, function (corporal, facial) {
      for (let i = 0; i < corporal.length; i++) {
        document.querySelector('.cajaCotizarCorporalHombre').innerHTML +=
          corporal[i];
      }

      for (let i = 0; i < facial.length; i++) {
        document.querySelector('.cajaCotizarFacialHombre').innerHTML +=
          facial[i];
      }
    });
  };
}

/* ====================EVENTOS DE COTIZACION============================== */
clickCotizarHombre.addEventListener('click', (x) => {
  let pintarCotizarHombre = new Cotizar();
  pintarCotizarHombre.cargarMostrarDatosCotizarHombre();
});

cajaCotizarFacial.addEventListener('click', (e) => {
  if (e.target.id != '') {
    let pintarCotizar = new Cotizar(e.target.id); //El e.target.id de aqui no lo utilizamos pero por si necesitas el id de la etiqueta de etiqueta precionada la tendra de forma global
    pintarCotizar.totalCotizarMujerFacial(e.target.id);
  }
});

cajaCotizarCorporal.addEventListener('click', (e) => {
  if (e.target.id != '') {
    let pintarCotizar = new Cotizar(e.target.id);
    pintarCotizar.totalCotizarMujerCorporal(e.target.id);
  }
});
/* ====================FIN EVENTOS DE COTIZACION============================== */
