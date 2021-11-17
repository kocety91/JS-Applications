import { render } from "https://unpkg.com/lit-html?module";
import { creteLoadBooksBtn, creteTable } from "./template.js";

window.addEventListener("load", loadData);
let body = document.createElement("body");

async function loadData() {
  let responce = await fetch(
    "http://localhost:3030/jsonstore/collections/books"
  );
  let data = await responce.json();
  let arr = Object.values(data);

  render(creteLoadBooksBtn, body);
  render(creteTable(arr), body);
}
