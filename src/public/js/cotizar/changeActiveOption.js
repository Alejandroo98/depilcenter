const changeActiveOption = () => {
  const url = location.pathname;

  const urlParams = new URLSearchParams(window.location.search);
  const selectHombreMujer = document.querySelector('.depilacion_cera_select');
  const myParam = urlParams.get('genero');

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
      break;
    case '/cotizar/depilacion-definitiva':
      const depilacionDefinitiva = document.getElementById('nav-profile-tab');
      depilacionDefinitiva.classList.toggle('active');
      depilacionDefinitiva.setAttribute('aria-selected', 'true');
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
