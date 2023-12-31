import axios from "axios";

const recipeList = document.querySelector(".recipe-list");

const getData = async () => {
	try {
		const fetch = await axios("/recipes");
		console.log(fetch.data.results);
		return fetch;
	} catch (err) {
		console.log(err);
	}
};

const createMarkUp = ({ data: { results } }) => {
	return results
		.map(
			({
				rating,
				title,
				description,
				preview,
				_id,
			}) => `<li class="recipe-card">
            <button class="heart" id=${_id}>
                <svg class="heart-svg">
                <use
                    href="assets/sprite.svg#icon-heart"
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
                        <svg class="star-svg active">
                            <use
                                href="assets/sprite.svg#icon-star"
                            ></use>
                        </svg>
                        <svg class="star-svg active">
                            <use
                                href="assets/sprite.svg#icon-star"
                            ></use>
                        </svg>
                        <svg class="star-svg active">
                            <use
                                href="assets/sprite.svg#icon-star"
                            ></use>
                        </svg>
                        <svg class="star-svg active">
                            <use
                                href="assets/sprite.svg#icon-star"
                            ></use>
                        </svg>
                        <svg class="star-svg">
                            <use
                                href="assets/sprite.svg#icon-star"
                            ></use>
                        </svg>
                    </div>
                </div>
                <button class="recipe-btn" type="button" id=${_id}>
                    See recipe
                </button>
            </div>
        </li>`
		)
		.join("");
};

const getRecipes = async () => {
	const data = await getData();
	recipeList.insertAdjacentHTML("beforeend", createMarkUp(data));
};
getRecipes();
