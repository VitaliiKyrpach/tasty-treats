const loader = document.querySelector(".loader-wrapper");
window.onload = function () {
	window.setTimeout(function () {
		loader.classList.add("is-hidden");
	}, 600);
};
