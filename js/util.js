'use strict';
(function () {
  window.util = {
    getRandomElement: function (listElements) {
      return listElements[Math.round(Math.random() * (listElements.length - 1))];
    }
  };
})();
