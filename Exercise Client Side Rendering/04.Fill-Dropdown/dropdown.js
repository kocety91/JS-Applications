import { render } from "https://unpkg.com/lit-html?module";
import { createAllTemplate, createSingleTemplate } from "./template.js";

let menu = document.querySelector("#menu");

document.querySelector("input[type=Submit]").addEventListener("click", addItem);

async function addItem(e) {
  e.preventDefault();
  let inputText = document.querySelector("input[type=text]").value;
  if (inputText == "") {
    return;
  }

  let responce = await fetch(
    "http://localhost:3030/jsonstore/advanced/dropdown",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputText,
      }),
    }
  );

  await getData();
}

window.addEventListener("load", getData);

async function getData() {
  let responce = await fetch(
    "http://localhost:3030/jsonstore/advanced/dropdown "
  );
  let data = await responce.json();
  let array = Object.values(data);

  render(createAllTemplate(array), menu);
}
