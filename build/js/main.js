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
    }

    function documentKeypressHandler(evt) {
      if (evt.keyCode === 27) {
        closeDropdown();
      }
    }

    function openDropdown() {
      togglers.forEach(function (item, index) {
        if (window.matchMedia('(min-width: 768px)').matches) {
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
      }, 300);
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

  if (window.matchMedia('(min-width: 768px)').matches) {
    toggleDropdown(togglers[0]);
  }

  togglers.forEach(function (toggler) {
    toggler.addEventListener('click', function (evt) {
      toggleDropdown(evt.currentTarget);
    });
  });

})();

'use strict';

(function () {

  var featureCards = Array.from(document.querySelectorAll('.features__item'));
  var indicators = Array.from(document.querySelectorAll('.features__indicators span'));

  if (!featureCards.length || !indicators.length) {
    return;
  }

  var showActiveCard = function (activeCard) {
    featureCards.forEach(function (card, index) {
      if (card === activeCard) {
        activeCard.classList.add('features__item--active');
        indicators.forEach(function (indicator) {
          indicator.classList.remove('active');
        });
        indicators[index].classList.add('active');
      } else {
        card.classList.remove('features__item--active');
      }
    });
  };

  featureCards.forEach(function (card) {
    card.addEventListener('click', function (evt) {
      showActiveCard(evt.currentTarget);
    });
  });

  var featuresSliderSettings = {
    init: false,
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 15,
    pagination: {
      el: '.features__indicators',
      type: 'bullets',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    initialSlide: 1
  };

  if (window.matchMedia('(max-width: 767px)').matches) {
    var mySwiper = new Swiper('.features__inner-wrapper', featuresSliderSettings); // eslint-disable-line no-undef
    mySwiper.init();
  }

  window.addEventListener('resize', function () {
    if (window.matchMedia('(max-width: 767px)').matches) {
      if (!mySwiper) {
        mySwiper = new Swiper('.features__inner-wrapper', featuresSliderSettings); // eslint-disable-line no-undef
      }
      mySwiper.init();
    } else {
      if (mySwiper) {
        mySwiper.destroy();
        mySwiper = undefined;
      }
    }
  });

})();

'use strict';

(function () {

  var settings = {
    init: false,
    speed: 400,
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.partners__pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.partners__btn--next',
      prevEl: '.partners__btn--prev',
    },

    breakpoints: {
      767: {
        slidesPerView: 1,
        spaceBetween: 10,

      },

      1023: {
        slidesPerView: 3,
        spaceBetween: 10,
        centeredSlides: true,
        initialSlide: 1,
      }
    }
  };

  var mySwiper = new Swiper('.partners__wrapper', settings); // eslint-disable-line no-undef
  mySwiper.init();

})();

'use strict';

(function () {

  document.body.classList.remove('no-js');

})();

'use strict';

(function () {
  var anchors = document.querySelectorAll('.js-smooth-scroll');

  if (!anchors.length) {
    return;
  }

  var smoothScroll = function (evt) {
    evt.preventDefault();
    var targetID = evt.currentTarget.getAttribute('href');
    var targetPosition = document.querySelector(targetID).offsetTop;

    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var duration = 1000;
    var start = null;

    var ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t * t + b;
      }
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    var step = function (timestamp) {
      if (!start) {
        start = timestamp;
      }
      var progress = timestamp - start;
      window.scrollTo(0, ease(progress, startPosition, distance, duration));
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  var onAnchorClick = function (evt) {
    smoothScroll(evt);
  };

  Array.prototype.forEach.call(anchors, function (anchor) {
    anchor.addEventListener('click', onAnchorClick);
  });
})();

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

'use strict';

if (document.getElementById('map')) {

  // eslint-disable-next-line no-undef
  ymaps.ready(function () {
    var mapSettings = {
      center: [55.63176756910473, 37.61802149999995],
      zoom: 16,
      controls: []
    };
    // eslint-disable-next-line no-undef
    var myMap = new ymaps.Map('map', mapSettings, {suppressMapOpenBlock: true}, {searchControlProvider: 'yandex#search'});

    var placemarkSettings = {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-pin.png',
      iconImageSize: [20, 26],
      iconImageOffset: [-10, -26]
    };

    // eslint-disable-next-line no-undef
    var myPlacemark = new ymaps.Placemark(([55.63176756910473, 37.61802149999995]), {}, placemarkSettings);

    myMap.geoObjects.add(myPlacemark);
    myMap.controls.remove('rulerControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('zoomControl');
    myMap.controls.remove('routeEditor');

    myMap.behaviors.disable('scrollZoom');


    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      myMap.behaviors.disable('drag');
    }
  });
}
