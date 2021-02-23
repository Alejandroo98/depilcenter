var URLactual = window.location;
let URLpintar = URLactual.pathname;
let etiquetaPintar = document.querySelector('.conocenos');
etiquetaPintar.classList.add('pintarNav');
let navbar = document.querySelectorAll('.nav-link');
for (let i = 0; i < navbar.length; i++) {
  navbar[i].setAttribute(
    'style',
    'color : rgb(51, 50, 50) !important ;font-weight: 400;'
  );
}
// navbar.setAttribute('style', 'color : black !important');
