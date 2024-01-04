import emptyResult from "./emptyResult";
import { createMarkUp } from "./recipes";
import { openModal } from "./recipe-modal";
import { createFilters } from "./filterFav";
const recipeListFav = document.querySelector(".recipe-list-fav");

const createCards = (results) => {
	recipeListFav.innerHTML = "";
	recipeListFav.insertAdjacentHTML(
		"beforeend",
		createMarkUp(results)
	);
};

const onStart = () => {
	const results = JSON.parse(localStorage.getItem("favorites"));
	createCards(results);
};
onStart();

const handleRecipeFav = (e) => {
	const recipeId = e.target.id;
	if (e.target.dataset.type == "recipe-btn") openModal(recipeId);
	if (e.target.dataset.type == "heart-btn")
		deleteFromFavorites(e.target);
};

const deleteFromFavorites = (target) => {
	const favArr = JSON.parse(localStorage.getItem("favorites"));
	const newArr = favArr.filter((item) => item._id !== target.id);
	console.log("deleted");
	localStorage.setItem("favorites", JSON.stringify(newArr));
	target.classList.remove("added");
	createCards(newArr);
	createFilters();
};

recipeListFav.addEventListener("click", handleRecipeFav);
