/* ========= SCROLL NAV ========== */
window.onscroll = function () {
  const navbar = document.querySelector('.navbar');
  const vertical = window.scrollY;
  if (vertical > 0) {
    navbar.classList.add('navbarBoxShadow');
  } else {
    navbar.classList.remove('navbarBoxShadow');
  }
};
// /* ========= *SCROLL NAV  ========== */
