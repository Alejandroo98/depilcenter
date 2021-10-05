const changeActiveOption = () => {
  const url = location.pathname;

  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('genero');

  const data_desct_config = (data) => {
    const btn_cotizar_reserve = document.querySelector('.btn-cotizar-reserve');
    btn_cotizar_reserve.setAttribute('data-id', data);
  };

  const activeOption = (id) => {
    try {
      document.getElementById(id).setAttribute('selected', '');
    } catch (error) {
      //
    }
  };

  if (myParam == 'mujer') {
    activeOption('mujerOption');
    activeOption('mujerOptionIPL');
  } else if (myParam == 'hombre') {
    activeOption('hombreOptionIPL');
  }

  switch (url) {
    case '/cotizar/depilacion-cera':
      //Marcar como activo el head de la caja de cotizar
      const depilacionCera = document.getElementById('nav-home-tab');
      document.getElementById('nav-profile').innerHTML = '';
      depilacionCera.classList.toggle('active');

      //Marcar como activo el body de la caja de cotiar
      const nav_home = document.getElementById('nav-home');
      nav_home.classList.toggle('active');

      //Esto nos sirve para dependiente de la url definirimos un valor al `data-desc` que es el campo de donde adquiere la informacion para ser envida por medio del formulario al momento de hacer una reserva
      if (myParam == 'hombre') {
        data_desct_config('d_cera');
      } else if (myParam == 'mujer') {
        data_desct_config('d_cera');
      }

      break;

    case '/cotizar/depilacion-definitiva':
      //Marcar como activo el head de la caja de cotiar
      const depilacionDefinitiva = document.getElementById('nav-profile-tab');
      document.getElementById('nav-home').innerHTML = '';
      depilacionDefinitiva.classList.toggle('active');

      //Marcar como activo el body de la caja de cotiar
      const nav_profile = document.getElementById('nav-profile');
      nav_profile.classList.toggle('active');

      //Esto nos sirve para dependiente de la url definirimos un valor al `data-desc` que es el campo de donde adquiere la informacion para ser envida por medio del formulario al momento de hacer una reserva
      if (myParam == 'hombre') {
        data_desct_config('d_hombre');
      } else if (myParam == 'mujer') {
        data_desct_config('d_laser');
      }

      break;
  }

  //Esto nos sirve para redireccionar dependiente el genero seleccionado, el servidor enviara informacion nuevamente dependiendo la URL

  //? Repeti dos veces lo miso y cree una clase distina para cada uno por que si ponia la misma por alguna razon la clase parecia repetirse y cuado sucede esto el evento no funciona, pero si lo intente
  const select_d_Cera = document.querySelector('.depilacion_cera_select');
  const select_d_definitiva = document.querySelector('.depilacion_definitiva_select');

  const changeSelectValue = (valueSelect) => {
    if (valueSelect == 'mujer') {
      window.location.href = `${url}?genero=mujer`;
    } else if (valueSelect == 'hombre') {
      window.location.href = `${url}?genero=hombre`;
    }
  };

  try {
    select_d_Cera.addEventListener('change', () => changeSelectValue(select_d_Cera.value));
  } catch (error) {
    //
  }

  try {
    select_d_definitiva.addEventListener('change', () =>
      changeSelectValue(select_d_definitiva.value)
    );
  } catch (error) {
    //
  }
};

export default changeActiveOption;
