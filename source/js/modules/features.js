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
          indicator.classList.remove('active')
        });
        indicators[index].classList.add('active');
      } else {
        card.classList.remove('features__item--active');
      }
    });
  };

  featureCards.forEach(function (card) {
    card.addEventListener('click', function () {
      showActiveCard(this);
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
    initialSlide: 1
  };

  if (window.matchMedia('(max-width: 767px)').matches) {
    var mySwiper = new Swiper('.features__inner-wrapper', featuresSliderSettings);
    mySwiper.init();
  }

  window.addEventListener('resize', function () {
    if (window.matchMedia('(max-width: 767px)').matches) {
      if (!mySwiper) {
        mySwiper = new Swiper('.features__inner-wrapper', featuresSliderSettings);
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
