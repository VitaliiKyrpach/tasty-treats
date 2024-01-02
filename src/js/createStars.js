const createStars = (rating) => {
	let starsMarkUp = "";
	const number = Math.floor(rating);
	let achivedStar = "";
	for (let i = 1; i < 6; i++) {
		if (i <= number) achivedStar = "active";
		else {
			achivedStar = "";
		}
		starsMarkUp += `<svg class="star-svg ${achivedStar}">
        <use
            href="assets/sprite.svg#icon-star"
        ></use>
    </svg>`;
	}
	return starsMarkUp;
};

export default createStars;
