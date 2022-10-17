const tableBody1 = document.getElementById("tbody-todos");
const tableBody2 = document.getElementById("tbody-users");

function renderData() {
  const userApi = "https://tony-json-server.herokuapp.com/api/users";
  const todoApi = "https://tony-json-server.herokuapp.com/api/todos";

  const callUserApi = fetch(userApi).then((res) => res.json());
  const callTodoApi = fetch(todoApi).then((res) => res.json());

  Promise.all([callUserApi, callTodoApi]).then((data) => {
    const [users, todos] = data;

    const todo = todos.data.forEach((todo) => {
      const templateTableRow = `
        <tr>
        <td>${todo.title}</td>
        <td>${todo.author}</td>
        <td class="progess"><span class="${todo.severity}">${todo.severity}</span></td>
        <td class="status"><span class="${todo.status}">${todo.status}</span></td>
        </tr>`;
      tableBody1.innerHTML += templateTableRow;
    });

    const user = users.data.forEach((user) => {
      const templateTableRow = `
        <tr>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td><span>${user.role}</span></td>
        <td><span>${user.email}</span></td>
        </tr>`;
      tableBody2.innerHTML += templateTableRow;
    });
  });
}

renderData();
