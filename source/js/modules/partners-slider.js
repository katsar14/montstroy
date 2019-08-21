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
