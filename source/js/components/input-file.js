(function() {
  const fileDropArea = document.querySelectorAll('.input-file__label');

  function makeFileLoad(fileDropArea) {
    const fileInput = fileDropArea.querySelector('input');
    const fileClear = fileDropArea.parentNode.querySelector('.file-load__clear');
    // Сбрасываем стандартные события при перетаскивании файла

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      fileDropArea.addEventListener(eventName, preventDefaults, false)
    });

    function preventDefaults (e) {
      e.preventDefault();
      e.stopPropagation();
    };

    // Добавляем стили при перетаскивании файла над нужной областью

    ['dragenter', 'dragover'].forEach(eventName => {
      fileDropArea.addEventListener(eventName, highlight, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
      fileDropArea.addEventListener(eventName, unhighlight, false)
    })

    function highlight(e) {
      fileDropArea.classList.add('highlight');
    };

    function unhighlight(e) {
      fileDropArea.classList.remove('highlight');
    };

    //

    fileDropArea.addEventListener('drop', handleDrop, false)

    function handleDrop(e) {
      let dt = e.dataTransfer
      let files = dt.files

      if (fileInput.files && fileInput.files[0]) {
        fileInput.value = '';

        if(!/safari/i.test(navigator.userAgent)){
          fileInput.type = '';
          fileInput.type = 'file';
        }
      }

      fileInput.files = files;
      onFileChange();

    };

    const onFileChange = () => {
      readUrl(fileInput);
    }

    const readUrl = (input) => {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          fileDropArea.parentNode.classList.add('loaded');
          fileDropArea
            .parentNode
            .querySelector('.file-load__name')
            .textContent = input.files[0].name;

          window.onInstallationFileDrop && window.onInstallationFileDrop();
          window.onPassportFileDrop && window.onPassportFileDrop();
        }

        reader.readAsDataURL(input.files[0]);
      }
    }

    function onClear() {
      fileDropArea.parentNode.classList.remove('loaded');

      fileInput.value = '';

      if(!/safari/i.test(navigator.userAgent)){
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

  fileDropArea.forEach(function(item) {
    makeFileLoad(item);
  });
})();
