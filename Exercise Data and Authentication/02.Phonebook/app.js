function attachEvents() {
  document.querySelector("#btnLoad").addEventListener("click", load);
  document.querySelector("#btnCreate").addEventListener("click", create);
}

async function load() {
  let responce = await fetch("http://localhost:3030/jsonstore/phonebook");
  let data = await responce.json();
  let ss = Object.values(data);
  template(ss);
}

function template(data) {
  let ul = document.querySelector("#phonebook");
  ul.textContent = "";
  data.forEach((x) => {
    let li = document.createElement("li");
    li.textContent = `${x.person}:${x.phone}`;

    let btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.addEventListener("click", (e) => deleteFunc(e, x._id));

    li.appendChild(btn);
    ul.appendChild(li);
  });
}

async function deleteFunc(e, id) {
  let responce = await fetch(
    "http://localhost:3030/jsonstore/phonebook/" + id,
    {
      method: "DELETE",
    }
  );

  e.target.parentElement.remove();
}

async function create() {
  let person = document.querySelector("#person").value;
  let phone = document.querySelector("#phone").value;

  let response = await fetch("http://localhost:3030/jsonstore/phonebook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ person, phone }),
  });

  await load();
}

attachEvents();
