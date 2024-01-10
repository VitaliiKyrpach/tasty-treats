document.addEventListener("DOMContentLoaded", () => {
	init();
});
const toggleBtns = document.querySelectorAll(".theme-wrapper");

function init() {
	if (localStorage.getItem("theme")) {
		document.documentElement.setAttribute("theme", "dark");
		toggleBtns.forEach((btn) => {
			btn.classList.add("dark");
			btn.firstElementChild.classList.add("dark");
		});
	} else {
		document.documentElement.removeAttribute("theme");
		toggleBtns.forEach((btn) => {
			btn.classList.remove("dark");
			btn.firstElementChild.classList.remove("dark");
		});
	}
}

const handleToggleTheme = () => {
	if (document.documentElement.hasAttribute("theme")) {
		document.documentElement.removeAttribute("theme");
		toggleBtns.forEach((btn) => {
			btn.classList.remove("dark");
			btn.firstElementChild.classList.remove("dark");
		});

		localStorage.removeItem("theme");
	} else {
		document.documentElement.setAttribute("theme", "dark");
		toggleBtns.forEach((btn) => {
			btn.classList.add("dark");
			btn.firstElementChild.classList.add("dark");
		});
		localStorage.setItem("theme", 1);
	}
};

toggleBtns.forEach((btn) =>
	btn.addEventListener("click", handleToggleTheme)
);
