const changeActiveOption = () => {
  const url = location.pathname;

  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('genero');
  const selectHombreMujer = document.querySelector('.depilacion_cera_select');

  const data_desct_config = (data) => {
    const btn_cotizar_reserve = document.querySelector('.btn-cotizar-reserve');
    btn_cotizar_reserve.setAttribute('data-id', data);
  };

  const activeOption = (id) => {
    document.getElementById(id).setAttribute('selected', '');
  };

  if (myParam == 'mujer') {
    activeOption('mujerOption');
  } else if (myParam == 'hombre') {
    activeOption('hombreOption');
  }

  switch (url) {
    case '/cotizar/depilacion-cera':
      const depilacionCera = document.getElementById('nav-home-tab');
      depilacionCera.classList.toggle('active');
      depilacionCera.setAttribute('aria-selected', 'true');

      if (myParam == 'hombre') {
        data_desct_config('d_cera');
      } else if (myParam == 'mujer') {
        data_desct_config('d_cera');
      }

      break;
    case '/cotizar/depilacion-definitiva':
      const depilacionDefinitiva = document.getElementById('nav-profile-tab');
      depilacionDefinitiva.classList.toggle('active');
      depilacionDefinitiva.setAttribute('aria-selected', 'true');

      if (myParam == 'hombre') {
        data_desct_config('d_hombre');
      } else if (myParam == 'mujer') {
        data_desct_config('d_laser');
      }

      break;
  }

  const changeSelectValue = () => {
    if (selectHombreMujer.value == 'mujer') {
      window.location.href = `${url}?genero=mujer`;
    } else if (selectHombreMujer.value == 'hombre') {
      window.location.href = `${url}?genero=hombre`;
    }
  };

  selectHombreMujer.addEventListener('change', (e) => {
    changeSelectValue();
  });
};

export default changeActiveOption;
