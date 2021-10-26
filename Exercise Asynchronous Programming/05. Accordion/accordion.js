async function solution() {
  let main = document.querySelector("#main");
  let responce = await fetch(
    "http://localhost:3030/jsonstore/advanced/articles/list"
  );
  let data = await responce.json();

  data.forEach(async (x) => {
    let currentArrticle = await createArticle(x._id, x.title);
    main.appendChild(currentArrticle);
  });

  async function createArticle(id, title) {
    let div = document.createElement("div");
    div.classList.add("accordion");

    let divHead = document.createElement("div");
    divHead.classList.add("head");

    let span = document.createElement("span");
    span.textContent = title;
    let btn = document.createElement("button");
    btn.classList.add("button");
    btn.id = id;
    btn.textContent = "More";
    btn.addEventListener("click", showMore);

    divHead.appendChild(span);
    divHead.appendChild(btn);

    let divExtra = document.createElement("div");
    divExtra.classList.add("extra");
    let p = document.createElement("p");
    let data = await getContent(id);
    p.textContent = data.content;

    divExtra.appendChild(p);

    div.appendChild(divHead);
    div.appendChild(divExtra);

    return div;
  }

  async function getContent(id) {
    let responce = await fetch(
      `http://localhost:3030/jsonstore/advanced/articles/details/${id}`
    );
    let data = await responce.json();

    return data;
  }

  function showMore(e) {
    let article = e.target.parentElement.parentElement;
    let extraDiv = article.lastElementChild;
    extraDiv.classList.remove("extra");
    let divHead = article.firstElementChild;
    let btn = divHead.lastElementChild;
    btn.textContent = btn.textContent === "More" ? "Less" : "More";

    extraDiv.style.display =
      extraDiv.style.display === "block" ? "none" : "block";
  }
}

window.addEventListener("load", solution);
