



document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    localStorage.clear();
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username");
        const password = document.getElementById("password");


        try {

            const response = await axios.get("https://fakestoreapi.com/users", {
                username,
                password, name
            });

            let flag = 0;
            response.data.forEach(function (curr) {
                if (curr.username === username.value && curr.password === password.value) {
                    localStorage.setItem("user", JSON.stringify(curr.name.firstname))
                    alert("Login successful");
                    window.location.href = "./home/home.html";
                    ++flag;
                }



            })
            if (flag === 0) {
                username.value = '';
                password.value = '';
                throw new Error("Incorrect UserID or Password!! ")
            }


        } catch (err) {
            alert("Invalid credentials!!");

            console.error("Login error", err);

        }

    });
});

