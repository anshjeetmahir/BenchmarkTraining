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
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    localStorage.clear();
    loginForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        try {
            const response = yield axios.get("https://fakestoreapi.com/users");
            const user = response.data.find(user => user.username === username && user.password === password);
            if (user) {
                localStorage.setItem("user", JSON.stringify(user.name.firstname));
                alert("Login successful");
                window.location.href = "../index.html";
            }
            else {
                usernameInput.value = "";
                passwordInput.value = "";
                throw new Error("Incorrect UserID or Password!");
            }
        }
        catch (err) {
            alert("Invalid credentials!");
            console.error("Login error", err);
        }
    }));
});
