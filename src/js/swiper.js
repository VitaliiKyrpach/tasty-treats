import Swiper from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const swiper = new Swiper(".swiper-container", {
	modules: [Pagination, Autoplay],
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

export default swiper;
