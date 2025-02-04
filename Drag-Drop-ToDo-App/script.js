


document.addEventListener("DOMContentLoaded", () => {
    const inputTodo = document.getElementById("input-todo");
    const buttonTodo = document.getElementById("button-todo");
    const delAll = document.getElementById("button-del-all");
    const ulTodo = document.getElementById("ul-todo");

    let editMode = false;
    let editElement = null;

    //Event to create and add a new task

    buttonTodo.addEventListener("click", () => {
        const text = inputTodo.value;
        if (editMode) {
            editElement.querySelector(".text-todo").textContent = text;
            editMode = false;
            editElement = null;
            buttonTodo.textContent = "Add";
        } else {
            if (text !== '')
                createTodo(text);
        }
        inputTodo.value = "";
        saveAllTodo();
    });

    //logic to delete task in list
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
        li.draggable = true;
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


    //All events inside List

    ulTodo.addEventListener("click", (e) => {
        const li = e.target.closest(".list-group-item");

        // Event for list delete button

        if (e.target.classList.contains("btn-warning")) {
            const check = confirm(`Do you want to delete "${li.querySelector(".text-todo").textContent}" task? `);
            if (check)
                e.target.closest(".list-group-item").remove();
            else
                alert(`Task "${li.querySelector(".text-todo").textContent}" was not deleted.. `);
            saveAllTodo();
        }

        //logic to edit list item

        if (e.target.classList.contains("edit-btn")) {
            const userText = li.querySelector(".text-todo");
            const editButton = li.querySelector(".edit-ip");
            const saveButton = li.querySelector(".save-btn");
            const deleteButton = li.querySelector(".dlt-btn");


            userText.classList.add("d-none");
            deleteButton.classList.add("d-none");
            editButton.classList.remove("d-none");
            saveButton.classList.remove("d-none");
            e.target.classList.add("d-none");
        }

        //logic to save edited item

        if (e.target.classList.contains("save-btn")) {
            const userText = li.querySelector(".text-todo");
            const editButton = li.querySelector(".edit-ip");
            const editBtn = li.querySelector(".edit-btn");
            const deleteButton = li.querySelector(".dlt-btn");

            deleteButton.classList.remove("d-none");
            userText.textContent = editButton.value;
            userText.classList.remove("d-none");
            editButton.classList.add("d-none");
            e.target.classList.add("d-none");
            editBtn.classList.remove("d-none");

            saveAllTodo();
        }
    });

    // Drag Drop Logic
    const sortableList =
        document.querySelector(".sortable");
    let draggedItem = null;

    //Logic at time of drag start
    sortableList.addEventListener("dragstart", (e) => {
        draggedItem = e.target;
        setTimeout(() => {
            e.target.style.display =
                "none";
        }, 0);
    });
    //Logic at time of drag end
    sortableList.addEventListener("dragend", (e) => {
        setTimeout(() => {
            e.target.style.display = "";
            draggedItem = null;
            saveAllTodo();
        }, 0);
    });
    //Logic at time of drag over
    sortableList.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement =
            getDragAfterElement(sortableList, e.clientY);
        const currentElement = document.querySelector(".dragging");
        if (afterElement == null) {
            sortableList.appendChild(
                draggedItem
            );
        }
        else {
            sortableList.insertBefore(
                draggedItem,
                afterElement
            );
        }
    });

    const getDragAfterElement = (container, y) => {
        const draggableElements = [...container.querySelectorAll("li:not(.dragging)"),];

        return draggableElements.reduce(
            (closest, child) => {
                const box =
                    child.getBoundingClientRect();
                const offset =
                    y - box.top - box.height / 2;
                if (
                    offset < 0 &&
                    offset > closest.offset) {
                    return {
                        offset: offset,
                        element: child,
                    };
                }
                else {
                    return closest;
                }

            },
            {
                offset: Number.NEGATIVE_INFINITY,
            }
        ).element;
    };



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