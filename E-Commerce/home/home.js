
document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("product-list");
    const categoryFilter = document.getElementById("category-filter");
    const username = document.getElementById("username");


    username.textContent = `${'USER : '} ${localStorage.getItem('user')?.toUpperCase().replaceAll('"', '') || "GUEST"}`;

    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const products = response.data;

        const categories = await axios.get("https://fakestoreapi.com/products/categories")
        categories.data.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });


        function displayProducts(filteredProducts) {
            productList.innerHTML = "";
            filteredProducts.forEach(product => {
                const productCard = document.createElement("div");
                productCard.className = "col-md-4 mb-4";
                productCard.innerHTML = `
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text"><strong>Price:</strong> ${product.price} USD</p>
                            <button class="btn btn-primary add-to-cart" 
                                data-id="${product.id}" 
                                data-name="${product.title}" 
                                data-price="${product.price}" 
                                data-image="${product.image}">
                                Add to Cart
                            </button>
                        </div>
                    </div>`;
                productList.appendChild(productCard);
            });


            document.querySelectorAll(".add-to-cart").forEach(button => {
                button.addEventListener("click", (e) => {
                    const product = {
                        id: e.target.dataset.id,
                        name: e.target.dataset.name,
                        price: parseFloat(e.target.dataset.price),
                        image: e.target.dataset.image,
                        quantity: 1
                    };
                    addToCart(product);
                });
            });
        }


        displayProducts(products);

        categoryFilter.addEventListener("change", () => {
            const selectedCategory = categoryFilter.value;
            const filteredProducts = selectedCategory ? products.filter(p => p.category === selectedCategory) : products;
            displayProducts(filteredProducts);
        });


        function addToCart(product) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];


            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(product);
            }


            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Item added to cart!");
        }

    } catch (error) {
        console.error("Error fetching products", error);
    }
});
