import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../api/data.js";

const dashboardTemplete = (data) => html`
  <section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    <!-- Display ul: with list-items for All books (If any) -->
    <ul class="other-books-list">
      ${data.length == 0
        ? html` <p class="no-books">No books in database!</p>`
        : data.map(signleTemplate)}
    </ul>
  </section>
`;

const signleTemplate = (book) => html`
  <li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}" /></p>
    <a class="button" href="/details/${book._id}">Details</a>
  </li>
`;
export async function dashboardPage(ctx) {
  let books = await getAll();
  ctx.render(dashboardTemplete(books));
}
