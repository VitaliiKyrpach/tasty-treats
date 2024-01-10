const mobMenu = document.querySelector(".mobile-menu");
const mobMenuOpen = document.querySelector(".burger-btn");
const menuCloseBtn = document.querySelector(".menu-btn-close");


const handleMenu = () => {
  mobMenu.classList.add("open");
  document.body.classList.add("no-scroll");
};
mobMenuOpen.addEventListener("click", handleMenu);



const closeMenu = () => {
    mobMenu.classList.remove("open");
	document.body.classList.remove("no-scroll");
};

menuCloseBtn.addEventListener("click", () =>
    closeMenu()
);