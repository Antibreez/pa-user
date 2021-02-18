(() => {
  $(window).load(function () {
    const swiper = new Swiper('.menu-pa__container', {
      freeMode: true,
      slidesPerView: 'auto',
      breakpoints: {

        1280: {
          freeMode: true,
          slidesPerView: 'auto',
          allowTouchMove: false
        }
      }
    });
  });
})();
