
if (document.getElementById('map')) {
  ymaps.ready(function () {
    // document.addEventListener('load', function () {
    var myMap = new ymaps.Map('map', {
      center: [55.63176756910473, 37.61802149999995],
      zoom: 16,
      controls: []
    }, {
        suppressMapOpenBlock: true
      }, {
        searchControlProvider: 'yandex#search'
      }),
      myPlacemark = new ymaps.Placemark(([55.63176756910473,37.61802149999995]), {

      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'img/map-pin.png',
          // Размеры метки.
          iconImageSize: [20, 26],
          // Смещение левого верхнего угла иконки относительно
          // её 'ножки' (точки привязки).
          iconImageOffset: [-10, -26]
        });

    myMap.geoObjects.add(myPlacemark);
    myMap.controls.remove('rulerControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('zoomControl');
    myMap.controls.remove('routeEditor');

    //отключаем зум колёсиком мышки
    myMap.behaviors.disable('scrollZoom');

    //на мобильных устройствах... (проверяем по userAgent браузера)
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      //... отключаем перетаскивание карты
      myMap.behaviors.disable('drag');
    }
  });
}



