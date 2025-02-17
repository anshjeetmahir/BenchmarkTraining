import { get, put, del, post } from "./api";

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
}


document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("admin-products") as HTMLDivElement;
    const productIdInput = document.getElementById("product-id") as HTMLInputElement;
    const nameInput = document.getElementById("product-name") as HTMLInputElement;
    const categoryInput = document.getElementById("product-category") as HTMLInputElement;
    const imageInput = document.getElementById("product-image") as HTMLInputElement;
    const priceInput = document.getElementById("product-price") as HTMLInputElement;
    const saveProductBtn = document.getElementById("save-product") as HTMLButtonElement;
    const formTitle = document.getElementById("form-title") as HTMLHeadingElement;

    async function loadProducts(): Promise<void> {
        try {
            const response = await get("https://fakestoreapi.com/products");
            displayProducts(response.data);
        } catch (error) {
            console.error("Error loading products!", error);
        }
    }

    function displayProducts(products: Product[]): void {
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
            btn.addEventListener("click", (e) => openEditForm((e.target as HTMLElement).dataset.id!));
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", (e) => deleteProduct((e.target as HTMLElement).dataset.id!));
        });
    }

    async function saveProduct(): Promise<void> {
        const productId = productIdInput.value;
        const name = nameInput.value;
        const category = categoryInput.value;
        const image = imageInput.value;
        const price = parseFloat(priceInput.value);

        if (!name || !category || !image || isNaN(price)) {
            alert("All fields are required!");
            return;
        }

        try {
            if (productId) {
                await put(`https://fakestoreapi.com/products/${productId}`, { title: name, category, image, price });
                alert("Product updated successfully!");
            } else {
                await post("https://fakestoreapi.com/products", { title: name, category, image, price });
                alert("Product added successfully!");
            }
            resetForm();
            loadProducts();
        } catch (error) {
            console.error("Error saving product!", error);
        }
    }

    async function deleteProduct(productId: string): Promise<void> {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await del(`https://fakestoreapi.com/products/${productId}`);
            alert("Product deleted successfully!");
            loadProducts();
        } catch (error) {
            console.error("Error deleting product!", error);
        }
    }

    async function openEditForm(productId: string): Promise<void> {
        try {
            const response = await get(`https://fakestoreapi.com/products/${productId}`);
            const product = response.data;

            productIdInput.value = product.id.toString();
            nameInput.value = product.title;
            categoryInput.value = product.category;
            imageInput.value = product.image;
            priceInput.value = product.price.toString();
            formTitle.innerText = "Edit Product";
            saveProductBtn.innerText = "Update Product";
        } catch (error) {
            alert("Error loading product details!");
        }
    }

    function resetForm(): void {
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
