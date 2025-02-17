"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const productList = document.getElementById("product-list");
    const categoryFilter = document.getElementById("category-filter");
    const username = document.getElementById("username");
    username.textContent = `USER : ${((_a = localStorage.getItem('user')) === null || _a === void 0 ? void 0 : _a.toUpperCase().replaceAll('"', '')) || "GUEST"}`;
    try {

        const response = yield axios.get("https://fakestoreapi.com/products");
        const products = response.data;

        const categoryResponse = yield axios.get("https://fakestoreapi.com/products/categories");
        const categories = categoryResponse.data;
        categories.forEach(category => {
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
                    const target = e.target;
                    const product = {
                        id: parseInt(target.dataset.id || "0"),
                        title: target.dataset.name || "",
                        price: parseFloat(target.dataset.price || "0"),
                        image: target.dataset.image || "",
                        category: "",
                        quantity: 1
                    };
                    addToCart(product);
                });
            });
        }

        displayProducts(products);

        categoryFilter.addEventListener("change", () => {
            const selectedCategory = categoryFilter.value;
            const filteredProducts = selectedCategory
                ? products.filter(p => p.category === selectedCategory)
                : products;
            displayProducts(filteredProducts);
        });

        function addToCart(product) {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            }
            else {
                cart.push(product);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Item added to cart!");
        }
    }
    catch (error) {
        console.error("Error fetching products", error);
    }
}));
