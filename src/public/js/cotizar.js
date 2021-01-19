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

// let cantidad = [];
// class indivicualCombo {

//   constructor( can ){

//     this.cantidad = can;

//   }

//   comboIndividual = ( id ) => {

//     this.cantidad.push( id )
//     return this.cantidad
//   }

// }

document
  .querySelector('.cajaCotizarCorporal')
  .addEventListener('click', (e) => {
    // let newIndComb = new comboIndividual( cantidad )

    if (e.target.id != '') {
      socket.on('preciosCombosCorporal', (dataDBB) => {
        let dataDB = dataDBB.filterCorporal;
        if (dataDBB.val === true) {
          for (let i = 0; i < dataDB.length; i++) {
            document.querySelector(`.a${dataDB[i]._id}`).innerHTML =
              dataDB[i].precioCombo;
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

// document
//   .querySelector('.cajaCotizarCorporal')
//   .addEventListener('click', (e) => {
//     if (e.target.id != '') {
//       socket.emit('preciosCombosCorporalUnico', e.target.id, function (dataDB) {
//         for (let i = 0; i < dataDB.length; i++) {
//           document.querySelector(`.a${dataDB[i]._id}`).innerHTML =
//             dataDB[i].precioCombo;
//         }
//       });
//     }
//   });

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
    socket.emit('sumarValores', corporal.id, function (corporal) {
      document.querySelector(
        '.totalCotizarCorporalFacial'
      ).innerHTML = `Total : ${corporal}`;
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
