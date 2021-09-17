const { DH, DM } = {
  DH: 'hombre',
  DM: 'mujer',
};

const getPath = () => {
  const path = window.location.pathname;
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('genero');
  return { path, query };
};

const changeImg = () => {
  const { path, query } = getPath();
  const imgCotizarContainer = document.querySelector('.imgCotizarContainer');

  const queryMuejer = query == DM;
  const queryHombre = query == DH;

  if (queryMuejer) {
    imgCotizarContainer.innerHTML = `<img src="../img/cotizar_combos/mujer_modelo_cotizar.png" alt="Modelo cotizar mujer - Depilcenter - Centro de depilacion"></img>`;
  } else if (queryHombre) {
    imgCotizarContainer.innerHTML = `<img src="../img/cotizar_combos/hombre_modelo_cotizar.png" alt="Modelo cotizar hombre - Depilcenter - Centro de depilacion"></img>`;
  }
};

export default changeImg;
