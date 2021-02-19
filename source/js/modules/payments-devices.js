(function() {
  $('.first-payment__devices-btn').on('click', function() {
    $(this).next().slideToggle();
    $(this)
      .children('.first-payment__device-toggle-icon')
      .toggleClass('opened');
  });
})();
