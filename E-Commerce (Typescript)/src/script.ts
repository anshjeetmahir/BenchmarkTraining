import { get } from "./api";

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
}


// declare const axios: {
//     get<T = any>(url: string): Promise<{ data: T }>;
//     post<T = any>(url: string, data?: any): Promise<{ data: T }>; put<T = any>(url: string, data?: any): Promise<{ data: T }>;
//     delete<T = any>(url: string): Promise<{ data: T }>;
// };



document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("product-list") as HTMLDivElement;
    const categoryFilter = document.getElementById("category-filter") as HTMLSelectElement;
    const username = document.getElementById("username") as HTMLParagraphElement;

    username.textContent = `USER : ${localStorage.getItem('user')?.toUpperCase().replaceAll('"', '') || "GUEST"}`;


    interface CartItem extends Product {
        quantity: number;
    }

    try {
        // Fetch products
        const response = await get("https://fakestoreapi.com/products");
        const products: Product[] = response.data;

        // Fetch categories
        const categoryResponse = await get("https://fakestoreapi.com/products/categories");
        const categories: string[] = categoryResponse.data;

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        // Display products
        function displayProducts(filteredProducts: Product[]): void {
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

            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll(".add-to-cart").forEach(button => {
                button.addEventListener("click", (e) => {
                    const target = e.target as HTMLButtonElement;
                    const product: CartItem = {
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

        // Initial product display
        displayProducts(products);

        // Filter products by category
        categoryFilter.addEventListener("change", () => {
            const selectedCategory: Product["category"] = categoryFilter.value;
            const filteredProducts = selectedCategory
                ? products.filter(p => p.category === selectedCategory)
                : products;
            displayProducts(filteredProducts);
        });

        // Add to cart
        function addToCart(product: CartItem): void {
            const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

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
