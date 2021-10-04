import CotizarConfig from './cotizar/cotizarConfig.js';
import changeImg from './cotizar/changeImg.js';
import changeActiveOption from './cotizar/changeActiveOption.js';

changeActiveOption();

/*  ================  PINTAR O DESPINTAR ZONA SELECCIONADA ======== */
const cajaMainCotizar = document.querySelector('#nav-tabContent');
// const boxOtrosServicios = document.querySelector('.boxOtrosServicios');
const cotizarConfig = new CotizarConfig();
changeImg();

const startCalculoZonas = ({ target: { id } }) => {
  const idSplit = id.split('_')[0];

  if (id != '') {
    if (idSplit == 'C' || idSplit == 'F') {
      cotizarConfig.pinarDespintar(id);
      cotizarConfig.comprovarZonaExiste(id);
    } else if (idSplit == 'T') {
      cotizarConfig.pinarDespintar(id);
      cotizarConfig.comprovarZonaExisteOS(id);
    }
  }
};

// boxOtrosServicios.addEventListener('click', startCalculoZonas);
cajaMainCotizar.addEventListener('click', startCalculoZonas);

/*  ================  *FIN PINTAR O DESPINTAR ZONA SELECCIONADA ======== */

/* =======================MOSTRAR EL CUADRO DE REGISTRO DE DATOS PARA GENDAR CITA DESDE COTIZAR =========*/
import verAgendarCita from './cotizar/verAgendarCita.js';
const agendarCita = new verAgendarCita();
document.getElementById('btnAgendarCita').addEventListener('click', () => {
  agendarCita.scroll();
});

/* =======================*FIN MOSTRAR EL CUADRO DE REGISTRO DE DATOS PARA GENDAR CITA DESDE COTIZAR =======*/
