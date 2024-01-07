import axios from "axios";
import createStars from "./createStars";
import { addToFavorites } from "./addToFavorites";

const modal = document.querySelector(".backdrop");
export const openModal = async (recipeId) => {
	// console.log(recipeId);
	modal.innerHTML = "";
	const data = await getData(recipeId);
	// console.log(data);
	modal.insertAdjacentHTML("beforeend", createMarkUp(data));
	modal.classList.remove("is-hidden");
	document.body.classList.add("no-scroll");
	const addBtn = document.querySelector(".btn-add");
	addBtn.addEventListener("click", handleAddBtn);
	const recModalClose = document.querySelector(".btn-close");
	recModalClose.addEventListener("click", () =>
		closeModal(recModalClose, addBtn)
	);
};

const getData = async (id) => {
	try {
		const fetch = await axios(`/recipes/${id}`);
		// console.log(fetch);
		return fetch;
	} catch (err) {
		console.log(err);
	}
};

const createMarkUp = ({ data }) => {
	const {
		ingredients,
		youtube,
		time,
		rating,
		title,
		description,
		tags,
		_id,
	} = data;
	const url = youtube.replace("watch?v=", "embed/");
	const tagsMarkUp =
		tags.length < 2
			? ""
			: tags.map((tag) => `<li class="item">#${tag}</li>`).join("");

	const ingredientsMarkUp = ingredients
		.map(
			({ name, measure }) => `<li class="item">
    <p>${name}</p>
    <p class="count">${measure}</p>
</li>`
		)
		.join("");
	const added = JSON.parse(localStorage.getItem("favorites")) ?? [];
	let addedToFav = "";
	added.find((item) => item._id == _id)
		? (addedToFav = "Remove from")
		: (addedToFav = "Add to");
	const stars = createStars(rating);
	return `
    <div class="recipe-modal">
        <button class="btn-close" type="button">
            <svg class="close-svg">
                <use href="assets/sprite.svg#icon-reset"></use>
            </svg>
        </button>
        <h2 class="title">${title}</h2>
        <iframe
            class="video"
            src=${url}
            title="YouTube video player"
            frameborder="0"
            
        ></iframe>
        <div class="tag-info">
            <ul class="tag-list">
                ${tagsMarkUp}
            </ul>
            <div class="score">
                <p class="modal-score-text">${rating}</p>
                <div class="stars">
                    ${stars}
                </div>
                <p class="modal-score-text">${time} min</p>
            </div>
        </div>
        <ul class="ing-list">
            ${ingredientsMarkUp}
        </ul>
        <p class="text">
            ${description}
        </p>
        <div class="buttons">
            <button class="btn-add" type="button" id=${_id}>
                ${addedToFav} favorite
            </button>
            <button class="btn-rating" type="button">
                Give a rating
            </button>
        </div>
    </div>`;
};

const handleAddBtn = async (e) => {
	// console.log(e.target.id);
	await addToFavorites(e.target);
	const added = JSON.parse(localStorage.getItem("favorites")) ?? [];
	// console.log(added);
	added.find((item) => item._id == e.target.id)
		? (e.target.textContent = "Remove from favorite")
		: (e.target.textContent = "Add to favorite");
};

const closeModal = (close, add) => {
	modal.innerHTML = "";
	modal.classList.add("is-hidden");
	document.body.classList.remove("no-scroll");
	close.removeEventListener("click", closeModal);
	add.removeEventListener("click", handleAddBtn);
};
