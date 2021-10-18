import { getDate } from './helpers.js';

const date_input = document.querySelector('.fecha-input');
const todayDate = getDate();

date_input.addEventListener('click', () => {
  const today = document.querySelector('.today');
  if (date_input.value == todayDate) {
    today.classList.add('active');
  } else if (date_input.value == '') {
    today.classList.add('active');
    date_input.value = todayDate;
  }
  if (date_input.value != todayDate) {
    today.classList.remove('active');
  }

  // if( today =  )

  console.log();
});

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
