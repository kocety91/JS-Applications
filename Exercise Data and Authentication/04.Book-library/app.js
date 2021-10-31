document.querySelector("#loadBooks").addEventListener("click", loadBooks);
document.querySelector("form").addEventListener("submit", createBook);

async function loadBooks() {
  const responce = await fetch(
    "http://localhost:3030/jsonstore/collections/books"
  );
  const data = await responce.json();
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  Object.entries(data).forEach((x) => {
    let tr = createTableElements(x);
    tbody.appendChild(tr);
  });
}

function createTableElements(x) {
  let tr = document.createElement("tr");

  let tdTitle = document.createElement("td");
  tdTitle.textContent = x[1].title;

  let tdName = document.createElement("td");
  tdName.textContent = x[1].author;

  let tdBtns = document.createElement("td");
  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", (e) => editBook(e, x[0]));
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteBook(x[0]));

  tdBtns.appendChild(editBtn);
  tdBtns.appendChild(deleteBtn);

  tr.appendChild(tdTitle);
  tr.appendChild(tdName);
  tr.appendChild(tdBtns);

  return tr;
}

async function createBook(e) {
  e.preventDefault();
  let formData = new FormData(e.target);

  let title = formData.get("title");
  let author = formData.get("author");

  if (title === "" || author === "") {
    return;
  }

  let responce = await fetch(
    "http://localhost:3030/jsonstore/collections/books",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
      }),
    }
  );

  e.target.reset();
  await loadBooks();
}

async function deleteBook(id) {
  await fetch("http://localhost:3030/jsonstore/collections/books/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await loadBooks();
}

async function editBook(e, id) {
  let tds = e.target.parentElement.parentElement.children;
  let firstTd = tds[0].textContent;
  let secondTd = tds[1].textContent;

  document.querySelector("#create-form").classList.add("form-active");
  let editForm = document.querySelector("#edit-form");
  let inputs = editForm.querySelectorAll("input[type=text]");
  inputs[0].value = firstTd;
  inputs[1].value = secondTd;

  editForm.classList.remove("form-active");
  editForm.addEventListener("submit", (e) => sendData(e, id));
}

async function sendData(e, id) {
  e.preventDefault();
  let formData = new FormData(e.target);

  let title = formData.get("title");
  let author = formData.get("author");

  if (title === "" || author === "") {
    return;
  }

  let responce = await fetch(
    "http://localhost:3030/jsonstore/collections/books/" + id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
      }),
    }
  );

  e.target.reset();
  await loadBooks();
}
