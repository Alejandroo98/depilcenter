var URLactual = window.location;
let URLpintar = URLactual.pathname;
let etiquetaPintar = document.querySelector('.inicio');
let next = document.querySelector('.next');
let back = document.querySelector('.back');
let nombres = document.getElementById('nombres');
let email = document.getElementById('email');
let numeroCelular = document.getElementById('numeroCelular');

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
    this.nombres = datos.nombres;
    this.email = datos.email;
    this.telefono = datos.telefono;
  }

  validarDatos = () => {
    let nombreOk = this.validarNombres();
    let emailOk = this.validarEmail();
    let numeroOk = this.validarNumero();

    if (nombreOk === false && emailOk === false && numeroOk === false) {
      this.enviarForm();
    } else {
      if (nombreOk.err === true) {
        this.errNombres.innerHTML = `${nombreOk.msg}<span class="material-icons errIcon">error_outline</span>`;
      } else {
        this.errNombres.innerHTML = ``;
      }
      if (emailOk.err === true) {
        this.errEmail.innerHTML = `${emailOk.msg}<span class="material-icons errIcon">error_outline</span>`;
      } else {
        this.errEmail.innerHTML = ``;
      }
      if (numeroOk.err === true) {
        this.errNumero.innerHTML = `${numeroOk.msg}<span class="material-icons errIcon">error_outline</span>`;
      } else {
        this.errNumero.innerHTML = ``;
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
    } else if (tieneNumeros === 1) {
      return {
        err: true,
        msg: 'Ingresa un nombre valido',
      };
    } else if (!nombresOk) {
      return {
        err: true,
        msg: 'Ingresa un nombre y un apellido',
      };
    }
    return {
      err: false,
    };
  };

  validarEmail = () => {
    // let emailOk = /^\w+([\.-]?\w+)*\@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(
    //   this.email
    // );

    /* jefferon.asds@gmail.com */

    let emailOk = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
      this.email
    );

    console.log(emailOk);
    console.log(this.email);

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
}

registrarReserva.addEventListener('submit', (x) => {
  x.preventDefault();
  let datosReserva = {
    nombres: nombres.value,
    email: email.value,
    telefono: numeroCelular.value,
  };

  validarDatos = new ValidarDatos(datosReserva);
  validarDatos.validarDatos();
});

back.addEventListener('click', () => {
  console.log('Dentro');
  let backDatos = new Reserva();
  backDatos.backDeslizarRserva();
});

next.addEventListener('click', () => {
  let newReserva = new Reserva();
  newReserva.deslizarDatosReserva();
});
