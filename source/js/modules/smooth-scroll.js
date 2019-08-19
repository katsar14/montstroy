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
