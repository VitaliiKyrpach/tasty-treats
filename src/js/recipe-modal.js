import axios from "axios";
const recModalOpen = document.querySelector(".recipe-list");
const modal = document.querySelector(".backdrop");
const openModal = async (e) => {
	if (e.target.nodeName !== "BUTTON") return;
	const recipeId = e.target.id;
	const data = await getData(recipeId);
	modal.insertAdjacentHTML("beforeend", createMarkUp(data));
	modal.classList.remove("is-hidden");
	document.body.classList.add("no-scroll");
	const recModalClose = document.querySelector(".btn-close");
	recModalClose.addEventListener("click", () =>
		closeModal(recModalClose)
	);
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
	console.log(data);
	const {
		ingredients,
		youtube,
		time,
		rating,
		title,
		description,
		tags,
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
                    <svg class="star-svg active">
                        <use href="assets/sprite.svg#icon-star"></use>
                    </svg>
                    <svg class="star-svg active">
                        <use href="assets/sprite.svg#icon-star"></use>
                    </svg>
                    <svg class="star-svg active">
                        <use href="assets/sprite.svg#icon-star"></use>
                    </svg>
                    <svg class="star-svg active">
                        <use href="assets/sprite.svg#icon-star"></use>
                    </svg>
                    <svg class="star-svg">
                        <use href="assets/sprite.svg#icon-star"></use>
                    </svg>
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
            <button class="btn-add" type="button">
                Add to favorite
            </button>
            <button class="btn-rating" type="button">
                Give a rating
            </button>
        </div>
    </div>`;
};
recModalOpen.addEventListener("click", openModal);

const closeModal = (btn) => {
	modal.innerHTML = "";
	modal.classList.add("is-hidden");
	document.body.classList.remove("no-scroll");
	btn.removeEventListener("click", closeModal);
};
