"use strict";

(function () {
  var fileDropArea = document.querySelectorAll('.input-file__label');

  function makeFileLoad(fileDropArea) {
    var fileInput = fileDropArea.querySelector('input');
    var fileClear = fileDropArea.parentNode.querySelector('.file-load__clear'); // Сбрасываем стандартные события при перетаскивании файла

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
      fileDropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ; // Добавляем стили при перетаскивании файла над нужной областью

    ['dragenter', 'dragover'].forEach(function (eventName) {
      fileDropArea.addEventListener(eventName, highlight, false);
    });
    ['dragleave', 'drop'].forEach(function (eventName) {
      fileDropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
      fileDropArea.classList.add('highlight');
    }

    ;

    function unhighlight(e) {
      fileDropArea.classList.remove('highlight');
    }

    ; //

    fileDropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
      var dt = e.dataTransfer;
      var files = dt.files;

      if (fileInput.files && fileInput.files[0]) {
        fileInput.value = '';

        if (!/safari/i.test(navigator.userAgent)) {
          fileInput.type = '';
          fileInput.type = 'file';
        }
      }

      fileInput.files = files;
      onFileChange();
    }

    ;

    var onFileChange = function onFileChange() {
      readUrl(fileInput);
    };

    var readUrl = function readUrl(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          fileDropArea.parentNode.classList.add('loaded');
          fileDropArea.nextElementSibling.querySelector('.file-load__name').textContent = input.files[0].name;
          window.onInstallationFileDrop && window.onInstallationFileDrop();
        };

        reader.readAsDataURL(input.files[0]);
      }
    };

    function onClear() {
      fileDropArea.parentNode.classList.remove('loaded');
      fileInput.value = '';

      if (!/safari/i.test(navigator.userAgent)) {
        fileInput.type = '';
        fileInput.type = 'file';
      }
    }

    fileInput.addEventListener('change', onFileChange);
    fileClear.addEventListener('click', onClear);
  }

  window.makeFileLoad = makeFileLoad;

  if (!fileDropArea[0]) {
    return;
  }

  fileDropArea.forEach(function (item) {
    makeFileLoad(item);
  });
})();

(function () {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  var $body = document.querySelector('body');

  function debounce(func) {
    var timer;
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 100, event);
    };
  }

  function Modal(trigger, modal) {
    this.trigger = trigger;
    this.modal = modal;
    this.overlay = this.modal.querySelector('.modal__overlay');
    this.closeBtn = this.modal.querySelector('.modal__close');
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onTriggerClick = this.onTriggerClick.bind(this);
    this.onResize = this.onResize.bind(this);
    this.addEventListeners();
  }

  Modal.prototype.open = function () {
    this.modal.classList.add('js-show');
    $body.classList.add('js__body-no-scroll');
  };

  Modal.prototype.close = function () {
    this.modal.classList.remove('js-show');
    $body.classList.remove('js__body-no-scroll');
  };

  Modal.prototype.onOverlayClick = function (e) {
    if (e.target === this.overlay) {
      this.close();
    }
  };

  Modal.prototype.onCloseClick = function () {
    this.close();
  };

  Modal.prototype.onTriggerClick = function () {
    this.open();
  };

  Modal.prototype.onResize = function () {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  };

  Modal.prototype.addEventListeners = function () {
    this.overlay.addEventListener('click', this.onOverlayClick);
    this.closeBtn.addEventListener('click', this.onCloseClick);
    this.trigger.addEventListener('click', this.onTriggerClick);
    window.addEventListener('resize', debounce(this.onResize));
  };

  window.Modal = Modal;
})();

(function () {
  var items = document.querySelectorAll('.search');
  var close = document.querySelectorAll('.search + .search-close');
  items.forEach(function (item) {
    item.addEventListener('focus', function () {
      item.parentNode.parentNode.classList.add('js-focus');
    });
  });
  items.forEach(function (item) {
    item.addEventListener('blur', function () {
      if (item.value.split(' ').join('') === '') {
        item.value = '';
      }

      if (item.value !== '' && !item.classList.contains('js-inputed')) {
        item.classList.add('js-inputed');
      }

      if (item.value === '' && item.classList.contains('js-inputed')) {
        item.classList.remove('js-inputed');
      }
    });
  });
  close.forEach(function (item) {
    item.addEventListener('click', function () {
      var search = item.previousElementSibling;
      search.value = '';

      if (search.classList.contains('js-inputed')) {
        search.classList.remove('js-inputed');
      }
    });
  });
})();

(function () {
  var form = document.querySelector('.cloud-status__installation-form');

  if (!form) {
    return;
  }

  var company = form.querySelector('.cloud-status__installation-company input');
  var fileInputBlock = form.querySelectorAll('.cloud-status__installation-file');
  var fileInput = form.querySelector('.input-file__input');
  var fileClear = form.querySelector('.file-load__clear');
  var sendBtn = form.querySelector('.cloud-status__installation-form-send');

  var isFormFilled = function isFormFilled() {
    var filled = true;

    if (fileInput.value === '' || company.value === '') {
      filled = false;
    } else {
      filled = true;
    }

    return filled;
  };

  var checkInputs = function checkInputs() {
    if (isFormFilled()) {
      sendBtn.hasAttribute('disabled') && sendBtn.removeAttribute('disabled');
    }

    if (!isFormFilled()) {
      !sendBtn.hasAttribute('disabled') && sendBtn.setAttribute('disabled', '');
    }
  };

  var onFileClear = function onFileClear() {
    if (!sendBtn.hasAttribute('disabled')) {
      sendBtn.setAttribute('disabled', '');
    }
  };

  window.onInstallationFileDrop = function () {
    checkInputs();
  };

  fileInput.addEventListener('change', window.onInstallationFileDrop);
  fileClear.addEventListener('click', onFileClear);
  company.addEventListener('input', checkInputs);
})();

(function () {
  $(window).load(function () {
    var swiper = new Swiper('.menu-pa__container', {
      freeMode: true,
      slidesPerView: 'auto',
      breakpoints: {
        1280: {
          freeMode: true,
          slidesPerView: 'auto',
          allowTouchMove: false
        }
      }
    });
  });
})();