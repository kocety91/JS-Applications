import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, update } from "../api/data.js";

const editTemplate = (book, onUpdate) => html`
  <section id="edit-page" class="edit">
    <form id="edit-form" action="#" method="" @submit="${onUpdate}">
      <fieldset>
        <legend>Edit my Book</legend>
        <p class="field">
          <label for="title">Title</label>
          <span class="input">
            <input type="text" name="title" id="title" .value="${book.title}" />
          </span>
        </p>
        <p class="field">
          <label for="description">Description</label>
          <span class="input">
            <textarea name="description" id="description">
${book.description}</textarea
            >
          </span>
        </p>
        <p class="field">
          <label for="image">Image</label>
          <span class="input">
            <input
              type="text"
              name="imageUrl"
              id="image"
              .value="${book.imageUrl}"
            />
          </span>
        </p>
        <p class="field">
          <label for="type">Type</label>
          <span class="input">
            <select id="type" name="type" value="Fiction">
              <option value="Fiction" selected>Fiction</option>
              <option value="Romance">Romance</option>
              <option value="Mistery">Mistery</option>
              <option value="Classic">Clasic</option>
              <option value="Other">Other</option>
            </select>
          </span>
        </p>
        <input class="button submit" type="submit" value="Save" />
      </fieldset>
    </form>
  </section>
`;

export async function editPage(ctx) {
  let book = await getById(ctx.params.id);
  ctx.render(editTemplate(book, onUpdate));

  async function onUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let title = formData.get("title");
    let description = formData.get("description");
    let imageUrl = formData.get("imageUrl");
    let type = formData.get("type");

    try {
      if (title == "" || description == "" || imageUrl == "" || type == "") {
        throw new Error("All fileds must be filled!");
      }

      await update(book._id, {
        title,
        description,
        imageUrl,
        type,
      });
      ctx.page.redirect("/details/" + book._id);
      ctx.setUserNav();
    } catch (error) {
      alert(error.message);
    }
  }
}
