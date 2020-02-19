'use strict';
(function () {
  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var form = userDialog.querySelector('.setup-wizard-form');
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

  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var loadHandler = function (arrayWizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(window.util.getRandomElement(arrayWizards)));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var uploadHandler = function () {
    closeDialog();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), uploadHandler, errorHandler);
    evt.preventDefault();
  });

  window.backend.load(loadHandler, errorHandler);
})();
