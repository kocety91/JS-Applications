import { html } from "../../node_modules/lit-html/lit-html.js";

const myListingTemplate = (data) => html`
  <section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
      <div class="listing">
        ${data.length == 0
          ? html` <p class="no-cars">You haven't listed any cars yet.</p>`
          : data.map(signleTemplate)}
      </div>
    </div>
  </section>
`;

const signleTemplate = (car) => html`
  <div class="preview">
    <img src="${car.imageUrl}" />
  </div>
  <h2>${car.brand + " " + car.model}</h2>
  <div class="info">
    <div class="data-info">
      <h3>Year: ${car.year}</h3>
      <h3>Price: ${car.price} $</h3>
    </div>
    <div class="data-buttons">
      <a href="/details/${car._id}" class="button-carDetails">Details</a>
    </div>
  </div>
`;

export async function myListingPage(ctx) {}
