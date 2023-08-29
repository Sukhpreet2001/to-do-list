document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.querySelector("#addTodoForm");
    const todoTaskInput = document.querySelector("#todoTask");
    const todoList = document.querySelector("#todoList");

    function renderTodoItem(todo) {
        const li = document.createElement("li");
        li.textContent = todo.todoTask;

        const deleteForm = document.createElement("form");
        deleteForm.action = "/delete";
        deleteForm.method = "post";

        const todoIdInput = document.createElement("input");
        todoIdInput.type = "hidden";
        todoIdInput.name = "todoId";
        todoIdInput.value = todo.todoId;

        const deleteButton = document.createElement("button");
        deleteButton.type = "submit";
        deleteButton.textContent = "Delete";

        deleteForm.appendChild(todoIdInput);
        deleteForm.appendChild(deleteButton);

        li.appendChild(deleteForm);
        todoList.appendChild(li);
    }

    function renderTodos(todos) {
        todoList.innerHTML = "";
        todos.forEach(todo => {
            renderTodoItem(todo);
        });
    }

    todoForm.addEventListener("submit", async event => {
        event.preventDefault();
        const todoTask = todoTaskInput.value;

        if (todoTask) {
            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `todoTask=${encodeURIComponent(todoTask)}`
            });

            const data = await response.json();
            renderTodos(data);
            todoTaskInput.value = "";
        }
    });

    renderTodos(initialData);
});
