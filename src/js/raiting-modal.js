import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const rModal = document.querySelector(".backdrop");

export const openRmodal = (target) => {
	document.addEventListener("keydown", handleEscape);
	rModal.innerHTML = "";
	rModal.insertAdjacentHTML("beforeend", createMarkUp(target.id));
	rModal.classList.remove("is-hidden");
	document.body.classList.add("no-scroll");
	rModal.addEventListener("click", handleCloseModal);
	const starsGroup = document.querySelector(".score-stars");
	starsGroup.addEventListener("click", handleRaiting);
	const send = document.querySelector(".rating-form");
	send.addEventListener("submit", handleRatPost);
};

const handleEscape = (e) => {
	if (e.key == "Escape") {
		closeModal();
	}
};

const createMarkUp = (id, num = 0) => {
	const stars = createModalStars(num);
	return `<div class="rating-modal">
    <button class="btn-close" type="button">
        <svg class="close-svg">
            <use href="assets/sprite.svg#icon-reset"></use>
        </svg>
    </button>
    <h2 class="title">Rating</h2>
    <form class='rating-form'>
        <div class="rating-stars">
            <p class="rating-text">0</p>
            <div class="score-stars">
               ${stars}
            </div>
        </div>
        <input class="rating-email" type="email" name="email" placeholder="Enter email" required/>
        <button class="rating-post-btn" type="submit" name="subBtn" id=${id}>Send</button>
    </form>
</div>`;
};

const createModalStars = (num) => {
	let markUp = "";
	let starActive;
	for (let i = 1; i <= 5; i++) {
		i <= num ? (starActive = "active") : (starActive = "");
		markUp += `<input
        class="radio-input"
        type="radio"
        id="star${i}"
        name="RatStar"
        value=${i}
    />
    <label class='star-label' for="star${i}"
        ><svg class="star-svg ${starActive}">
            <use href="assets/sprite.svg#icon-star"></use>
        </svg>
    </label>`;
	}
	return markUp;
};

const closeModal = () => {
	rModal.innerHTML = "";
	rModal.classList.add("is-hidden");
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

const handleRaiting = (e) => {
	if (e.target.nodeName == "INPUT") {
		const num = e.target.value;
		const allStars = document.querySelector(".score-stars");
		allStars.innerHTML = "";
		allStars.insertAdjacentHTML("beforeend", createModalStars(num));
		const text = document.querySelector(".rating-text");
		text.textContent = num;
		const star = document.querySelector(`#star${num}`);
		star.checked = true;
	}
};

const handleRatPost = async (e) => {
	e.preventDefault();
	try {
		let rating;
		var star = document.getElementsByName("RatStar");
		for (let i = 0; i < star.length; i++) {
			if (star[i].checked) rating = i + 1;
		}
		if (!rating) {
			Notify.failure("Please pick a star");
			return;
		} else {
			const email = e.target.elements.email.value;
			const id = e.target.elements.subBtn.id;
			const body = {
				rate: rating,
				email,
			};
			const post = await postRating(id, body);
			if (post.status == 200) {
				Notify.success("Your rating added successfully.Thank you!");
			}
			closeModal();
		}
	} catch (err) {
		console.log(err.message);
		Notify.failure(
			`I'm sorry, something went wrong. ${err.response.data.message}`
		);
	}
};

const postRating = async (id, body) => {
	const post = await axios.patch(`/recipes/${id}/rating`, body);
	return post;
};
