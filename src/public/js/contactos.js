var URLactual = window.location;
let URLpintar = URLactual.pathname;
let etiquetaPintar = document.querySelector('.contactos');
if (URLpintar === '/contactos') {
  etiquetaPintar.classList.add('pintarNav');
}
let navbar = document.querySelector('.navbar');
navbar.setAttribute('style', 'background-color : #e8908b');
