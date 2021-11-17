import { html } from "../../node_modules/lit-html/lit-html.js";
import { edit, getById } from "../api/data.js";

const editTemplate = (obj, onSubmit) => html`
  <section id="edit-meme">
    <form id="edit-form" @submit="${onSubmit}">
      <h1>Edit Meme</h1>
      <div class="container">
        <label for="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter Title"
          name="title"
          .value="${obj.title}"
        />
        <label for="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter Description"
          name="description"
          .value="${obj.description}"
        >
        </textarea>
        <label for="imageUrl">Image Url</label>
        <input
          id="imageUrl"
          type="text"
          placeholder="Enter Meme ImageUrl"
          name="imageUrl"
          .value="${obj.imageUrl}"
        />
        <input type="submit" class="registerbtn button" value="Edit Meme" />
      </div>
    </form>
  </section>
`;

export async function editPage(ctx) {
  let id = ctx.params.id;
  let obj = await getById(id);

  ctx.render(editTemplate(obj, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const imageUrl = formData.get("imageUrl");

    try {
      if (title == "" || description == "" || imageUrl == "") {
        throw new Error("All fields should be filled !");
      }

      if (obj._ownerId != sessionStorage.getItem("userId")) {
        throw new Error("You are not the owner of this meme !!!");
      }

      await edit(id, { title, description, imageUrl });
      ctx.page.redirect("/details/" + id);
    } catch (error) {
      alert(error.message);
    }
  }
}
