import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, dele } from "../api/data.js";

const detailsTemplate = (book, onDelete) => html`
  <section id="details-page" class="details">
    <div class="book-information">
      <h3>${book.title}</h3>
      <p class="type">Type: ${book.type}</p>
      <p class="img"><img src="${book.imageUrl}" /></p>

      ${book._ownerId == sessionStorage.getItem("userId")
        ? html` <div class="actions">
            <a class="button" href="/edit/${book._id}">Edit</a>
            <a class="button" href="javascript:void(0)" @click="${onDelete}"
              >Delete</a
            >
          </div>`
        : ""}
    </div>
    <div class="book-description">
      <h3>Description:</h3>
      <p>${book.description}</p>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  let book = await getById(ctx.params.id);
  ctx.render(detailsTemplate(book, onDelete));

  async function onDelete() {
    let myConfi = confirm("Are u sure ? ");

    if (myConfi) {
      await dele(book._id);
      ctx.setUserNav();
      ctx.page.redirect("/");
    }
  }
}
