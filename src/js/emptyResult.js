const emptyResult = (text) => {
	return `<div class="error">
    <svg class="error-svg">
        <use href="assets/sprite.svg#icon-favorites"></use>
    </svg>
    <p class="error-text">
        ${text}
    </p>
</div>`;
};
export default emptyResult;
