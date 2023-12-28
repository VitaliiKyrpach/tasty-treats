const swiper = new Swiper(".swiper-container", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 200,

  pagination: {
    el: ".pagination",
    bulletClass: "bullet",
    bulletActiveClass: "bullet-active",
    clickable: true,
  },
  grabCursor: true,
  autoplay: {
    delay: 5000,
  },
  speed: 1000,
});
