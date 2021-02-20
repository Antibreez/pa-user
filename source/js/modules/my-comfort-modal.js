(function() {
  const $modalBtn = document.querySelector('.my-comfort-modal-trigger');
  const $modal = document.getElementById('my-comfort-modal');

  if (!$modalBtn || !$modal) {
    return;
  }

  const modal = new Modal($modalBtn, $modal);
})();
