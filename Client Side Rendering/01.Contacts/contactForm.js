import { html } from "https://unpkg.com/lit-html?module";

export const myTemplate = (data) =>
  html`<div class="contact card">
    <div>
      <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
      <h2>Name: ${data.name}</h2>
      <button @click=${showDetails} class="detailsBtn">Details</button>
      <div class="details" id=${data.id}>
        <p>Phone number: ${data.phoneNumber}</p>
        <p>Email: ${data.email}</p>
      </div>
    </div>
  </div>`;

function showDetails(e) {
  let details = e.target.nextElementSibling;

  if (details.classList.contains("details")) {
    details.classList.remove("details");
  } else {
    details.classList.add("details");
  }
}
