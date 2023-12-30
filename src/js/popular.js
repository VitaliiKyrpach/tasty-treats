import axios from "axios";

const popList = document.querySelector(".popular-list");

const getData = async () => {
	try {
		const fetch = await axios("/recipes/popular");
		return fetch;
	} catch (err) {
		console.log(err);
	}
};

const createMarkUp = ({ data }) => {
	return data
		.map(
			({ preview, title, description }) => `<li class="card">
            <img class="img" src=${preview} alt=${title} />
            <div class="popular-content">
                <h3 class="title">${title}</h3>
                <p class="text">
                    ${description}
                </p>
            </div>
        </li>`
		)
		.join("");
};

const getPopular = async () => {
	const data = await getData();
	popList.insertAdjacentHTML("beforeend", createMarkUp(data));
};
getPopular();
