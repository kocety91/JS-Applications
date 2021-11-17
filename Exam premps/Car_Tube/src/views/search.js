import { html } from "../../node_modules/lit-html/lit-html.js";
import { search } from "../api/data.js";

const allTemplate = (cars, onSearch) => html`
  ${searchTemplate(onSearch)}

  <h2>Results:</h2>
  <div class="listings">
    ${cars.length == 0
      ? html`<p class="no-cars">No results.</p>`
      : cars.map(singleTemplate)}
  </div>
`;

const singleTemplate = (car) => html`
  <div class="listing">
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
  </div>
`;

const searchTemplate = (onSearch) => html`
  <section id="search-cars">
    <h1>Filter by year</h1>
    <div class="container">
      <input
        id="search-input"
        type="text"
        name="search"
        placeholder="Enter desired production year"
      />
      <button class="button-list" @click="${onSearch}">Search</button>
    </div>
  </section>
`;

export async function searchPage(ctx) {
  ctx.render(searchTemplate(onSearch));

  async function onSearch(e) {
    let year = e.target.previousElementSibling;
    let array = await search(year.value);
    ctx.render(allTemplate(array, onSearch));
  }
}
