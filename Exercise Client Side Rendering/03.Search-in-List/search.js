import { html, render } from "https://unpkg.com/lit-html?module";
import { towns } from "./towns.js";

let tid = document.querySelector("#towns");
let baseTowns = towns.map((t) => ({ name: t }));

let createTemplate = (data) => html`
  <ul>
    ${data.map((x) => html`<li class=${x.class}>${x.name}</li>`)}
  </ul>
`;

document.querySelector("button").addEventListener("click", findTown);

render(createTemplate(baseTowns), tid);

function findTown() {
  let input = document.querySelector("#searchText").value.toLowerCase();

  let allTowns = towns.map((x) => ({ name: x }));

  let matchedTowns = allTowns.filter((t) =>
    t.name.toLowerCase().includes(input)
  );

  matchedTowns.forEach((t) => (t.class = "active"));

  render(createTemplate(allTowns), tid);

  console.log(allTowns);
}
