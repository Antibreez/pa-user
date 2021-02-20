(function() {
  const contractBtn = document.querySelector('.contract-modal-trigger');
  const modalContract = document.querySelector('.contract-modal');

  if (!contractBtn || !modalContract) {
    return;
  }

  const modal = new Modal(contractBtn, modalContract);

  $('.contract-modal__toggle-btn').on('click', function() {
    $(this).next().slideToggle();
    $(this).children('.info-block__toggle-icon').toggleClass('opened');
  })
})();
