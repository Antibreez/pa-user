(function() {
  const $modalBtn = document.querySelectorAll('.device-actions__item-link--delete');
  const $modal = document.getElementById('not-use-modal');
  const $body = document.querySelector('body');

  if (!$modalBtn[0] || !$modal) {
    return;
  }

  const noBtn = document.querySelector('.not-use-modal__btn--no');

  $modalBtn.forEach(function(item) {
    new Modal(item, $modal);
  });

  const onNoBtnClick = function() {
    $modal.classList.remove('js-show');
    $body.classList.remove('js__body-no-scroll');
  }

  noBtn.addEventListener('click', onNoBtnClick);
})();
