'use strict';

(function () {
  var URL_DOWN = 'https://js.dump.academy/code-and-magick/data';
  var URL_UP = ' https://js.dump.academy/code-and-magick';
  var TIMEOUT_IN_MS = 10000;
  var ERROR_CLIENT_RANGE_START = 400;
  var ERROR_CLIENT_RANGE_END = 499;
  var ERROR_SERVER_RANGE_START = 500;
  var ERROR_SERVER_RANGE_END = 599;
  var STATUS_CODE_OK = 200;
  var LIST_ERROR_MESSAGES = {
    '400': 'В запросе синтаксическая ошибка.',
    '401': 'Запрашиваемый ресурс отсутствует.',
    '403': 'Доступ запрещен',
    '404': 'Запрашиваемый ресурс отсутствует.',
    '500': 'Внутренняя ошибка сервера.',
    '501': 'Ошибка в методе запроса.',
    '502': 'Недействительное сообщение от вышестоящего сервера.',
    '503': 'Отказ сервера по техническим причинам.'
  };

  var load = function (loadHandler, errorHandler) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        loadHandler(xhr.response);
      } else {
        if (xhr.status >= ERROR_CLIENT_RANGE_START && xhr.status <= ERROR_CLIENT_RANGE_END) {
          var message = 'Произошла ошибка клиента с кодом: ' + xhr.status + '. ';
        } else {
          if (xhr.status >= ERROR_SERVER_RANGE_START && xhr.status <= ERROR_SERVER_RANGE_END) {
            message = 'Произошла ошибка сервера с кодом: ' + xhr.status + '. ';
          }
        }
        for (var code in LIST_ERROR_MESSAGES) {
          if (code === String(xhr.status)) {
            message = message + LIST_ERROR_MESSAGES[code];
          }
        }
        errorHandler(message);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', URL_DOWN);
    xhr.send();
  };

  var save = function (data, uploadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        uploadHandler(xhr.response);
      } else {
        if (xhr.status >= ERROR_CLIENT_RANGE_START && xhr.status <= ERROR_CLIENT_RANGE_END) {
          var message = 'Произошла ошибка клиента с кодом: ' + xhr.status + '. ';
        } else {
          if (xhr.status >= ERROR_SERVER_RANGE_START && xhr.status <= ERROR_SERVER_RANGE_END) {
            message = 'Произошла ошибка сервера с кодом: ' + xhr.status + '. ';
          }
        }
        for (var code in LIST_ERROR_MESSAGES) {
          if (code === String(xhr.status)) {
            message = message + LIST_ERROR_MESSAGES[code];
          }
        }
        errorHandler(message);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.open('POST', URL_UP);
    xhr.send(data);
  };

  window.backend = {
    'load': load,
    'save': save
  };
})();
