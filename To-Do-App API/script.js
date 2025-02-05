



document.addEventListener("DOMContentLoaded", () => {
    const inputTodo = document.getElementById("input-todo");
    const buttonTodo = document.getElementById("button-todo");
    const delAll = document.getElementById("button-del-all");
    const getSampleData = document.getElementById("button-get-sample");
    const ulTodo = document.getElementById("ul-todo");

    const API = "https://jsonplaceholder.typicode.com/todos";

    let editMode = false;
    let editElement = null;






    //GET API

    const createGetTodo = (id, task) => {
        const li = document.createElement("li");
        li.dataset.id = id;


        li.className =
            "list-group-item d-flex justify-content-between align-items-start";
        li.innerHTML = `<span class="text-todo">${task}</span>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-danger edit-btn">Edit</button>
        <button type="button" class="btn dlt-btn btn-warning">Delete</button>
        <input type="text" class="edit-ip form-control d-none" value="${task}">
        <button type="button" class="btn btn-success  d-none  save-btn">Save</button>
      </div>`;
        ulTodo.appendChild(li);
    };

    const getTodos = () => {
        axios.get(`${API}?_limit=10`,)
            .then(res => {
                if (res.status === 200)
                    console.log(`Your GET STATUS : ${res.status}`);

                return res.data.forEach((curr) => {

                    createGetTodo(curr.id, curr.title);

                    saveAllTodo();
                })


            })
            .catch(err => console.error(err));

    }



    getSampleData.addEventListener("click", () => {

        if (editMode) {
            editElement.querySelector(".text-todo").textContent = text;
            editMode = false;
            editElement = null;
            buttonTodo.textContent = "Add";
        } else {
            getTodos();
        }
        inputTodo.value = "";
        saveAllTodo();
    }
    );

    //Event to create and add a new task

    //POST API
    const postAPI = async function (data) {



        const postData = await axios.post(API, {
            title: data,
            completed: true
        }).catch(err => console.error(err));
        if (postData.status == 201) {
            console.log(`Your POST STATUS: ${postData.status}`);
            console.log(postData);

            alert('Your Data has been POSTED using POST API..');
        }



        inputTodo.value = '';
        saveAllTodo();
    }

    buttonTodo.addEventListener("click", () => {
        const text = inputTodo.value;


        if (editMode) {
            editElement.querySelector(".text-todo").textContent = text;
            editMode = false;
            editElement = null;
            buttonTodo.textContent = "Add";
        } else {
            if (text !== '') {
                createTodo(text);
                postAPI(text);

            }
        }
        inputTodo.value = "";
        saveAllTodo();
    });


    //logic to delete all task in list
    delAll.addEventListener('click', (e) => {

        const check = confirm(`Do you want to delete all task? `);
        if (check) {
            inputTodo.value = "";
            ulTodo.innerHTML = "";
            localStorage.clear();
        }
        else
            alert(`No task were deleted.. `);
        saveAllTodo();



    })

    //logic to create task
    const createTodo = (task) => {
        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-start";
        li.innerHTML = `<span class="text-todo">${task}</span>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-danger edit-btn">Edit</button>
        <button type="button" class="btn dlt-btn btn-warning">Delete</button>
        <input type="text" class="edit-ip form-control d-none" value="${task}">
        <button type="button" class="btn btn-success  d-none  save-btn">Save</button>
      </div>`;
        ulTodo.appendChild(li);
    };



    // DELETE API
    const deleteAPI = async function (e) {
        if (e.target.classList.contains("btn-warning")) {
            const li = e.target.closest(".list-group-item")
            const id = li.dataset.id;
            const res = await axios.delete(`${API}/${id}`);
            li.remove();
            saveAllTodo();
            if (res.status == 200) {
                alert('Your Data has been Deleted using DELETE API..')
                console.log(`Your DELETE STATUS : ${res.status}`);
            }

        }
    }




    //All events inside List

    ulTodo.addEventListener("click", async (e) => {
        const li = e.target.closest(".list-group-item");

        // Event for list delete button

        if (e.target.classList.contains("btn-warning")) {
            const check = confirm(`Do you want to delete "${li.querySelector(".text-todo").textContent}" task? `);
            if (check) {
                // e.target.closest(".list-group-item").remove();
                deleteAPI(e);
            }
            else
                alert(`Task "${li.querySelector(".text-todo").textContent}" was not deleted.. `);
            saveAllTodo();
        }

        //logic to edit list item

        if (e.target.classList.contains("edit-btn")) {
            const userText = li.querySelector(".text-todo");
            const editInput = li.querySelector(".edit-ip");
            const saveButton = li.querySelector(".save-btn");
            const deleteButton = li.querySelector(".dlt-btn");


            userText.classList.add("d-none");
            deleteButton.classList.add("d-none");
            editInput.classList.remove("d-none");
            saveButton.classList.remove("d-none");
            e.target.classList.add("d-none");
        }

        //logic to save edited item

        if (e.target.classList.contains("save-btn")) {
            const userText = li.querySelector(".text-todo");
            const editInput = li.querySelector(".edit-ip");
            const editBtn = li.querySelector(".edit-btn");
            const deleteButton = li.querySelector(".dlt-btn");

            deleteButton.classList.remove("d-none");
            userText.textContent = editInput.value;
            userText.classList.remove("d-none");
            editInput.classList.add("d-none");
            e.target.classList.add("d-none");
            editBtn.classList.remove("d-none");

            saveAllTodo();
        }



    });



    //save all task to local storage
    const saveAllTodo = () => {
        const allTodos = [...document.querySelectorAll(".text-todo")].map(
            (task) => task.textContent
        );

        localStorage.setItem("allTodos", JSON.stringify(allTodos));
    };

    //load all task to local storage once refreshed
    const loadAllTodo = () => {
        const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
        allTodos.forEach((task) => createTodo(task));
    };

    loadAllTodo();
});