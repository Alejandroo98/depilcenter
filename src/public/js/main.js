let URLactual = window.location;
let URLpintar = URLactual.pathname;
let etiquetaPintar = document.querySelector('.inicio');
let next = document.querySelector('.next');
let back = document.querySelector('.back');
let nombres = document.getElementById('nombres');
let email = document.getElementById('email');
let numeroCelular = document.getElementById('numeroCelular');
let fecha = document.getElementById('fecha');
let hora = document.getElementById('hora');
let __contenedorMetodoDepilacion = document.getElementById('__contenedorMetodoDepilacion');

if (URLpintar === '/') {
  etiquetaPintar.classList.add('pintarNav');
}

class Reserva {
  constructor() {
    this.cajaDatos = document.querySelector('.cajaMainDatos');
    this.deslizarDatos = document.querySelector('.cajaSegundaReservar');
    this.datosReservaBox = document.querySelector('.datosReservaBox');
  }

  deslizarDatosReserva = () => {
    this.deslizarDatos.classList.remove('backCajaMain');
    this.deslizarDatos.classList.toggle('cajaMainReservarDeslizar');
    // this.datosReservaBox.classList.toggle('cajaMainReservarDeslizarDatos');
  };

  backDeslizarRserva = () => {
    this.datosReservaBox.classList.toggle('backCajaDos');
    this.deslizarDatos.classList.toggle('backCajaMain');
    this.deslizarDatos.classList.toggle('cajaMainReservarDeslizar');
  };
}

class ValidarDatos {
  constructor(datos) {
    this.registrarReserva = document.getElementById('registrarReserva');
    this.errNombres = document.querySelector('.errNombres');
    this.errEmail = document.querySelector('.errEmail');
    this.errNumero = document.querySelector('.errNumero');
    this.errFecha = document.querySelector('.errFecha');
    this.nombres = datos.nombres;
    this.email = datos.email;
    this.telefono = datos.telefono;
    this.fecha = datos.fecha;
  }

  validarDatos = () => {
    let nombreOk = this.validarNombres();
    let emailOk = this.validarEmail();
    let numeroOk = this.validarNumero();
    let fechaOk = this.validarFecha();

    if (nombreOk.err === false && emailOk.err === false && numeroOk.err === false && fechaOk.err == false) {
      this.enviarForm();
    } else {
      if (nombreOk.err === true) {
        this.errNombres.innerHTML = `<span class="material-icons errIcon">error_outline</span>${nombreOk.msg}`;
      } else {
        this.errNombres.innerHTML = ``;
      }
      if (emailOk.err === true) {
        this.errEmail.innerHTML = `<span class="material-icons errIcon">error_outline</span>${emailOk.msg}`;
      } else {
        this.errEmail.innerHTML = ``;
      }
      if (numeroOk.err === true) {
        this.errNumero.innerHTML = `<span class="material-icons errIcon">error_outline</span>${numeroOk.msg}`;
      } else {
        this.errNumero.innerHTML = ``;
      }
      if (fechaOk.err === true) {
        this.errFecha.innerHTML = `<span class="material-icons errIcon">error_outline</span>${fechaOk.msg}`;
      } else {
        this.errFecha.innerHTML = ``;
      }
    }
  };

  tiene_numeros(texto) {
    let numeros = '0123456789';
    for (let i = 0; i < texto.length; i++) {
      if (numeros.indexOf(texto.charAt(i), 0) != -1) {
        return 1;
      }
    }
    return 0;
  }

  validarNombres = () => {
    /* 1 - Si tiene numeros */ /* 0 - No tiene numeros */
    let tieneNumeros = this.tiene_numeros(this.nombres);
    let nombresOk = /^\w+\s\w+\s?$/.test(this.nombres);

    if (this.nombres == '') {
      return {
        err: true,
        msg: 'Campo obligatorio',
      };
    } else if (tieneNumeros === 1 || !nombresOk) {
      return {
        err: true,
        msg: 'Ingresa un nombre valido',
      };
    }
    return {
      err: false,
    };
  };

  validarEmail = () => {
    let emailOk = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(this.email);

    if (this.email == '') {
      return {
        err: true,
        msg: 'Campo obligatorio',
      };
    } else if (!emailOk) {
      return {
        err: true,
        msg: 'Ingresa un email valido',
      };
    }
    return {
      err: false,
    };
  };
  validarNumero = () => {
    let numeroOk = /^(099|098)\d{7}$/.test(this.telefono);
    if (this.telefono == '') {
      return {
        err: true,
        msg: 'Campo obligatorio',
      };
    } else if (!numeroOk) {
      return {
        err: true,
        msg: 'Ingresa un telefono valido',
      };
    }

    return {
      err: false,
    };
  };

  enviarForm = () => {
    this.registrarReserva.submit();
  };

  validarFecha = () => {
    if (this.fecha == '') {
      return {
        err: true,
        msg: 'Ingresa una fecha',
      };
    }
    return {
      err: false,
    };
  };
}

registrarReserva.addEventListener('submit', (x) => {
  x.preventDefault();
  let datosReserva = {
    nombres: nombres.value,
    email: email.value,
    telefono: numeroCelular.value,
    fecha: fecha.value,
  };

  validarDatos = new ValidarDatos(datosReserva);
  validarDatos.validarDatos();
  validarDatos.validarFecha();
});

window.onblur = function () {
  //Esta funcion se ejecuta cuando se cambia de pestaña en el navegador
  console.log('taaaaaal');
};

/* ================= SCROLL ORIZONAL EN SERIVICIOS =====================*/
const __serviciosContainerCenter = document.querySelector('.__serviciosContainerCenter');
const backButton = document.querySelector('.back-back');
const forwardButton = document.querySelector('.back-forward');

backButton.addEventListener('click', (x) => {
  let test = __serviciosContainerCenter.scrollLeft;
  test -= 300;
  __serviciosContainerCenter.scroll({
    left: test,
    behavior: 'smooth',
  });
});

forwardButton.addEventListener('click', (x) => {
  let test = __serviciosContainerCenter.scrollLeft;
  test += 300;
  __serviciosContainerCenter.scroll({
    left: test,
    behavior: 'smooth',
  });
});
/* ================= *FIN SCROLL ORIZONAL EN SERIVICIOS =====================*/

// back.addEventListener('click', () => {
//   let backDatos = new Reserva();
//   backDatos.backDeslizarRserva();
// });

// next.addEventListener('click', () => {
//   let newReserva = new Reserva();
//   newReserva.deslizarDatosReserva();
// });
