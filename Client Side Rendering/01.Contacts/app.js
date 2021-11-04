import { html, render } from "https://unpkg.com/lit-html?module";
import { contacts } from "./contacts.js";
import { myTemplate } from "./contactForm.js";

let div = document.querySelector("#contacts");

div.addEventListener("click", showDetails);

let elements = contacts.map(myTemplate);
render(elements, div);

function showDetails(e) {
  if (!e.target.classList.contains("detailsBtn")) {
    return;
  }
  let hidenDiv = e.target.nextElementSibling;
  console.log(hidenDiv.classList.contains("details"));

  if (!hidenDiv.classList.contains("details")) {
    hidenDiv.classList.remove("details");
  } else {
    hidenDiv.classList.add("details");
  }
}
