'use strict';
(function () {
  var userDialog = document.querySelector('.setup');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  var userSetup = document.querySelector('.setup-player');
  var userWizard = userSetup.querySelector('.setup-wizard');
  var coatUserWizard = userWizard.querySelector('.wizard-coat');
  var eyesUserWizard = userWizard.querySelector('.wizard-eyes');
  var fireballUserWizard = userSetup.querySelector('.setup-fireball-wrap');

  coatUserWizard.addEventListener('click', function () {
    coatUserWizard.style.fill = window.util.getRandomElement(window.const.COAT_COLORS);
    userSetup.querySelector('input[name="coat-color"]').value = coatUserWizard.style.fill;
  });

  eyesUserWizard.addEventListener('click', function () {
    eyesUserWizard.style.fill = window.util.getRandomElement(window.const.EYES_COLORS);
    userSetup.querySelector('input[name="eyes-color"]').value = eyesUserWizard.style.fill;
  });

  fireballUserWizard.addEventListener('click', function () {
    fireballUserWizard.querySelector('input[name="fireball-color"]').value = window.util.getRandomElement(window.const.FIREBALL_COLOR);
    fireballUserWizard.style.background = fireballUserWizard.querySelector('input[name="fireball-color"]').value;
  });
})();
