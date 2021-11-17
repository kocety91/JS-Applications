import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, deleteForKostaki } from "../api/data.js";

const detailTemplate = (obj, onDelete) => html`
  <section id="meme-details">
    <h1>Meme Title: ${obj.title}</h1>
    <div class="meme-details">
      <div class="meme-img">
        <img alt="meme-alt" src="${obj.imageUrl}" />
      </div>
      <div class="meme-description">
        <h2>Meme Description</h2>
        <p>${obj.description}</p>
        <a class="button warning" href="/edit/${obj._id}">Edit</a>
        <button class="button danger" @click="${onDelete}">Delete</button>
      </div>
    </div>
  </section>
`;

export async function deatilPage(ctx) {
  let id = ctx.params.id;
  let obj = await getById(id);
  ctx.render(detailTemplate(obj, onDelete));

  async function onDelete() {
    try {
      if (obj._ownerId != sessionStorage.getItem("userId")) {
        throw new Error("You are not the owner of this meme !!!");
      }

      const confirmed = confirm("Are you sure?");
      if (confirmed) {
        await deleteForKostaki(id);
        ctx.page.redirect("/all");
      }
    } catch (error) {
      alert(error.message);
    }
  }
}
