(function() {
  const $modalBtn = document.querySelectorAll('.device-actions__item-link--delete');
  const $modal = document.getElementById('not-use-modal');

  if (!$modalBtn[0] || !$modal) {
    return;
  }

  $modalBtn.forEach(function(item) {
    new Modal(item, $modal);
  });
})();
