import axios from "axios";
export const addToFavorites = async (target) => {
	let favArr = JSON.parse(localStorage.getItem("favorites")) ?? [];
	// console.log(target.id);
	// console.group(favArr);

	const isAdded = favArr.find((item) => item._id == target.id);
	if (!isAdded) {
		const data = await getData(target.id);
		const card = {
			_id: data._id,
			title: data.title,
			description: data.description,
			preview: data.preview,
			rating: data.rating,
			category: data.category,
		};
		favArr.push(card);
		localStorage.setItem("favorites", JSON.stringify(favArr));
		console.log("added");
	} else {
		const newArr = favArr.filter((item) => item._id !== target.id);
		console.log("deleted");
		localStorage.setItem("favorites", JSON.stringify(newArr));
	}
	target.classList.toggle("added");
};

const getData = async (id) => {
	try {
		const fetch = await axios(`/recipes/${id}`);
		return fetch.data;
	} catch (err) {
		console.log(err);
	}
};
