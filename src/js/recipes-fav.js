import emptyResult from "./emptyResult";
import { openModal } from "./recipe-modal";
import { createFilters } from "./filterFav";
import createStars from "./createStars";
import { onStartFavPag } from "./pagination-fav";
const recipeListFav = document.querySelector(".recipe-list-fav");

export const createCards = (page, totalPages) => {
	const data = JSON.parse(localStorage.getItem("favorites"));
	const category = localStorage.getItem("filterFav") ?? "all";
	let filtered;
	if (category == "all") {
		filtered = data;
	} else {
		filtered = data.filter((item) => item.category == category);
	}
	recipeListFav.innerHTML = "";
	if (totalPages === null) {
		const text =
			"It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.";
		recipeListFav.insertAdjacentHTML("beforeend", emptyResult(text));
	}
	recipeListFav.insertAdjacentHTML(
		"beforeend",
		createMarkUpFav(page, filtered, totalPages)
	);
};

const createMarkUpFav = (page, results, totalPages) => {
	const added = JSON.parse(localStorage.getItem("favorites")) ?? [];
	let markUp = "";
	let addedClass = "";
	const start = (page - 1) * 12;
	let end;
	page == totalPages ? (end = results.length) : (end = page * 12);
	console.log(page, results, totalPages);
	for (let i = start; i < end; i++) {
		const stars = createStars(results[i].rating);
		added.find((item) => item._id == results[i]._id)
			? (addedClass = "added")
			: (addedClass = "");
		markUp += `<li class="recipe-card">
				<button class="heart" >
					<svg class="heart-svg ${addedClass}" id=${results[i]._id} data-type="heart-btn">
					<use
						href="assets/sprite.svg#icon-heart" class='heart-use'
					></use>
						</svg>    
				</button>
				<img class="recipe-img" src=${results[i].preview} alt="" />
				<h3 class="title">${results[i].title}</h3>
				<p class="text">
					${results[i].description}
				</p>
				<div class="info">
					<div class="score">
						<p class="score-text">${results[i].rating}</p>
						<div class="stars">
							${stars}
						</div>
					</div>
					<button class="recipe-btn" type="button" id=${results[i]._id} data-type="recipe-btn">
						See recipe
					</button>
				</div>
			</li>`;
	}
	return markUp;
};

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
	const page = localStorage.getItem("currentPageFav");
	const totalPages = Math.ceil(newArr.length / 12);
	onStartFavPag(page, totalPages);
	createFilters();
};

recipeListFav.addEventListener("click", handleRecipeFav);
