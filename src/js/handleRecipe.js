import { openModal } from "./recipe-modal";
import { addToFavorites } from "./addToFavorites";
const recipes = document.querySelector(".recipe-list");

const handleRecipe = (e) => {
	const recipeId = e.target.id;
	if (
		e.target.dataset.type == "recipe-btn" ||
		e.target.dataset.type == "popular-card"
	)
		openModal(recipeId);
	if (e.target.dataset.type == "heart-btn") addToFavorites(e.target);
};

recipes.addEventListener("click", handleRecipe);
