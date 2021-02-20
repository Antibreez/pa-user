(function() {
  const $modalBtn = document.querySelector('.my-comfort-plus-modal-trigger');
  const $modal = document.getElementById('my-comfort-plus-modal');

  if (!$modalBtn || !$modal) {
    return;
  }

  const modal = new Modal($modalBtn, $modal);
})();
