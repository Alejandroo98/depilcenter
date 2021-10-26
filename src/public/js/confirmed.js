const btn_editar_reserva = document.querySelector('#btn-editar-reserva');
const confirmed_container = document.querySelector('.confirmed-container');

btn_editar_reserva.addEventListener('click', () => {
  confirmed_container.style.display = 'none';
});
