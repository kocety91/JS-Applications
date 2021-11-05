import { render } from "https://unpkg.com/lit-html?module";
import { createMultiTemplate } from "./template.js";

window.addEventListener("load", getData);
let tbody = document.querySelector("tbody");
let array = [];

async function getData() {
  let responce = await fetch("http://localhost:3030/jsonstore/advanced/table");
  let data = await responce.json();
  array = Object.values(data);

  render(createMultiTemplate(array), tbody);
}

function solve() {
  document.querySelector("#searchBtn").addEventListener("click", onClick);

  async function onClick() {
    let searchField = document.querySelector("#searchField");
    let textInput = searchField.value.toLowerCase();

    let copyArray = array.map((x) => Object.assign({}, x));
    let matched = copyArray.filter((s) =>
      Object.values(s).some((val) => val.toLowerCase().includes(textInput))
    );
    matched.forEach((x) => (x.class = "select"));
    render(createMultiTemplate(copyArray), tbody);
    searchField.value = "";
  }
}

solve();
