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
	return data
		.map(
			({ name }) => `<li>
            <button class="btn" type="button" data-option='option-category'>${name}</button>
        </li>`
		)
		.join("");
};

const getCats = async () => {
	const data = await getData();
	catsList.insertAdjacentHTML("beforeend", createMarkUp(data));
};
getCats();
