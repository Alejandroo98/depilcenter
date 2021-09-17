class verAgendarCita {
  scroll() {
    this.cajaReserva = document.querySelector('.agendarCita');
    this.cajaReserva.style.display = 'flex';
    this.cajaReserva.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
}

export default verAgendarCita;
