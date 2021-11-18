import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, edit } from "../api/data.js";

const editTemplate = (game, onEdit) => html`
  <!-- Edit Page ( Only for the creator )-->
  <section id="edit-page" class="auth">
    <form id="edit" @submit="${onEdit}">
      <div class="container">
        <h1>Edit Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" .value="${game.title}" />

        <label for="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          .value="${game.category}"
        />

        <label for="levels">MaxLevel:</label>
        <input
          type="number"
          id="maxLevel"
          name="maxLevel"
          min="1"
          .value="${game.maxLevel}"
        />

        <label for="game-img">Image:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          .value="${game.imageUrl}"
        />

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary">${game.summary}</textarea>
        <input class="btn submit" type="submit" value="Edit Game" />
      </div>
    </form>
  </section>
`;

export async function editPage(ctx) {
  let game = await getById(ctx.params.id);
  ctx.render(editTemplate(game, onEdit));

  async function onEdit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let title = formData.get("title");
    let category = formData.get("category");
    let maxLevel = formData.get("maxLevel");
    let imageUrl = formData.get("imageUrl");
    let summary = formData.get("summary");

    try {
      if (
        title == "" ||
        category == "" ||
        maxLevel == "" ||
        imageUrl == "" ||
        summary == ""
      ) {
        throw new Error("All fields must be filled!");
      }

      await edit(game._id, {
        title,
        category,
        maxLevel,
        imageUrl,
        summary,
      });

      ctx.page.redirect("/details/" + game._id);
      ctx.setUserNav();
    } catch (error) {
      alert(error.message);
    }
  }
}
