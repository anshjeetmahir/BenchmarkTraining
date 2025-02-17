interface ICartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items") as HTMLDivElement;
    const cartTotal = document.getElementById("cart-total") as HTMLSpanElement;
    const checkoutButton = document.getElementById("checkout") as HTMLButtonElement;

    function loadCart(): void {
        const cart: ICartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const itemCard = document.createElement("div");
            itemCard.className = "col-md-4 mb-3";
            itemCard.innerHTML = `
                <div class="card">
                    <img src="${item.image}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text"><strong>Price:</strong> ${item.price} USD</p>
                        <p class="card-text"><strong>Quantity:</strong> ${item.quantity}</p>
                        <button class="btn btn-sm btn-light increase" data-index="${index}"><strong>+</strong></button>
                        <button class="btn btn-sm btn-light decrease" data-index="${index}"><strong>-</strong></button>
                        <button class="btn btn-sm btn-danger remove" data-index="${index}">Remove</button>
                    </div>
                </div>`;
            cartItemsContainer.appendChild(itemCard);
        });

        cartTotal.textContent = total.toFixed(2);

        document.querySelectorAll<HTMLButtonElement>(".increase").forEach(button => {
            button.addEventListener("click", () => updateQuantity(parseInt(button.dataset.index || "0"), 1));
        });

        document.querySelectorAll<HTMLButtonElement>(".decrease").forEach(button => {
            button.addEventListener("click", () => updateQuantity(parseInt(button.dataset.index || "0"), -1));
        });

        document.querySelectorAll<HTMLButtonElement>(".remove").forEach(button => {
            button.addEventListener("click", () => removeItem(parseInt(button.dataset.index || "0")));
        });
    }

    function updateQuantity(index: number, change: number): void {
        const cart: ICartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
        if (cart[index]) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }
    }

    function removeItem(index: number): void {
        const cart: ICartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    checkoutButton.addEventListener("click", () => {
        const cart: ICartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
        if (cart.length === 0) {
            alert("Add items to cart to checkout!");
        } else {
            alert("Thank you for your purchase!");
            localStorage.removeItem("cart");
            loadCart();
        }
    });

    loadCart();
});
