let socket = io();
const URLactual = window.location;
const URLpintar = URLactual.pathname;
const next = document.querySelector('.next');
const back = document.querySelector('.back');
const nombres = document.getElementById('nombres');
const numeroCelular = document.getElementById('numeroCelular');
const fecha = document.getElementById('fecha');
const hora = document.getElementById('hora');
const __contenedorMetodoDepilacion = document.getElementById('__contenedorMetodoDepilacion');
const mesCumpleanios = document.querySelector('#mesCumpleanios');

/* ================== CALENDAR RESERVA =================== */
$.fn.datepicker.dates['es'] = {
  days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  daysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  today: 'Hoy',
  monthsTitle: 'Meses',
  clear: 'Borrar',
  weekStart: 1,
  format: 'dd/mm/yyyy',
};

$('.date-datapicker').datepicker({
  language: 'es',
  format: 'dd-mm-yyyy',
  todayHighlight: true,
  startDate: 'format',
  todayBtn: false,
  autoclose: true,
  toggleActive: true,
  keyboardNavigation: false,
});

$('.date-datapicker-cumpleanios').datepicker({
  language: 'es',
  format: 'dd-mm-yyyy',
  autoclose: true,
});

//Valor de input segun el dia en que nos encontremos
let dateInput = new Date();
const month = dateInput.getMonth() + 1;
const day = dateInput.getDate();
const year = dateInput.getFullYear();
let dayCero = '';
let monthCero = '';

if (month < 10) {
  monthCero = 0;
} else {
  monthCero = '';
}

if (day < 10) {
  dayCero = 0;
} else {
  dayCero = '';
}

let fullDate = `${dayCero}${day}-${monthCero}${month}-${year} `;
let form_control_date = document.querySelector('.form-control-date');
form_control_date.value = fullDate;

/* ================== *FIN CALENDAR RESERVA =================== */

/* =========== MES DE CUMPLEAÑEROS ========= */

let mesCuple = new Date();
let imprimirMes;
switch (mesCuple.getMonth()) {
  case 0:
    imprimirMes = 'Enero';
    break;
  case 1:
    imprimirMes = 'Febrero';
    break;
  case 2:
    imprimirMes = 'Marzo';
    break;
  case 3:
    imprimirMes = 'Abril';
    break;
  case 4:
    imprimirMes = 'Mayo';
    break;
  case 5:
    imprimirMes = 'Junio';
    break;
  case 6:
    imprimirMes = 'Julio';
    break;
  case 7:
    imprimirMes = 'Agosto';
    break;
  case 8:
    imprimirMes = 'Septiembre';
    break;
  case 9:
    imprimirMes = 'Octubre';
    break;
  case 10:
    imprimirMes = 'Noviembre';
    break;
  case 11:
    imprimirMes = 'Diciembre';
    break;
}

/* ======*FIN IMPRIMIR CUMPLAÑOS====== */

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

    if (
      nombreOk.err === false &&
      emailOk.err === false &&
      numeroOk.err === false &&
      fechaOk.err == false
    ) {
      this.enviarForm();
    } else {
      if (nombreOk.err === true) {
        this.errNombres.innerHTML = `<span class="material-icons errIcon">error_outline</span>${nombreOk.msg}`;
      } else {
        this.errNombres.innerHTML = ``;
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

window.onblur = function () {
  //Esta funcion se ejecuta cuando se cambia de pestaña en el navegador
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
