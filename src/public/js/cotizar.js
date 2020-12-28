var URLactual = window.location;
let URLpintar = URLactual.pathname;
let etiquetaPintar = document.querySelector('.cotizar');
if (URLpintar === '/cotizar-combos') {
  etiquetaPintar.classList.add('pintarNav');
}
