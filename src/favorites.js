import axios from "axios";
import "./favorites.html";
import "./favorites.scss";

import "./js/themes";
import "./js/cart-modal";
import "./js/mobile-menu";
import "./js/filterFav";
import "./js/pagination-fav";
import "./js/recipes-fav";
import "./js/raiting-modal";
axios.defaults.baseURL =
	"https://tasty-treats-backend.p.goit.global/api";

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
