import CotizarConfig from './cotizar/cotizarConfig.js';
import CotizarIplConfig from './cotizar/cotizarIplConfig.js';
import CotizarOsConfig from './cotizar/cotizarOsConfig.js';
import changeImg from './cotizar/changeImg.js';
import changeActiveOption from './cotizar/changeActiveOption.js';
import { pinarDespintar, printDataDesc, printSelectDataDesc } from './helpers.js';

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
const box_d_laser = document.querySelector('#nav-profile');
const cotizarOsConfig = new CotizarOsConfig();
const cotizarConfig = new CotizarConfig(cotizarOsConfig);
const cotizarIplConfig = new CotizarIplConfig(cotizarOsConfig);

changeImg();

const startCalculoZonas = ({ target }) => {
  const id = target.id;
  const idSplit = id.split('_')[0];

  if (id != '') {
    if (idSplit == 'C' || idSplit == 'F') {
      pinarDespintar(id);
      cotizarConfig.comprovarZonaExiste(id);
    } else if (idSplit == 'T') {
      const url = location.pathname;
      pinarDespintar(id);
      cotizarOsConfig.comprovarZonaExiste(target);

      if (url == '/cotizar/depilacion-cera') {
        cotizarConfig.sumarZonas();
      } else if (url == '/cotizar/depilacion-definitiva') {
        cotizarIplConfig.zumarValoresTotales();
      }
    } else if (idSplit == 'DD') {
      pinarDespintar(id);
      cotizarIplConfig.comprovarZonaExiste(target);
    }
  }
};

box_d_cera.addEventListener('click', startCalculoZonas);
box_d_laser.addEventListener('click', startCalculoZonas);
box_otros_servicios.addEventListener('click', startCalculoZonas);

const btn_cotizar_reserve = document.querySelector('.btn-cotizar-reserve');
btn_cotizar_reserve.addEventListener('click', ({ target }) => {
  printDataDesc({ id: target.dataset.id, value: 'COTIZACION' });
});

/*  ================  *FIN PINTAR O DESPINTAR ZONA SELECCIONADA ======== */
