
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout");

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = "";
        let total = 0;
        console.log(cart);

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const itemCard = document.createElement("div");
            itemCard.className = "col-md-4 mb-3";
            itemCard.innerHTML = `
                <div class="card">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
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

        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", (e) => {
                let index = e.target.dataset.index;
                cart[index].quantity++;
                localStorage.setItem("cart", JSON.stringify(cart));
                loadCart();
            });
        });

        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", (e) => {
                let index = e.target.dataset.index;
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                loadCart();
            });
        });

        document.querySelectorAll(".remove").forEach(button => {
            button.addEventListener("click", (e) => {
                let index = e.target.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                loadCart();
            });
        });
    }

    loadCart();

    checkoutButton.addEventListener("click", () => {
        loadCart();
        if (localStorage.length !== 2)
            alert("Add items to cart to checkout! ")
        else {
            alert("Thank you for your purchase!");
            localStorage.removeItem("cart");
            loadCart();
        }
    });
});
