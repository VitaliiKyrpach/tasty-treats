import axios from "axios";

const catsList = document.querySelector(".cats-list");
const getData = async () => {
	try {
		const fetch = await axios("/categories");
		return fetch;
	} catch (err) {
		console.log(err);
	}
};

const createMarkUp = ({ data }) => {
	const params = JSON.parse(localStorage.getItem("params"));
	let catActive = "";
	return data
		.map(({ name }) => {
			if (params.category == name) catActive = "cat-active";
			else catActive = "";
			return `<li>
            <button class="btn ${catActive}" type="button" data-option='option-category'>${name}</button>
        </li>`;
		})
		.join("");
};

const getCats = async () => {
	const data = await getData();
	catsList.insertAdjacentHTML("beforeend", createMarkUp(data));
};
getCats();
