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

/* ==================IMPRIMIR PRECIO FINAL DE LA COTIZACION MUJER======================== */
socket.on('imprimirTotalCotizacioMujer', (valorTotal) => {
  document.querySelector(
    '.totalCotizarCorporalFacial'
  ).innerHTML = `Total : ${valorTotal}`;
});

socket.on('imprimirTotalCotizacionHombre', (valorTotal) => {
  document.querySelector(
    '.totalCotizarCorporalFacialHombre'
  ).innerHTML = `Total : ${valorTotal}`;
});

/* ==================FIN IMPRIMIR PRECIO FINAL DE LA COTIZACION======================== */

/* =======================PINTAR NAV========================== */
let etiquetaPintar = document.querySelector('.cotizar');
var URLactual = window.location;
let URLpintar = URLactual.pathname;
etiquetaPintar.classList.add('pintarNav');

/* =======================FIN PINTAR NAV========================== */

// ================COTIZAR PRECIO=================
let cajaMainCotizarMujer = document.querySelector('.cajaMainCotizarMujer');
let clickCotizarHombre = document.querySelector('#profile-tab');
let cajaCotizarCorporal = document.querySelector('.cajaCotizarCorporal');
let cajaCotizarFacial = document.querySelector('.cajaCotizarFacial');
let cajaCotizarCorporalHombre = document.querySelector(
  '.cajaCotizarCorporalHombre'
);
let cajaCotizarFacialHombre = document.querySelector(
  '.cajaCotizarFacialHombre'
);

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

  totalCotizarHombreCorporal = (id) => {
    this.pintarDespintar(id);
    socket.emit(
      'sumarValoresHombreCorporal',
      id,
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

  totalCotizarHombreFacial = (id) => {
    this.pintarDespintar(id);
    socket.emit(
      'sumarValoresHombreFacial',
      id,
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

  /*FIN FUNCIONES PARA COTIZACION DEL HOMBRE */
}

/* ====================EVENTOS DE COTIZACION============================== */
/* HOMBRE */
let cargarDatosCotizarHombre = () => {
  let pintarCotizarHombre = new Cotizar();
  pintarCotizarHombre.cargarMostrarDatosCotizarHombre();
};

cajaCotizarCorporalHombre.addEventListener('click', (e) => {
  if (e.target.id != '') {
    let pintarCotizar = new Cotizar(e.target.id);
    pintarCotizar.totalCotizarHombreCorporal(e.target.id);
  }
});

cajaCotizarFacialHombre.addEventListener('click', (e) => {
  if (e.target.id != '') {
    let pintarCotizar = new Cotizar(e.target.id);
    pintarCotizar.totalCotizarHombreFacial(e.target.id);
  }
});

/* MUJER */
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

/* =============ABIRI COTIZACION HOMBRE O MUJER ==================*/
let idCotizar;
let url = location.pathname;
switch (url) {
  case '/cotizar-combos/mujer':
    document.getElementById('home-tab').classList.toggle('active');
    document.getElementById('cotizarMujer').style.display = 'block';
    document.getElementById('cotizarHombre').style.display = 'none';
    document.getElementById('combosCotizar').style.display = 'none';
    break;
  case '/cotizar-combos/hombre':
    document.getElementById('profile-tab').classList.toggle('active');
    document.getElementById('cotizarHombre').style.display = 'block';
    document.getElementById('cotizarMujer').style.display = 'none';
    document.getElementById('combosCotizar').style.display = 'none';
    cargarDatosCotizarHombre();
    break;
  case '/cotizar-combos/combos':
    document.getElementById('contact-tab').classList.toggle('active');
    document.getElementById('combosCotizar').style.display = 'block';
    document.getElementById('cotizarMujer').style.display = 'none';
    document.getElementById('cotizarHombre').style.display = 'none';
}
/* =============FIN ABIRI COTIZACION HOMBRE O MUJER =============*/
