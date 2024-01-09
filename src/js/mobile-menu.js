const mobMenu = document.querySelector(".mobile-menu");
const mobMenuOpen = document.querySelector(".burger-btn");
const mobMenuClose = document.querySelector(".mob-btn-close");

const handleMenu = () => {
    mobMenu.innerHTML = "";
	mobMenu.insertAdjacentHTML("beforeend", createMenuMarkUp());
  mobMenu.classList.add("open");
  document.body.classList.add("no-scroll");
  const menuCloseBtn = document.querySelector(".menu-btn-close");
	menuCloseBtn.addEventListener("click", () =>
		closeMenu()
	);
};
mobMenuOpen.addEventListener("click", handleMenu);

const createMenuMarkUp = () =>{
    return `<button class="menu-btn-close">
    <svg class="close-svg">
        <use href="assets/sprite.svg#icon-reset"></use>
    </svg>
</button>
<h3>here is the mobile menu</h3>`
}

const closeMenu = () => {
    mobMenu.classList.remove("open");
	document.body.classList.remove("no-scroll");
	mobMenu.innerHTML = "";
};