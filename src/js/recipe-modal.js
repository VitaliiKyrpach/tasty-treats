import axios from "axios";
import createStars from "./createStars";
import { addToFavorites } from "./addToFavorites";
import { openRmodal } from "./raiting-modal";

const modal = document.querySelector(".backdrop");
export const openModal = async (recipeId) => {
	document.addEventListener("keydown", handleEscape);
	modal.innerHTML = "";
	const data = await getData(recipeId);
	modal.insertAdjacentHTML("beforeend", createMarkUp(data));
	modal.classList.remove("is-hidden");
	document.body.classList.add("no-scroll");
	const addBtn = document.querySelector(".btn-add");
	addBtn.addEventListener("click", handleAddBtn);
	modal.addEventListener("click", handleCloseModal);
	const btnRating = document.querySelector(".btn-rating");
	btnRating.addEventListener("click", handleRatBtn);
	const tagList = document.querySelector(".tag-list");
	handleTag(tagList);
};

const handleEscape = (e) => {
	if (e.key == "Escape") {
		closeModal();
	}
};

const getData = async (id) => {
	try {
		const fetch = await axios(`/recipes/${id}`);
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
	if (screen.width < 768) {
		return `
    <div class="recipe-modal">
        <button class="btn-close" type="button">
            <svg class="close-svg">
                <use href="assets/sprite.svg#icon-reset"></use>
            </svg>
        </button>
		<div class='content'>
			<iframe
            	class="video"
            	src=${url}
            	title="YouTube video player"
            	frameborder="0"   
        	></iframe>
			<h2 class="title">${title}</h2>
            <div class="modal-score">
                <p class="modal-score-text">${rating}</p>
                <div class="stars">
                    ${stars}
                </div>
                <p class="modal-score-text min">${time} min</p>
            </div>
			<ul class="ing-list">
            	${ingredientsMarkUp}
        	</ul>
			<ul class="tag-list">
                ${tagsMarkUp}
            </ul>
        	<p class="text">
            	${description}
        	</p>
		</div>
        <div class="buttons">
            <button class="btn-add" type="button" id=${_id}>
                ${addedToFav} favorite
            </button>
            <button class="btn-rating" type="button" id=${_id}>
                Give a rating
            </button>
        </div>
    </div>`;
	} else {
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
            <div class="modal-score">
                <p class="modal-score-text">${rating}</p>
                <div class="stars">
                    ${stars}
                </div>
                <p class="modal-score-text min">${time} min</p>
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
            <button class="btn-rating" type="button" id=${_id}>
                Give a rating
            </button>
        </div>
    </div>`;
	}
};

const handleAddBtn = async (e) => {
	await addToFavorites(e.target);
	const added = JSON.parse(localStorage.getItem("favorites")) ?? [];
	added.find((item) => item._id == e.target.id)
		? (e.target.textContent = "Remove from favorite")
		: (e.target.textContent = "Add to favorite");
};

const handleRatBtn = (e) => {
	openRmodal(e.target);
};

const closeModal = () => {
	modal.innerHTML = "";
	modal.classList.add("is-hidden");
	document.body.classList.remove("no-scroll");
	document.removeEventListener("keydown", handleEscape);
};

const handleCloseModal = (e) => {
	if (
		e.target.className == "btn-close" ||
		e.target.className == "backdrop"
	) {
		closeModal();
	}
};

const handleTag = (tagList) => {
	if (screen.width > 767) {
		let isDragging = false;
		let startX;
		let scrollLeft;
		tagList.addEventListener("mousemove", onDrag);
		tagList.addEventListener("mousedown", dragStart);
		document.addEventListener("mouseup", dragStop);

		function dragStop() {
			isDragging = false;
		}

		function dragStart(e) {
			if (e.target.nodeName == "BUTTON") return;
			isDragging = true;
			startX = e.pageX - tagList.offsetLeft;
			scrollLeft = tagList.scrollLeft;
		}

		function onDrag(e) {
			if (!isDragging) return;
			e.preventDefault();
			const x = e.pageX - tagList.offsetLeft;
			const walk = (x - startX) * 3;
			tagList.scrollLeft = scrollLeft - walk;
		}
	}
};
