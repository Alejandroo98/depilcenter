try {
  const overView = document.querySelector('.over-view-container');
  const content_master = document.querySelector('.container-master');
  const overViewBar = document.querySelector('#overViewBar');

  let value = overViewBar.value;

  const barLoad = () => {
    const clear = setInterval((bar = 10) => {
      for (let i = overViewBar.value; i < bar; i++) {
        overView.value = i;
      }
      overViewBar.value += bar;
      if (overViewBar.value > 99) {
        clearInterval(clear);
      }
    }, 400);
  };

  barLoad();

  window.onload = function ({ target }) {
    overView.style.opacity = '0';
    setTimeout(() => {
      barLoad(100);
      overView.style.display = 'none';
      content_master.style.display = 'block';
    }, 100);
  };
} catch (error) {
  //
}
