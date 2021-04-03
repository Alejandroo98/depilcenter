// if (window.history.replaceState) { // verificamos disponibilidad
//     window.history.replaceState(null, null, window.location.href);
// }

let navbar = document.querySelector('.navbar');
navbar.setAttribute('style', 'background-color : var(--rojo)');

let fechaReserva = document.querySelector(".fechaReserva")
console.log(fechaReserva.textContent);
let week = new Date()

let semanaNumero = ( numeroSemana ) => {

switch ( numeroSemana ) {
    case 1:
        return "Lunes"

    case 2:
        return "Martes"

    case 3:
        return "Miercoles"

    case 4:
        return "Jueves"

    case 5:
        return "Viernes"

    case 6:
        return "Sabado"

    case 7:
        return "Domingo"

    default:
        return "Dia de la semana incorrecto"
        break;
}

}

console.log(semanaNumero( week.getDay() ));