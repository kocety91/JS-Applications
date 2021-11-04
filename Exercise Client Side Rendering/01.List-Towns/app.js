import { html, render } from "https://unpkg.com/lit-html?module";

let townsTemplate = (array) => html`
  <ul>
    ${array.map((x) => html`<li>${x}</li>`)}
  </ul>
`;

let root = document.querySelector("#root");

document.querySelector(".content").addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(e.target);
  let towns = formData.get("towns").split(",");

  render(townsTemplate(towns), root);
});
