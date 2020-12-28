var URLactual = window.location;
let URLpintar = URLactual.pathname;
let etiquetaPintar = document.querySelector('.servicios');
if (URLpintar === '/servicios') {
  etiquetaPintar.classList.add('pintarNav');
}
