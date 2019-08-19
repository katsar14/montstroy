'use strict';

(function () {

  var toggler = document.querySelector('.js-nav-toggler');
  var dropdown = document.querySelector('.main-nav');

  if (!toggler || !dropdown) {
    return;
  }

  var showDropdown = function () {

    var onEscKeyPress = function (e) {
      if (e.keyCode === 27) {
        hideDropdown();
      }
    };

    var onClick = function (e) {
      if (!dropdown.contains(e.target)) {
        hideDropdown();
      }
    };

    var hideDropdown = function () {
      dropdown.classList.remove('show');
      document.removeEventListener('keydown', onEscKeyPress);
      document.removeEventListener('click', onClick);
    };

    if (dropdown.classList.contains('show')) {
      hideDropdown(toggler);
    } else {
      dropdown.classList.add('show');
      document.addEventListener('keydown', onEscKeyPress);
      setTimeout(function () {
        document.addEventListener('click', onClick);
      });
    }
  };

  toggler.addEventListener('click', function () {
    showDropdown();
  });

})();