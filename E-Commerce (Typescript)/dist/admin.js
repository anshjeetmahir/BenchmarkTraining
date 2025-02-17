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
document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("admin-products");
    const productIdInput = document.getElementById("product-id");
    const nameInput = document.getElementById("product-name");
    const categoryInput = document.getElementById("product-category");
    const imageInput = document.getElementById("product-image");
    const priceInput = document.getElementById("product-price");
    const saveProductBtn = document.getElementById("save-product");
    const formTitle = document.getElementById("form-title");
    function loadProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.get("https://fakestoreapi.com/products");
                displayProducts(response.data);
            }
            catch (error) {
                console.error("Error loading products!", error);
            }
        });
    }
    function displayProducts(products) {
        productList.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "col-md-4 mb-3";
            productCard.innerHTML = `
                <div class="card shadow">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">Category: ${product.category}</p>
                        <p class="card-text"><strong>$${product.price}</strong></p>
                        <button class="btn btn-warning edit-btn" data-id="${product.id}">Edit</button>
                        <button class="btn btn-danger delete-btn" data-id="${product.id}">Delete</button>
                    </div>
                </div>`;
            productList.appendChild(productCard);
        });
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", (e) => openEditForm(e.target.dataset.id));
        });
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", (e) => deleteProduct(e.target.dataset.id));
        });
    }
    function saveProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = productIdInput.value;
            const title = nameInput.value;
            const category = categoryInput.value;
            const image = imageInput.value;
            const price = parseFloat(priceInput.value);
            if (!title || !category || !image || isNaN(price)) {
                alert("All fields are required!");
                return;
            }
            try {
                const products = { title, price, category, image };
                if (productId) {
                    yield axios.put(`https://fakestoreapi.com/products/${productId}`, products);
                    alert("Product updated successfully!");
                }
                else {
                    yield axios.post("https://fakestoreapi.com/products", products);
                    alert("Product added successfully!");
                }
                resetForm();
                loadProducts();
            }
            catch (error) {
                console.error("Error saving product!", error);
            }
        });
    }
    function deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!confirm("Are you sure you want to delete this product?"))
                return;
            try {
                yield axios.delete(`https://fakestoreapi.com/products/${productId}`);
                alert("Product deleted successfully!");
                loadProducts();
            }
            catch (error) {
                console.error("Error deleting product!", error);
            }
        });
    }
    function openEditForm(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.get(`https://fakestoreapi.com/products/${productId}`);
                const product = response.data;
                productIdInput.value = product.id.toString();
                nameInput.value = product.title;
                categoryInput.value = product.category;
                imageInput.value = product.image;
                priceInput.value = product.price.toString();
                formTitle.innerText = "Edit Product";
                saveProductBtn.innerText = "Update Product";
            }
            catch (error) {
                alert("Error loading product details!");
            }
        });
    }
    function resetForm() {
        productIdInput.value = "";
        nameInput.value = "";
        categoryInput.value = "";
        imageInput.value = "";
        priceInput.value = "";
        formTitle.innerText = "Add Product";
        saveProductBtn.innerText = "Save Product";
    }
    saveProductBtn.addEventListener("click", saveProduct);
    loadProducts();
});
