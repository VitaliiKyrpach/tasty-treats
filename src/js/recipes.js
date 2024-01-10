import axios from "axios";
import createStars from "./createStars";
import emptyResult from "./emptyResult";
const recipeList = document.querySelector(".recipe-list");

const InitParams = {
	title: "",
	category: "",
	time: "",
	area: "",
	ingredient: "",
};

const getData = async (page = 1) => {
	try {
		let limit;
		if (screen.width < 768) limit = 6;
		if (screen.width > 767 && screen.width < 1280) limit = 8;
		if (screen.width > 1279) limit = 9;
		const LSparams =
			JSON.parse(localStorage.getItem("params")) ?? InitParams;
		const params = { ...LSparams, page, limit };
		const fetch = await axios("/recipes", {
			params,
		});
		return fetch;
	} catch (err) {
		console.log(err);
	}
};

export const createMarkUp = (results) => {
	const added = JSON.parse(localStorage.getItem("favorites")) ?? [];
	let addedClass = "";
	return results
		.map(({ rating, title, description, preview, _id }) => {
			const stars = createStars(rating);
			added.find((item) => item._id == _id)
				? (addedClass = "added")
				: (addedClass = "");

			return `<li class="recipe-card">
            <button class="heart" >
                <svg class="heart-svg ${addedClass}" id=${_id} data-type="heart-btn">
                <use
                    href="assets/sprite.svg#icon-heart" class='heart-use'
                ></use>
                    </svg>    
            </button>
            <img class="recipe-img" src=${preview} alt="" />
            <h3 class="title">${title}</h3>
            <p class="text">
                ${description}
            </p>
            <div class="info">
                <div class="score">
                    <p class="score-text">${rating}</p>
                    <div class="stars">
                        ${stars}
                    </div>
                </div>
                <button class="recipe-btn" type="button" id=${_id} data-type="recipe-btn">
                    See recipe
                </button>
            </div>
        </li>`;
		})
		.join("");
};

export const getRecipes = async (page) => {
	const data = await getData(page);
	recipeList.innerHTML = "";
	if (data.data.totalPages === null) {
		const text =
			"Sorry, there are no recipes found according to your requirements. Sorry, there are no recipes found according to your requirements. Please try changing the filters";
		recipeList.insertAdjacentHTML("beforeend", emptyResult(text));
	}
	recipeList.insertAdjacentHTML(
		"beforeend",
		createMarkUp(data.data.results)
	);
	return data;
};
