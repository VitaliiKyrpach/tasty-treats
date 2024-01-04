import axios from "axios";
export const addToFavorites = async (target) => {
	let favArr = JSON.parse(localStorage.getItem("favorites")) ?? [];
	console.log(target.id);
	// if (!idArr.includes(target.id)) {
	// 	idArr.push(target.id);
	// 	console.log("added");
	// } else {
	// 	const newArr = idArr.filter((item) => item !== target.id);
	// 	idArr = newArr;
	// 	console.log("delete");
	// }
	const isAdded = favArr.find(item=> item.id == target.id)
if(!isAdded){
	const data = await getData(target.id);
	const card = {
		id: data._id, title: data.title, description: data.description, preview: data.preview, rating: data.rating,
	}
	favArr.push(card);
	localStorage.setItem("favorites", JSON.stringify(favArr));
	console.log('added')
} else{
	const newArr = favArr.filter(item=> item.id !== target.id)
	console.log('deleted')
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
