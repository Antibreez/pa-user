(function() {
  const form = document.querySelector('.cloud-status__installation-form');

  if (!form) {
    return;
  }

  const company = form.querySelector('.cloud-status__installation-company input');

  const fileInputBlock = form.querySelectorAll('.cloud-status__installation-file');
  const fileInput = form.querySelector('.input-file__input');
  const fileClear = form.querySelector('.file-load__clear');

  const sendBtn = form.querySelector('.cloud-status__installation-form-send');

  const isFormFilled = function() {
    let filled = true;

    if (fileInput.value === '' || company.value === '') {
      filled = false;
    } else {
      filled = true;
    }

    return filled;
  }

  const checkInputs = function() {
    if (isFormFilled()) {
      sendBtn.hasAttribute('disabled')
      && sendBtn.removeAttribute('disabled');
    }

    if (!isFormFilled()) {
      !sendBtn.hasAttribute('disabled')
      && sendBtn.setAttribute('disabled', '');
    }
  }

  const onFileClear = function() {
    if (!sendBtn.hasAttribute('disabled')) {
      sendBtn.setAttribute('disabled', '');
    }
  }

  window.onInstallationFileDrop = function() {
    checkInputs();
  };

  fileInput.addEventListener('change', window.onInstallationFileDrop);
  fileClear.addEventListener('click', onFileClear);
  company.addEventListener('input', checkInputs);
})();
