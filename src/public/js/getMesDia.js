const getMonth = () => {
  let mes = '';
  switch (new Date().getMonth()) {
    case 0:
      mes = 'Enero';
      break;
    case 1:
      mes = 'Febrero';
      break;
    case 2:
      mes = 'Marzo';
      break;
    case 3:
      mes = 'Abril';
      break;
    case 4:
      mes = 'Mayo';
      break;
    case 5:
      mes = 'Junio';
      break;
    case 6:
      mes = 'Julio';
      break;
    case 7:
      mes = 'Agosto';
      break;
    case 8:
      mes = 'Septiembre';
      break;
    case 9:
      mes = 'Octubre';
      break;
    case 10:
      mes = 'Noviembre';
      break;
    case 11:
      mes = 'Diciembre';
      break;
  }

  return mes;
};

const getDay = () => {
  switch (new Date().getDay()) {
    case 1:
      return 'Lunes';

    case 2:
      return 'Martes';

    case 3:
      return 'Miercoles';

    case 4:
      return 'Jueves';

    case 5:
      return 'Viernes';

    case 6:
      return 'Sabado';

    case 7:
      return 'Domingo';

    default:
      return 'Dia de la semana incorrecto';
      break;
  }
};

export { getMonth, getDay };
