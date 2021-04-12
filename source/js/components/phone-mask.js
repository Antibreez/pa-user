(function() {
  const inputs = document.querySelectorAll('.input-phone');

  if (!inputs[0]) {
    return;
  }

  const im = new Inputmask("+7(999) 999-99-99", {
    onBeforeMask: function(value, opts) {
      return value;
    }
  });

  inputs.forEach(function(item) {
    im.mask(item);
  })
})();
