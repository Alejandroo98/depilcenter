/* ===========SOCKET============ */
let socket = io();

socket.on('connect', () => {
  socket.emit('traerDatosMujerCotizar', false, function (corporal, facial) {
    for (let i = 0; i < corporal.length; i++) {
      document.querySelector('.cajaCotizarCorporal').innerHTML += corporal[i];
    }

    for (let i = 0; i < facial.length; i++) {
      document.querySelector('.cajaCotizarFacial').innerHTML +=  facial[i];
    }
  });
});

/* ==========FIN SOCKET============ */

/* ==================IMPRIMIR PRECIO FINAL DE LA COTIZACION MUJER======================== */
socket.on('imprimirTotalCotizacioMujer', (valorTotal) => {
  document.querySelector(
    '.imprimirValorTotalCotizarCorporalFacial'
  ).innerHTML = `Total : $ ${valorTotal} `;
});

socket.on('imprimirTotalCotizacionHombre', (valorTotal) => {
  document.querySelector(
    '.imprimirValorTotalCotizarCorporalFacialHombre'
  ).innerHTML = `Total : $ ${valorTotal}`;
});

/* ==================FIN IMPRIMIR PRECIO FINAL DE LA COTIZACION======================== */

/* =======================PINTAR NAV Y CAMBIAR DE FOTOGRAFIAS========================== */
let etiquetaPintarCotizar = document.querySelector('.navbar');
let URLactualCotizar = window.location;
let URLpintarCotizar = URLactualCotizar.pathname;
let imgCotizarContainer = document.querySelector(".imgCotizarContainer");
if(URLpintarCotizar === '/cotizar-combos/mujer'){
  imgCotizarContainer.innerHTML = `<img src="../img/cotizar_combos/mujer_modelo_cotizar.png" alt="Modelo cotizar mujer - Depilcenter - Centro de depilacion"></img>`
}else if(URLpintarCotizar === '/cotizar-combos/hombre' ){
  imgCotizarContainer.innerHTML = `<img src="../img/cotizar_combos/hombre_modelo_cotizar.png" alt="Modelo cotizar hombre- Depilcenter - Centro de depilacion"></img>`
}
  etiquetaPintarCotizar.setAttribute("style" , "transition : none ; background : var(--rojo)")
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
    this.pintarDespintarCorporal(id);
    socket.emit(
      'sumarValoresMujerCorporal',
      this.idCaja,
      function (dataCorporal, bool, numeroMayor) {
        if (bool === true) {
          document.querySelector(`.a${numeroMayor.id}`).innerHTML =
            `$ ${numeroMayor.precioIndividual}`;

          for (let i = 0; i < dataCorporal.length; i++) {
            document.querySelector(`.a${dataCorporal[i]._id}`).innerHTML =
              `$ ${dataCorporal[i].precioCombo}`;
          }
        } else if (bool === false) {
          for (let i = 0; i < dataCorporal.length; i++) {
            document.querySelector(`.a${dataCorporal[i]._id}`).innerHTML =
              `$ ${dataCorporal[i].precioIndividual}`;
          }
        }
      }
    );
  };

  totalCotizarMujerFacial = (id) => {
    this.pintarDespintarFacial(id);
    socket.emit(
      'sumarValoresMujerFacial',
      this.idCaja,
      function (dataFacial, bool, numeroMayor) {
        if (bool === true) {
          document.querySelector(`.a${numeroMayor.id}`).innerHTML = '$' +
            numeroMayor.precioIndividual;

          for (let i = 0; i < dataFacial.length; i++) {
            document.querySelector(`.a${dataFacial[i]._id}`).innerHTML = '$' +
              dataFacial[i].precioCombo;
          }
        } else if (bool === false) {
          for (let i = 0; i < dataFacial.length; i++) {
            document.querySelector(`.a${dataFacial[i]._id}`).innerHTML = '$' +
              dataFacial[i].precioIndividual;
          }
        }
      }
    );
  };

  cajaSelecionadaFacialHombre = ( id ) => {
    let cajaDespintar = document.getElementById(id);
    cajaDespintar.classList.toggle('cajaSelecionadaFacialHombre');
  }

  pintarDespintarCorporal = (id) => {
    let cajaDespintar = document.getElementById(id);
    cajaDespintar.classList.toggle('cajaSelecionadaCorporal');
  };

  pintarDespintarFacial = ( id ) => {
    let cajaDespintar = document.getElementById(id);
    cajaDespintar.classList.toggle('cajaSelecionadaFacial');
  }

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
    this.pintarDespintarCorporal(id);
    socket.emit(
      'sumarValoresHombreCorporal',
      id,
      function (dataCorporal, bool, numeroMayor) {
        if (bool === true) {
          document.querySelector(`.a${numeroMayor.id}`).innerHTML = '$' +
            numeroMayor.precioIndividual;

          for (let i = 0; i < dataCorporal.length; i++) {
            document.querySelector(`.a${dataCorporal[i]._id}`).innerHTML = '$' +
              dataCorporal[i].precioCombo;
          }
        } else if (bool === false) {
          for (let i = 0; i < dataCorporal.length; i++) {
            document.querySelector(`.a${dataCorporal[i]._id}`).innerHTML = '$' +
              dataCorporal[i].precioIndividual;
          }
        }
      }
    );
  };

  totalCotizarHombreFacial = (id) => {
    this.pintarDespintarFacial(id);
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

  /* CARGAR DATOS DE LOS COMBOS */
  cargarDatosCombosDB = () => {
    let combosDOM = document.querySelector('.cajaMainCombos');
    socket.emit('cargarDatosCombosDB', null, function (datos) {
      for (let i = 0; i < datos.length; i++) {
        combosDOM.innerHTML += datos[i];
      }
    });
  };

  /* FIN CARGAR DATOS DE LOS COMBOS */
}

/* ====================EVENTOS DE COTIZACION============================== */
/* COMBOS */
let cargarDatosCombos = () => {
  let cargarDatosCombos = new Cotizar();
  cargarDatosCombos.cargarDatosCombosDB();
};

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
    pintarCotizar.cajaSelecionadaFacialHombre(e.target.id);
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


/* =======================MOSTRAR EL CUADRO DE REGISTRO DE DATOS PARA GENDAR CITA DESDE COTIZAR =========*/
let cajaMainCombos = document.querySelector(".cajaMainCombos")
let __datosReservaContendor = document.querySelector(".__datosReservaContendor");
let divReservaGridCentrar = document.querySelector(".divReservaGridCentrar");
let borraOpciones = document.querySelector(".borraOpciones");

class AgendarCita{
  constructor(){
  }

  mostrarCajaDatos = () => {

    __datosReservaContendor.classList.remove("ocultarCajaDatosReservaFondo")
    divReservaGridCentrar.classList.remove("ocultarCajaDatosReserva")
    __datosReservaContendor.style.display = "flex"
  }

  ocultarCajaDatos = () => {

    __datosReservaContendor.classList.add("ocultarCajaDatosReservaFondo")
    divReservaGridCentrar.classList.add("ocultarCajaDatosReserva")
    setTimeout(() => {
      __datosReservaContendor.style.display = "none"
    },800)

  }
  
}

cajaMainCombos.addEventListener("click" , x => {
  if( x.target.id  != ''){
    let newAgendarCita = new AgendarCita()
    newAgendarCita.mostrarCajaDatos()
  }
})

__datosReservaContendor.addEventListener("click" , x => {
    if(x.target.id === 'cerrarContainerDatos'){
      let newAgendarCita = new AgendarCita()
      newAgendarCita.ocultarCajaDatos()
    }
})

borraOpciones.addEventListener("click" , x => {
  if(x.target.id === "mostrarDatosRegistroCotizarMujer"  || x.target.id === "mostrarDatosRegistroCotizarHombre" ){
    let newAgendarCita = new AgendarCita()
    newAgendarCita.mostrarCajaDatos()
  }
})
/* =======================*FIN MOSTRAR EL CUADRO DE REGISTRO DE DATOS PARA GENDAR CITA DESDE COTIZAR =======*/





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
    cargarDatosCombos();
}
/* =============FIN ABIRI COTIZACION HOMBRE O MUJER =============*/
