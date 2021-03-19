const arrow = document.querySelector('.arrow');

window.onscroll = function () {
  if (window.pageYOffset > 400) {
    arrow.classList.add('stop');
  } else {
    arrow.classList.remove('stop');
  }
};
