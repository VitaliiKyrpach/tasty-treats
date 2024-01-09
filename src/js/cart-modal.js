const cartModal = document.querySelector(".backdrop");
const cartBtn = document.querySelector('.cart-btn')
const openCartModal =()=>{
    cartModal.innerHTML = "";
	cartModal.insertAdjacentHTML("beforeend", createOrderMarkUp());
	cartModal.classList.remove("is-hidden");
	document.body.classList.add("no-scroll");
    const orderCloseBtn = document.querySelector(".btn-close");
	orderCloseBtn.addEventListener("click", () =>
		closeOrderModal(orderCloseBtn)
	);
}

const createOrderMarkUp = () =>{
    return `<div class="order-modal">
    <button class="btn-close" type="button">
        <svg class="close-svg">
            <use href="assets/sprite.svg#icon-reset"></use>
        </svg>
    </button>
    <h2 class="title">
            Order now
        </h2>
        <form class="order-form">
            <div class="modal-input-group">
            <label class="label" for="customer-name"
                    >Name</label
                >
                <input
                    class="input"
                    type="text"
                    name="name"
                    id="customer-name"
                    placeholder="User"
                    required
                />
                
            </div>
            <div class="modal-input-group">
            <label class="label" for="customer-phone"
                    >Phone number</label
                >
                <input
                    class="input"
                    type="tel"
                    name="phone"
                    id="customer-phone"
                    placeholder="+38 000 000 00 00"
                    required
                />
                
            </div>
            <div class="modal-input-group">
            <label class="label" for="customer-email"
                    >Email</label
                >
                <input
                    class="input"
                    type="email"
                    name="email"
                    id="customer-email"
                    placeholder="example@mail.com"
                />
                
            </div>
            <div class="modal-input-group">
            <label class="label" for="customer-email"
                >Comment</label
            >
            <textarea 
                class="textarea input"
                name="textarea"
                rows='4'
                id='customer-comment'
                placeholder="Write something here..."
                ></textarea>
            
        </div>
            
            <button class="order-post-btn" type="submit">
                Send
            </button>
        </form>

</div>`
} 

const closeOrderModal = (close) => {
	cartModal.innerHTML = "";
	cartModal.classList.add("is-hidden");
	document.body.classList.remove("no-scroll");
	close.removeEventListener("click", closeOrderModal);
};

cartBtn.addEventListener('click', openCartModal)