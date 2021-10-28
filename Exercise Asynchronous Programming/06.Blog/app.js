function attachEvents() {
  document.querySelector("#btnLoadPosts").addEventListener("click", getPosts);
  document
    .querySelector("#btnViewPost")
    .addEventListener("click", viewPotsById);
}

async function getPosts() {
  let responce = await fetch("http://localhost:3030/jsonstore/blog/posts");
  let data = await responce.json();

  await createOptions(data);
}

async function createOptions(data) {
  let pots = document.querySelector("#posts");
  Object.values(data).forEach(async (x) => {
    let option = document.createElement("option");
    option.value = x.id;
    option.textContent = x.title;
    pots.appendChild(option);
  });
}

async function viewPotsById(e) {
  let select = e.target.previousElementSibling;
  let id = select.options[select.selectedIndex].value;
  let responce = await fetch(
    `http://localhost:3030/jsonstore/blog/comments/${id}`
  );
  let data = await responce.json();

  console.log(data);
}

attachEvents();
