const filterBar = document.querySelector(".filters-fav");

const createMarkUp = () => {
	const data = JSON.parse(localStorage.getItem("favorites"));
	const filtersAll = [];
	data.map(({ category }) => filtersAll.push(category));

	const filtersUnique = filtersAll.filter(
		(filter, i, array) => array.indexOf(filter) === i
	);
	filtersUnique.sort();
	const markUp = filtersUnique
		.map((item) => {
			return `<li>
				    <button class="filterFav-btn" type="button" id=${item}>${item}</button>
			    </li>`;
		})
		.join("");
	return (
		' <li><button class="filterFav-btn" type="button" id="all cats">All categories</button></li>' +
		markUp
	);
};

export const createFilters = () => {
	filterBar.innerHTML = "";
	filterBar.insertAdjacentHTML("beforeend", createMarkUp());
};

createFilters();
