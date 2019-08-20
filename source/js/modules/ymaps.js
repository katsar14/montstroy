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
