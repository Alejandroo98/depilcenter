var URLactual = window.location;
let URLpintar = URLactual.pathname;
let etiquetaPintar = document.querySelector('.contactos');
if (URLpintar === '/contactos') {
  etiquetaPintar.classList.add('pintarNav');
}
let navbar = document.querySelector('.navbar');
navbar.setAttribute("style" , "transition : none ; background : var(--celeste)")

