import { html } from "../../node_modules/lit-html/lit-html.js";
import { create } from "../api/data.js";

const createCarTemplate = (onSubmit) => html`
  <section id="create-listing">
    <div class="container">
      <form id="create-form" @submit="${onSubmit}">
        <h1>Create Car Listing</h1>
        <p>Please fill in this form to create an listing.</p>
        <hr />

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand" />

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model" />

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description" />

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year" />

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl" />

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price" />

        <hr />
        <input type="submit" class="registerbtn" value="Create Listing" />
      </form>
    </div>
  </section>
`;

export async function createPage(ctx) {
  ctx.render(createCarTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const brand = formData.get("brand");
    const model = formData.get("model");
    const description = formData.get("description");
    const year = formData.get("year");
    const imageUrl = formData.get("imageUrl");
    const price = formData.get("price");

    try {
      if (
        brand == "" ||
        model == "" ||
        description == "" ||
        year == "" ||
        imageUrl == "" ||
        price == ""
      ) {
        throw new Error("all fields must be filled !!!");
      }

      if (year < 0 || price < 0) {
        throw new Error("year and price must be positive numbers !");
      }

      await create({
        brand,
        model,
        description,
        imageUrl,
        price,
      });

      ctx.page.redirect("/all-listing");
    } catch (error) {
      alert(error.message);
    }
  }
}
