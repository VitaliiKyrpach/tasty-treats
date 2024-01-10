import axios from "axios";

const timeList = document.querySelector(".time-list");
const areaList = document.querySelector(".area-list");
const ingredientsList = document.querySelector(".ingredients-list");
const labelArr = document.querySelectorAll(".options-wrapper");

const getData = async (end) => {
	try {
		const fetch = await axios(end, {
			params: {
				limit: 100,
			},
		});
		return fetch;
	} catch (err) {
		console.log(err);
	}
};

const createMarkUp = ({ data }, option) => {
	const filterArr = [];
	data.map(({ name }) => filterArr.push(name));
	filterArr.sort();
	return filterArr
		.map((name) => {
			return data
				.map((item) => {
					if (name == item.name) {
						return `<li>
					<button class="filter-btn" type="button" id=${item._id} data-option=${option}>${name}</button>
				</li>`;
					}
				})
				.join("");
		})
		.join("");
};
const createMarkUpTime = (option) => {
	let timeArr = [];
	for (let i = 5; i < 121; i += 5) {
		timeArr.push(i);
	}
	return timeArr
		.map((time) => {
			return `<li>
            <button class="filter-btn" type="button" data-option=${option}>${time} min</button>
        </li>`;
		})
		.join("");
};

const getFilters = async (list, option, end) => {
	if (list == timeList) {
		list.insertAdjacentHTML("beforeend", createMarkUpTime(option));
	} else {
		const data = await getData(end);
		list.insertAdjacentHTML("beforeend", createMarkUp(data, option));
	}
};

getFilters(areaList, "option-area", "/areas");
getFilters(ingredientsList, "option-ingredient", "/ingredients");
getFilters(timeList, "option-time");

const handleFilters = (e) => {
	console.dir(e.currentTarget.firstElementChild);
	const arrows = document.querySelectorAll(".arrow");
	console.log(arrows);
	if (e.currentTarget.dataset.type == "time") {
		handleArrow("time");
		timeList.classList.toggle("is-hidden");
		areaList.classList.add("is-hidden");
		ingredientsList.classList.add("is-hidden");
	}
	if (e.currentTarget.dataset.type == "area") {
		handleArrow("area");
		areaList.classList.toggle("is-hidden");
		timeList.classList.add("is-hidden");
		ingredientsList.classList.add("is-hidden");
	}
	if (e.currentTarget.dataset.type == "ingredients") {
		handleArrow("ingredients");
		ingredientsList.classList.toggle("is-hidden");
		timeList.classList.add("is-hidden");
		areaList.classList.add("is-hidden");
	}
};

labelArr.forEach((label) =>
	label.addEventListener("click", handleFilters)
);
const handleArrow = (type) => {
	labelArr.forEach((label) => {
		if (label.dataset.type == type) {
			label.firstElementChild.classList.toggle("picked");
		} else {
			label.firstElementChild.classList.remove("picked");
		}
	});
};
