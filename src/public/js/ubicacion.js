var URLactual = window.location;
let URLpintar = URLactual.pathname;
let etiquetaPintar = document.querySelector('.ubicacion');
if (URLpintar === '/ubicacion') {
  etiquetaPintar.classList.add('pintarNav');
}
