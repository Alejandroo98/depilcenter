const URL = window.location.pathname;
const $inicio = document.querySelector('.inicio');
const $mas = document.querySelector('.mas');
const $cotizar = document.querySelector('.cotizar');
const $contactos = document.querySelector('.contactos');

switch (URL) {
  case '/':
    $inicio.classList.add('pintarNav');
    break;
  case '/mas':
    $blog.classList.add('pintarNav');
  case '/cotizar/depilacion-cera':
    $cotizar.classList.add('pintarNav');
    break;
  case '/cotizar/depilacion-definitiva':
    $cotizar.classList.add('pintarNav');
    break;
  case '/contactos':
    $contactos.classList.add('pintarNav');
    break;
}
