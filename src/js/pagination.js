import { getRecipes } from "./recipes";
const pagination = document.querySelector(".pagination-recipe");
const dotsPrev = document.querySelector(".dots-prev");
const dotsNext = document.querySelector(".dots-next");
const numbers = document.querySelector(".numbers");

let totalPages = localStorage.getItem("totalPages");

let page = JSON.parse(localStorage.getItem("currentPage")) ?? 1;

const hendleDots = (page, totalPages) => {
	if (page > 2 && totalPages > 3) dotsPrev.classList.remove("hidden");
	else dotsPrev.classList.add("hidden");
	if (totalPages > 3 && page < totalPages - 1)
		dotsNext.classList.remove("hidden");
	else dotsNext.classList.add("hidden");
};

const createMarkUp = (page, totalPages) => {
	let numRow = "";
	let currentClass = "";

	if (page == 1 && totalPages < 4) {
		for (let i = 1; i <= totalPages; i++) {
			if (page == i) currentClass = "current";
			else {
				currentClass = "";
			}
			numRow += `<button
			    class="pag-page num ${currentClass}"
			    type="button"
			    data-type="count"
			>
			    ${i}
			</button>`;
		}
	}
	if (page == 1 && totalPages > 3) {
		for (let i = 1; i < 4; i++) {
			if (page == i) currentClass = "current";
			else {
				currentClass = "";
			}
			numRow += `<button
			    class="pag-page num ${currentClass}"
			    type="button"
			    data-type="count"
			>
			    ${i}
			</button>`;
		}
	}
	if (page > 1 && page < totalPages) {
		let beforePage = +page - 1;
		let afterPage = +page + 1;
		for (let i = beforePage; i <= afterPage; i++) {
			if (page == i) currentClass = "current";
			else {
				currentClass = "";
			}
			numRow += `<button
			    class="pag-page num ${currentClass}"
			    type="button"
			    data-type="count"
			>
			    ${i}
			</button>`;
		}
	}
	if (page == totalPages && totalPages < 3) {
		let beforePage = +totalPages - 1;
		for (let i = beforePage; i <= totalPages; i++) {
			if (page == i) currentClass = "current";
			else {
				currentClass = "";
			}
			numRow += `<button
			    class="pag-page num ${currentClass}"
			    type="button"
			    data-type="count"
			>
			    ${i}
			</button>`;
		}
	}
	if (page == totalPages && totalPages > 2) {
		let beforePage = +totalPages - 2;
		for (let i = beforePage; i <= totalPages; i++) {
			if (page == i) currentClass = "current";
			else {
				currentClass = "";
			}
			numRow += `<button
			    class="pag-page num ${currentClass}"
			    type="button"
			    data-type="count"
			>
			    ${i}
			</button>`;
		}
	}
	numbers.innerHTML = numRow;
};

export const onStartPag = async () => {
	const data = await getRecipes(page);
	localStorage.setItem("totalPages", data.data.totalPages);
	if (data.data.totalPages < 2) {
		pagination.classList.add("is-hidden");
	} else {
		pagination.classList.remove("is-hidden");
		createMarkUp(page, data.data.totalPages);
	}
	hendleDots(page, data.data.totalPages);
};

onStartPag();

const onClick = (e) => {
	totalPages = localStorage.getItem("totalPages");

	if (
		e.target.nodeName !== "BUTTON" ||
		e.target.dataset.type == "dots" ||
		e.target.outerText == page ||
		(e.target.dataset.type == "next" && page == totalPages) ||
		(e.target.dataset.type == "last" && page == totalPages) ||
		(e.target.dataset.type == "first" && page == 1) ||
		(e.target.dataset.type == "prev" && page == 1)
	)
		return;
	if (e.target.dataset.type == "count") {
		page = Number(e.target.outerText);
	}
	if (e.target.dataset.type == "next" && page !== totalPages) page++;
	if (e.target.dataset.type == "prev" && page !== 1) page--;
	if (e.target.dataset.type == "first") page = 1;
	if (e.target.dataset.type == "last") page = totalPages;

	createMarkUp(page, totalPages);

	hendleDots(page, totalPages);
	// if (page >= totalPages - 1 ) dotsNext.classList.add("hidden");
	// else dotsNext.classList.remove("hidden");
	getRecipes(page);
	localStorage.setItem("currentPage", page);
};

pagination.addEventListener("click", onClick);
