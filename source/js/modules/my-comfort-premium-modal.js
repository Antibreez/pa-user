(function() {
  const $modalBtn = document.querySelector('.my-comfort-premium-modal-trigger');
  const $modal = document.getElementById('my-comfort-premium-modal');

  if (!$modalBtn || !$modal) {
    return;
  }

  const modal = new Modal($modalBtn, $modal);
})();
