import axios from "axios";

interface User {
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form") as HTMLFormElement;
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    localStorage.clear();

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        try {

            const response = await axios.get<User[]>("https://fakestoreapi.com/users");

            let flag = 0;

            response.data.forEach((curr) => {
                if (curr.username === username && curr.password === password) {
                    localStorage.setItem("user", JSON.stringify(curr.name.firstname));
                    alert("Login successful");
                    window.location.href = "./home/home.html";
                    ++flag;
                }
            });


            if (flag === 0) {
                usernameInput.value = "";
                passwordInput.value = "";
                throw new Error("Incorrect UserID or Password!!");
            }
        } catch (err) {
            alert("Invalid credentials!!");
            console.error("Login error", err);
        }
    });
});
