import { onStartFavPag } from "./pagination-fav";

const filterList = document.querySelector(".filters-fav");

const createMarkUp = () => {
	const category = localStorage.getItem("filterFav");
	let catActive = "";
	let allActive = "";
	category == "all" ? (allActive = "fav-active") : (allActive = "");
	const data = JSON.parse(localStorage.getItem("favorites"));
	const filtersAll = [];
	data.map(({ category }) => filtersAll.push(category));

	const filtersUnique = filtersAll.filter(
		(filter, i, array) => array.indexOf(filter) === i
	);
	filtersUnique.sort();
	const markUp = filtersUnique
		.map((item) => {
			if (item == category) catActive = "fav-active";
			else catActive = "";
			return `<li>
				    <button class="filterFav-btn ${catActive}" type="button" id=${item}>${item}</button>
			    </li>`;
		})
		.join("");
	return (
		`<li><button class="filterFav-btn ${allActive}" type="button" id="all">All categories</button></li>` +
		markUp
	);
};

export const createFilters = () => {
	filterList.innerHTML = "";
	filterList.insertAdjacentHTML("beforeend", createMarkUp());
};

createFilters();

const onStartPage = () => {
	let page = JSON.parse(localStorage.getItem("currentPageFav")) ?? 1;
	const data = JSON.parse(localStorage.getItem("favorites"));
	const category = localStorage.getItem("filterFav") ?? "all";
	let filtered;
	if (category == "all") {
		filtered = data;
	} else {
		filtered = data.filter((item) => item.category == category);
	}
	const totalPages = Math.ceil(filtered.length / 12);
	onStartFavPag(page, totalPages);
};

onStartPage();

const handleFilters = (e) => {
	if (e.target.nodeName !== "BUTTON") return;
	const oldActive = document.querySelector(".fav-active");
	if (oldActive) oldActive.classList.remove("fav-active");
	e.target.classList.add("fav-active");
	const filterFav = e.target.id;
	let page = 1;
	localStorage.setItem("currentPageFav", page);
	const data = JSON.parse(localStorage.getItem("favorites"));
	let filtered;
	localStorage.setItem("filterFav", filterFav);
	if (e.target.id == "all") {
		filtered = data;
	} else {
		filtered = data.filter((item) => item.category == filterFav);
	}
	const totalPages = Math.ceil(filtered.length / 12);
	onStartFavPag(page, totalPages);
	console.log(e.target.id);
};

filterList.addEventListener("click", handleFilters);

let isDragging = false;
let startX;
let scrollLeft;
filterList.addEventListener("mousemove", onDrag);
filterList.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);

function dragStop() {
	isDragging = false;
}

function dragStart(e) {
	if (e.target.nodeName == "BUTTON") return;
	isDragging = true;
	startX = e.pageX - filterList.offsetLeft;
	scrollLeft = filterList.scrollLeft;
}

function onDrag(e) {
	if (!isDragging) return;
	// filterList.scrollLeft -= e.movementX;
	e.preventDefault();
	const x = e.pageX - filterList.offsetLeft;
	const walk = (x - startX) * 3; //scroll-fast
	filterList.scrollLeft = scrollLeft - walk;
}
