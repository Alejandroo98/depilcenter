var URLactual = window.location;
let URLpintar = URLactual.pathname;
let etiquetaPintar = document.querySelector('.blog');
if (URLpintar === '/blog') {
  etiquetaPintar.classList.add('pintarNav');
}
