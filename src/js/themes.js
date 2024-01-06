document.addEventListener("DOMContentLoaded", () => {
	init();
});
const toggleBtn = document.querySelector(".theme-wrapper");

function init() {
	if (localStorage.getItem("theme")) {
		document.documentElement.setAttribute("theme", "dark");
		toggleBtn.classList.add("dark");
		toggleBtn.firstElementChild.classList.add("dark");
	} else {
		document.documentElement.removeAttribute("theme");
		toggleBtn.classList.remove("dark");
		toggleBtn.firstElementChild.classList.remove("dark");
	}
}

toggleBtn.addEventListener("click", function () {
	if (document.documentElement.hasAttribute("theme")) {
		document.documentElement.removeAttribute("theme");
		toggleBtn.classList.remove("dark");
		toggleBtn.firstElementChild.classList.remove("dark");
		localStorage.removeItem("theme");
	} else {
		document.documentElement.setAttribute("theme", "dark");
		toggleBtn.classList.add("dark");
		toggleBtn.firstElementChild.classList.add("dark");
		localStorage.setItem("theme", 1);
	}
});
