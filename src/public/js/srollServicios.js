const __serviciosContainerCenter = document.querySelector('.__serviciosContainerCenter');
const backButton = document.querySelector('.back-back');
const forwardButton = document.querySelector('.back-forward');

backButton.addEventListener('click', (x) => {
  let test = __serviciosContainerCenter.scrollLeft;
  test -= 300;
  __serviciosContainerCenter.scroll({
    left: test,
    behavior: 'smooth',
  });
});

forwardButton.addEventListener('click', (x) => {
  let test = __serviciosContainerCenter.scrollLeft;
  test += 300;
  __serviciosContainerCenter.scroll({
    left: test,
    behavior: 'smooth',
  });
});
