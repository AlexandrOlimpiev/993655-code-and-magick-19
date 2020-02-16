'use strict';
(function () {
  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var FlagFocuseNameInput = false;

  userNameInput.addEventListener('focus', function () {
    FlagFocuseNameInput = true;
  });

  userNameInput.addEventListener('blur', function () {
    FlagFocuseNameInput = false;
  });

  var dialogEscapePressHandler = function (evt) {
    if (evt.key === window.const.ESC_KEY && FlagFocuseNameInput === false) {
      closeDialog();
    }
  };

  var openDialog = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', dialogEscapePressHandler);
  };

  var closeDialog = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', dialogEscapePressHandler);
    userDialog.removeAttribute('style');
  };


  userDialogOpen.addEventListener('click', function () {
    openDialog();
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.ENTER_KEY) {
      openDialog();
    }
  });

  userDialogClose.addEventListener('click', function () {
    closeDialog();
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.ENTER_KEY) {
      closeDialog();
    }
  });

  var wizards = window.test.wizards;
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var renderWizards = function (arrayWizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(arrayWizards[i]));
    }
    return fragment;
  };

  similarListElement.appendChild(renderWizards(wizards));
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
