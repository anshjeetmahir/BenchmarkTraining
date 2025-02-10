
document.addEventListener("DOMContentLoaded", () => {

    const productList = document.getElementById("admin-products");


    const productIdInput = document.getElementById("product-id");
    const nameInput = document.getElementById("product-name");
    const categoryInput = document.getElementById("product-category");
    const imageInput = document.getElementById("product-image");
    const priceInput = document.getElementById("product-price");
    const saveProductBtn = document.getElementById("save-product");
    const formTitle = document.getElementById("form-title");


    async function loadProducts() {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            displayProducts(response.data);
        } catch (error) {
            showAlert("Error loading products!", "danger");
        }
    }


    function displayProducts(products) {
        productList.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("col-md-4", "mb-3");
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
                </div>
            `;
            productList.appendChild(productCard);
        });

        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", (e) => openEditForm(e.target.dataset.id));
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", (e) => deleteProduct(e.target.dataset.id));
        });
    }




    async function saveProduct() {
        const productId = productIdInput.value;
        const name = nameInput.value;
        const category = categoryInput.value;
        const image = imageInput.value;
        const price = priceInput.value;

        if (!name || !category || !image || !price) {
            showAlert("All fields are required!", "warning");
            return;
        }

        try {
            if (productId) {
                const code = await axios.put(`${"https://fakestoreapi.com/products"}/${productId}`, { title: name, category, image, price }).then(res => { const code = res.status; console.log(`PUT STATUS CODE: ${res.status}`); return code; }
                );
                if (code === 200)
                    alert(`Product updated successfully! ${code}`);
                else
                    throw new Error("Error Saving Product !")


            } else {
                const code = await axios.post("https://fakestoreapi.com/products", { title: name, category, image, price }).then(res => { const code = res.status; console.log(`POST STATUS CODE: ${res.status}`); return code; }
                );

                if (code === 200)
                    alert(`Product added successfully! ${code}`);
                else
                    throw new Error("Error Saving Product !")


            }

            resetForm();
            loadProducts();
        } catch (error) {
            console.error(error);
        }
    }


    async function deleteProduct(productId) {
        try {
            const code = await axios.delete(`${"https://fakestoreapi.com/products"}/${productId}`).then(res => { const code = res.status; console.log(`DELETE STATUS CODE: ${res.status}`); return code; }
            );
            if (code === 200)
                alert(`Product deleted successfully! ${code}`);
            else
                throw new Error("Error deleting Product !")



        } catch (error) {
            showAlert(error);
        }
    }


    async function openEditForm(productId) {
        try {
            const response = await axios.get(`${"https://fakestoreapi.com/products"}/${productId}`);
            const product = response.data;

            productIdInput.value = product.id;
            nameInput.value = product.title;
            categoryInput.value = product.category;
            imageInput.value = product.image;
            priceInput.value = product.price;
            formTitle.innerText = "Edit Product";
            saveProductBtn.innerText = "Update Product";
        } catch (error) {
            alert("Error loading product details!");
        }
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
