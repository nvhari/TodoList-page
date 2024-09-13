document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '12345') {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('todolist-page').style.display = 'block';
    } else {
        document.getElementById('error').textContent = 'Invalid credentials!';
    }
});

document.getElementById('logout-btn').addEventListener('click', function() {
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('todolist-page').style.display = 'none';
});

document.getElementById('todolist-btn').addEventListener('click', function() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => displayTodos(data))
        .catch(error => console.log('Error:', error));
});

let completedTasksCount = 0;

function displayTodos(todos) {
    const tbody = document.querySelector('#todolist-table tbody');
    tbody.innerHTML = ''; // Clear any existing rows
    document.getElementById('todolist-table').style.display = 'table'; // Show table

    todos.forEach(todo => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = todo.id;
        row.appendChild(idCell);

        const titleCell = document.createElement('td');
        titleCell.textContent = todo.title;
        row.appendChild(titleCell);

        const completedCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.disabled = todo.completed;
        checkbox.checked = todo.completed;

        if (!todo.completed) {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    completedTasksCount++;
                } else {
                    completedTasksCount--;
                }

                if (completedTasksCount === 5) {
                    new Promise((resolve) => {
                        resolve('Congrats, you have completed 5 tasks');
                    }).then(message => {
                        document.getElementById('completed-message').textContent = message;
                    });
                }
            });
        }

        completedCell.appendChild(checkbox);
        row.appendChild(completedCell);

        tbody.appendChild(row);
    });
}
