export const addToFavorites = (target) => {
	let idArr = JSON.parse(localStorage.getItem("favorites")) ?? [];
	console.log(target.id);
	if (!idArr.includes(target.id)) {
		idArr.push(target.id);
		console.log("added");
	} else {
		const newArr = idArr.filter((item) => item !== target.id);
		idArr = newArr;
		console.log("delete");
	}
	target.classList.toggle("added");
	console.log(idArr);
	localStorage.setItem("favorites", JSON.stringify(idArr));
};
