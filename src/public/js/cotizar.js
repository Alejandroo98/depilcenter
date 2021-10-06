import CotizarConfig from './cotizar/cotizarConfig.js';
import changeImg from './cotizar/changeImg.js';
import changeActiveOption from './cotizar/changeActiveOption.js';
import { pinarDespintar, printDataDesc, printSelectDataDesc } from './helpers.js';
import CotizarIplConfig from './cotizar/cotizarIplConfig.js';

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
const box_d_cera = document.querySelector('#nav-home');
const box_otros_servicios = document.querySelector('#otros_servicios');
const nav_profile = document.querySelector('#nav-profile');
const cotizarConfig = new CotizarConfig();
const cotizarIplConfig = new CotizarIplConfig();
changeImg();

const startCalculoZonas = ({ target }) => {
  const id = target.id;
  const idSplit = id.split('_')[0];

  if (id != '') {
    if (idSplit == 'C' || idSplit == 'F') {
      pinarDespintar(id);
      cotizarConfig.comprovarZonaExiste(id);
    } else if (idSplit == 'T') {
      pinarDespintar(id);
      cotizarConfig.comprovarZonaExisteOS(id);
    } else if (idSplit == 'DD') {
      pinarDespintar(id);
      cotizarIplConfig.comprovarZonaExiste(target);
      /* 
      TODO: Aqui tienes que hacer la config para que las zonas en d_laser se sumen dependiendo el numero de zonas el valor de esta zona y la promo  que tiene
      */
    }
  }
};

box_d_cera.addEventListener('click', startCalculoZonas);
box_otros_servicios.addEventListener('click', startCalculoZonas);
nav_profile.addEventListener('click', startCalculoZonas);

const btn_cotizar_reserve = document.querySelector('.btn-cotizar-reserve');
btn_cotizar_reserve.addEventListener('click', ({ target }) => {
  printDataDesc({ id: target.dataset.id, value: 'COTIZACION' });
});

/*  ================  *FIN PINTAR O DESPINTAR ZONA SELECCIONADA ======== */
