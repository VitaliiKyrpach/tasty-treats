import "./index.html";
import "./main.scss";

import "./js/loader";
import "./js/themes";
import "./js/cart-modal";
import "./js/mobile-menu";
import "./js/swiper";
import "./js/events";
import "./js/categories";
import "./js/popular";
import "./js/recipes";
import "./js/recipe-modal";
import "./js/raiting-modal";
import "./js/pagination";
import "./js/filters";
import "./js/filterBar";
import "./js/handleRecipe";

import { Notify } from "notiflix/build/notiflix-notify-aio";
Notify.init({
	position: "center-top",
	borderRadius: "10px",
	fontSize: "18px",
	width: "450px",
	success: {
		background: "#6ccf7e",
	},
	failure: {
		background: "#f27c74",
	},
});
