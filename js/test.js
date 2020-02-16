'use strict';
(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var makeWizard = function () {
    return {
      'name': window.util.getRandomElement(WIZARD_NAMES) + ' ' + window.util.getRandomElement(WIZARD_SURNAMES),
      'coatColor': window.util.getRandomElement(COAT_COLORS),
      'eyesColor': window.util.getRandomElement(EYES_COLORS)
    };
  };

  var getWizards = function () {
    var array = [];
    for (var i = 0; i < 4; i++) {
      array[i] = makeWizard();
    }
    return array;
  };

  window.test = {
    'wizards': getWizards()
  };
})();
