import { html, render } from "https://unpkg.com/lit-html?module";
import { cats } from "./catSeeder.js";

let catsTemplate = (array) => html`
  <ul>
    ${array.map(
      (x) => html`
        <li>
          <img
            src="./images/${x.imageLocation}.jpg"
            width="250"
            height="250"
            alt="Card image cap"
          />
          <div class="info">
            <button @click=${showInfo} class="showBtn">Show status code</button>
            <div class="status" style="display: none" id=${x.id}>
              <h4>Status Code: ${x.statusCode}</h4>
              <p>${x.statusMessage}</p>
            </div>
          </div>
        </li>
      `
    )};
  </ul>
`;

let all = document.querySelector("#allCats");

render(catsTemplate(cats), all);

function showInfo(e) {
  let hidenElement = e.target.nextElementSibling;

  if (hidenElement.style.display == "none") {
    hidenElement.style.display = "block";
    e.target.textContent = `Hide status code`;
  } else if (hidenElement.style.display == "block") {
    hidenElement.style.display = "none";
    e.target.textContent = `Show status code`;
  }
}
