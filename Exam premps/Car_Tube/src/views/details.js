import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, deleteCar } from "../api/data.js";

const detailsTemplate = (car, onDelete) => html`
  <!-- Listing Details Page -->
  <section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
      <img src="${car.imageUrl}" />
      <hr />
      <ul class="listing-props">
        <li><span>Brand:</span>${car.brand}</li>
        <li><span>Model:</span>${car.model}</li>
        <li><span>Year:</span>${car.year}</li>
        <li><span>Price:</span>${car.price}$</li>
      </ul>

      <p class="description-para">Description: ${car.description}</p>

      <div class="listings-buttons">
        <a href="/edit/${car._id}" class="button-list">Edit</a>
        <a href="javascript:void(0)" @click="${onDelete}" class="button-list"
          >Delete</a
        >
      </div>
    </div>
  </section>
`;

export async function detailPage(ctx) {
  let id = ctx.params.id;
  let car = await getById(id);
  ctx.render(detailsTemplate(car, onDelete));

  async function onDelete() {
    let confirmed = confirm("Are you sure you wanna delete this car ? ");

    if (confirmed) {
      try {
        if (car._ownerId != sessionStorage.getItem("userId")) {
          throw new Error("You are not owner of this car.");
        }

        await deleteCar(id);
        ctx.page.redirect("/all-listing");
      } catch (error) {
        alert(error.message);
      }
    }
  }
}
