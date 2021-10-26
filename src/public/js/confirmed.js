import { scrollReserva } from './helpers.js';

const confirmed_container = document.querySelector('.confirmed-container');
const btn_editar_reserva = document.querySelector('#btn-editar-reserva');
const btn_agendar_reserve = document.querySelector('#btn-agendar-reserve');
const over_confirmed = document.querySelector('#over-confirmed');
const icon_close = document.querySelector('#icon-close');
const registrarReserva = document.querySelector('#registrarReserva');

const $localConfirmed = document.querySelector('#localConfirmed');
const $servicioConfirmed = document.querySelector('#servicioConfirmed');
const $fechaConfirmed = document.querySelector('#fechaConfirmed');
const $horaConfirmed = document.querySelector('#horaConfirmed');
const $nombresConfirmed = document.querySelector('#nombresConfirmed');
const $telefonoConfirmed = document.querySelector('#telefonoConfirmed');
const $fechaNacimientoConfirmed = document.querySelector('#fechaNacimientoConfirmed');

const changeDisplay = (value) => {
  confirmed_container.style.display = value;
};

const setValuesConfirmed = () => {
  $localConfirmed.innerHTML = registrarReserva.locales.value;
  const idServicio = registrarReserva.servicio.value;
  const {
    dataset: { name },
  } = document.getElementById(idServicio);

  $servicioConfirmed.innerHTML = name;

  let fecha = registrarReserva.fecha.value;
  let hora = registrarReserva.hora.value;
  let nombres = registrarReserva.nombres.value;
  let telefono = registrarReserva.numeroTelefono.value;
  let fNacimiento = registrarReserva.fechaCumpleanios.value;

  if (!nombres) {
    nombres = `<span style="color: #fc3535; margin:0">Campo vacio.</span>`;
  }

  if (!telefono) {
    telefono = `<span style="color: #fc3535; margin:0">Campo vacio.</span>`;
  }

  if (!fNacimiento) {
    fNacimiento = `00-00-0000`;
  }

  $fechaConfirmed.innerHTML = fecha;
  $horaConfirmed.innerHTML = hora;
  $nombresConfirmed.innerHTML = nombres;
  $telefonoConfirmed.innerHTML = telefono;
  $fechaNacimientoConfirmed.innerHTML = fNacimiento;
};

btn_agendar_reserve.addEventListener('click', () => {
  setValuesConfirmed();
  changeDisplay('flex');
  scrollReserva();
});

btn_editar_reserva.addEventListener('click', () => {
  changeDisplay('none');
});

over_confirmed.addEventListener('click', ({ target }) => {
  if (target.id == 'over-confirmed') changeDisplay('none');
});

icon_close.addEventListener('click', ({ target }) => {
  if (target.id == 'icon-close') changeDisplay('none');
});
