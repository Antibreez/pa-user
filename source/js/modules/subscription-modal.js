(function() {
  const subscriptionBtn = document.querySelector('.subscription-modal-trigger');
  const modalSubscription = document.querySelector('.subscription-modal');

  $('.subscription-modal__toggle-item-btn').on('click', function() {
    $(this).next().slideToggle();
    $(this).children('.info-block__toggle-icon').toggleClass('opened');
  })

  if (!subscriptionBtn || !modalSubscription) {
    return;
  }

  const modal = new Modal(subscriptionBtn, modalSubscription);
})();
