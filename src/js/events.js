import axios from "axios";
import ellipse from "../images/ellipse.png";

axios.defaults.baseURL =
	"https://tasty-treats-backend.p.goit.global/api";

const eventList = document.querySelector(".master-list");
const getData = async () => {
	try {
		const fetch = await axios("/events");
		return fetch;
	} catch (err) {
		console.log(err);
	}
};

const createMarkUp = ({ data }) => {
	return data
		.map(
			(chief, i) => `<li class="item swiper-slide">
    <div class="hero-card">
        <div class="card-chief">
            <img
                class="chief"
                src=${chief.cook.imgUrl}
                alt="chief ${chief.cook.name}"
            />
        </div>
        <div class="card-dish">
            <p class="master-text">
                ${chief.topic.name}
            </p>
            <p class="master-text-country">${chief.topic.area}</p>
            <img 
            class="elips-img"
			src=${ellipse}
			alt="gradient"
			/>
            <img
            class="dish-img"
            src=${chief.topic.previewUrl}
            alt="dish"
            />
            </div>
            <div class="card-dish">
            <img
            class="dish-${i + 1}-big-img"
            src=${chief.topic.imgUrl}
            alt="dish closeUp"
            />
            </div>
            </div>
            </li>`
		)
		.join("");
};

const getEvents = async () => {
	const data = await getData();
	eventList.insertAdjacentHTML("beforeend", createMarkUp(data));
};
getEvents();
