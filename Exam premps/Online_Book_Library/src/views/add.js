import { html } from "../../node_modules/lit-html/lit-html.js";
import { create } from "../api/data.js";

const addTemplate = (onCreate) => html`
  <section id="create-page" class="create">
    <form id="create-form" action="" method="" @submit="${onCreate}">
      <fieldset>
        <legend>Add new Book</legend>
        <p class="field">
          <label for="title">Title</label>
          <span class="input">
            <input type="text" name="title" id="title" placeholder="Title" />
          </span>
        </p>
        <p class="field">
          <label for="description">Description</label>
          <span class="input">
            <textarea
              name="description"
              id="description"
              placeholder="Description"
            ></textarea>
          </span>
        </p>
        <p class="field">
          <label for="image">Image</label>
          <span class="input">
            <input type="text" name="imageUrl" id="image" placeholder="Image" />
          </span>
        </p>
        <p class="field">
          <label for="type">Type</label>
          <span class="input">
            <select id="type" name="type">
              <option value="Fiction">Fiction</option>
              <option value="Romance">Romance</option>
              <option value="Mistery">Mistery</option>
              <option value="Classic">Clasic</option>
              <option value="Other">Other</option>
            </select>
          </span>
        </p>
        <input class="button submit" type="submit" value="Add Book" />
      </fieldset>
    </form>
  </section>
`;

export async function addPage(ctx) {
  ctx.render(addTemplate(onCreate));

  async function onCreate(e) {
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

      await create({
        title,
        description,
        imageUrl,
        type,
      });
      ctx.page.redirect("/");
      ctx.setUserNav();
    } catch (error) {
      alert(error.message);
    }
  }
}
