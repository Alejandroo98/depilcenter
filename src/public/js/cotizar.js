import CotizarConfig from './cotizar/cotizarConfig.js';
import changeImg from './cotizar/changeImg.js';
import changeActiveOption from './cotizar/changeActiveOption.js';
import { printDataDesc, printSelectDataDesc } from './helpers.js';

//datepicker
import './printDateReserve.js';

changeActiveOption();
printSelectDataDesc();

// change servicios options
import './serviciosActive.js';

//novedades
import './novedades.js';

//select servicios url
import './selectServicios.js';

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
const btn_cotizar_reserve = document.querySelector('.btn-cotizar-reserve');
btn_cotizar_reserve.addEventListener('click', ({ target }) => {
  printDataDesc({ id: target.dataset.id, value: 'COTIZACION' });
});

/*  ================  *FIN PINTAR O DESPINTAR ZONA SELECCIONADA ======== */
