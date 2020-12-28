var URLactual = window.location;
let URLpintar = URLactual.pathname;
let etiquetaPintar = document.querySelector('.inicio');
if (URLpintar === '/') {
  etiquetaPintar.classList.add('pintarNav');
}
