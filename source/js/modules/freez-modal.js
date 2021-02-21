(function() {
  const $modalBtn = document.querySelectorAll('.device-actions__item-link--freez');
  const $modal = document.getElementById('freez-modal');

  if (!$modalBtn[0] || !$modal) {
    return;
  }

  $modalBtn.forEach(function(item) {
    new Modal(item, $modal);
  });
})();
