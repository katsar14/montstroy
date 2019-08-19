'use strict';

(function () {

  var togglers = Array.from(document.querySelectorAll('.service__title'));

  if (!togglers.length) {
    return;
  }

  function toggleDropdown(el) {
    var target = el.nextElementSibling;
    if (!target || !target.classList.contains('service__list')) {
      return;
    };

    function documentKeypressHandler(evt) {
      if (evt.keyCode === 27) {
        closeDropdown();
      }
    }

    function openDropdown() {
      togglers.forEach(function (item, index) {
        if (window.matchMedia('(min-width: 768px').matches) {
          if (index !== 0) {
            if (item.classList.contains('active')) {
              item.classList.remove('active');
              item.nextElementSibling.style.maxHeight = target.scrollHeight + 'px';
              setTimeout(function () {
                item.nextElementSibling.style.maxHeight = 0;
              }, 50);
            }
          }
        } else {
          if (item.classList.contains('active')) {
            item.classList.remove('active');
            item.nextElementSibling.style.maxHeight = target.scrollHeight + 'px';
            setTimeout(function () {
              item.nextElementSibling.style.maxHeight = 0;
            }, 50);
          }
        }
      });

      target.style.maxHeight = target.scrollHeight + 'px';
      setTimeout(function () {
        target.style.maxHeight = 'none';
      }, 300)
      el.classList.add('active');
      document.addEventListener('keydown', documentKeypressHandler);
    }

    function closeDropdown() {
      el.classList.remove('active');
      target.style.maxHeight = target.scrollHeight + 'px';
      setTimeout(function () {
        target.style.maxHeight = 0;

      }, 50);


      document.removeEventListener('keydown', documentKeypressHandler);
    }

    if (!el.classList.contains('active')) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }

  toggleDropdown(togglers[0]);

  togglers.forEach(function (toggler) {
    toggler.addEventListener('click', function () {
      toggleDropdown(this);
    })
  });

})();