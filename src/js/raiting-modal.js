import axios from "axios";
const rModal = document.querySelector(".backdrop");

export const openRmodal = (target) => {
	rModal.innerHTML = "";
	rModal.insertAdjacentHTML("beforeend", createMarkUp(target.id));
	rModal.classList.remove("is-hidden");
	document.body.classList.add("no-scroll");
	const raitModalClose = document.querySelector(".btn-close");
	raitModalClose.addEventListener("click", () =>
		closeRaitModal(raitModalClose)
	);
	const starsGroup = document.querySelector(".score-stars");
	starsGroup.addEventListener("click", handleRaiting);
	const send = document.querySelector(".rating-form");
	send.addEventListener("submit", handleRatPost);
};

const createMarkUp = (id, num = 0) => {
	const stars = createModalStars(num);
	console.log(num);
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
	console.log(num);
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

const closeRaitModal = (close) => {
	rModal.innerHTML = "";
	rModal.classList.add("is-hidden");
	document.body.classList.remove("no-scroll");
	close.removeEventListener("click", closeRaitModal);
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
		console.log(`#star${num}`);
		star.checked = true;
		console.dir(e.target.value);
	}
};

const handleRatPost = async(e) => {
	e.preventDefault();
	let rating;
	var star = document.getElementsByName("RatStar");
	for (let i = 0; i < star.length; i++) {
		if (star[i].checked) rating = i;
	}
	const email = e.target.elements.email.value;
	const id =e.target.elements.subBtn.id;
	console.log(e.target.elements.subBtn.id, email, rating);
	const body ={
		rate: rating,
		email: e.target.elements.email.value
	}
	const post = await postRating(id, body);
	console.log(post)
	const raitModalClose = document.querySelector(".btn-close");
	closeRaitModal(raitModalClose)
	// if(post.status == 200) alert('Your rating successfully send. Thank you!');
};

const postRating = async(id, body) =>{
	try{
		const post = await axios.patch(`/recipes/${id}/rating`, body);
		return post;
	}catch(err){
		console.log(err)
	}
}