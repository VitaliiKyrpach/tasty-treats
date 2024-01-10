import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const cartModal = document.querySelector(".backdrop");
const cartBtn = document.querySelector(".cart-btn");
const orderBtn = document.querySelector(".order-btn");
const openCartModal = () => {
	document.addEventListener("keydown", handleEscape);
	cartModal.innerHTML = "";
	cartModal.insertAdjacentHTML("beforeend", createOrderMarkUp());
	cartModal.classList.remove("is-hidden");
	document.body.classList.add("no-scroll");
	cartModal.addEventListener("click", handleCloseModal);
	const send = document.querySelector(".order-form");
	send.addEventListener("submit", handleOrderPost);
};

const handleEscape = (e) => {
	if (e.key == "Escape") {
		closeModal();
	}
};

const createOrderMarkUp = () => {
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
                    id="customerName"
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
                    id="customerPhone"
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
                    id="customerEmail"
                    placeholder="example@mail.com"
                    required
                />
                
            </div>
            <div class="modal-input-group textarea">
            <label class="label" for="customer-email"
                >Comment</label
            >
            <textarea 
                class="textarea input"
                name="textarea"
                rows='4'
                id='customerComment'
                placeholder="Write something here..."
                required
                ></textarea>
            
        </div>
            
            <button class="order-post-btn" type="submit">
                Send
            </button>
        </form>

</div>`;
};

const closeModal = () => {
	cartModal.innerHTML = "";
	cartModal.classList.add("is-hidden");
	document.body.classList.remove("no-scroll");
	document.removeEventListener("keydown", handleEscape);
};

const handleCloseModal = (e) => {
	if (
		e.target.className == "btn-close" ||
		e.target.className == "backdrop"
	) {
		closeModal();
	}
};

const handleOrderPost = async (e) => {
	e.preventDefault();
	try {
		const form = e.target.elements;

		const body = {
			name: form.customerName.value,
			phone: form.customerPhone.value,
			email: form.customerEmail.value,
			comment: form.customerComment.value,
		};
		const post = await postOrder(body);
		if (post.status == 201) {
			Notify.success(
				"Thank you for your order. Our manager will contact you ASAP"
			);
		}
		closeModal();
	} catch (err) {
		console.log(err);
		Notify.failure(
			`I'm sorry, something went wrong. ${err.response.data.message}`
		);
	}
};

const postOrder = async (body) => {
	const post = await axios.post(`/orders/add`, body);
	return post;
};

cartBtn.addEventListener("click", openCartModal);
if (orderBtn) orderBtn.addEventListener("click", openCartModal);
