import { onStartPag } from "./pagination";
import debounce from "lodash.debounce";
const timeList = document.querySelector(".time-list");
const areaList = document.querySelector(".area-list");
const ingredientsList = document.querySelector(".ingredients-list");
const catsList = document.querySelector(".cats-list");
const catsAll = document.querySelector(".cats-all");
const resFilterBtn = document.querySelector(".reset-filter-btn");
const searchInput = document.querySelector("#filterSearch");

const timeLabel = document.querySelector(".pick-time");
const areaLabel = document.querySelector(".pick-area");
const ingLabel = document.querySelector(".pick-ingredient");

const LSparams = JSON.parse(localStorage.getItem("params"));
const params = {
	title: "",
	category: "",
	time: "",
	area: "",
	ingredient: "",
};
searchInput.value = LSparams && LSparams.value ? LSparams.title : "";

areaLabel.textContent =
	LSparams && LSparams.area ? LSparams.area : ".....";
timeLabel.textContent =
	LSparams && LSparams.time ? LSparams.time : ".....";
ingLabel.textContent =
	LSparams && LSparams.ingredient ? LSparams.ingredient : ".....";

const handlePick = (e) => {
	if (e.target.nodeName !== "BUTTON") return;
	if (e.target.dataset.option == "option-area") {
		areaLabel.textContent = e.target.textContent;
		params.area = e.target.textContent;
	}
	if (e.target.dataset.option == "option-time") {
		timeLabel.textContent = e.target.textContent;
		params.time = String(Number.parseInt(e.target.textContent));
	}
	if (e.target.dataset.option == "option-ingredient") {
		ingLabel.textContent = e.target.textContent;
		params.ingredient = e.target.id;
	}
	if (e.target.dataset.option == "option-category") {
		const oldActive = document.querySelector(".cat-active");
		if (oldActive) oldActive.classList.remove("cat-active");
		e.target.classList.add("cat-active");
		params.category = e.target.textContent;
	}
	localStorage.setItem("params", JSON.stringify(params));
	onStartPag();
};

const resetCats = () => {
	const oldActive = document.querySelector(".cat-active");
	if (oldActive) oldActive.classList.remove("cat-active");
	params.category = "";
	localStorage.setItem("params", JSON.stringify(params));
	onStartPag();
};
const resetFilter = () => {
	params.title = "";
	params.time = "";
	params.area = "";
	params.ingredient = "";
	areaLabel.textContent = ".....";
	timeLabel.textContent = ".....";
	ingLabel.textContent = ".....";
	localStorage.setItem("params", JSON.stringify(params));
	onStartPag();
};
const handleChange = (e) => {
	console.log(e.target.value);
	params.title = e.target.value.trim();
	localStorage.setItem("params", JSON.stringify(params));
	onStartPag();
};

timeList.addEventListener("click", handlePick);
areaList.addEventListener("click", handlePick);
ingredientsList.addEventListener("click", handlePick);
catsList.addEventListener("click", handlePick);
catsAll.addEventListener("click", resetCats);
resFilterBtn.addEventListener("click", resetFilter);
searchInput.addEventListener("input", debounce(handleChange, 300));
