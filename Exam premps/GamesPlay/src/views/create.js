import { html } from "../../node_modules/lit-html/lit-html.js";
import { create } from "../api/data.js";

const createTemplate = (onCreate) => html`
  <section id="create-page" class="auth">
    <form id="create" @submit="${onCreate}">
      <div class="container">
        <h1>Create Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter game title..."
        />

        <label for="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter game category..."
        />

        <label for="levels">MaxLevel:</label>
        <input
          type="number"
          id="maxLevel"
          name="maxLevel"
          min="1"
          placeholder="1"
        />

        <label for="game-img">Image:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          placeholder="Upload a photo..."
        />

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary"></textarea>
        <input class="btn submit" type="submit" value="Create Game" />
      </div>
    </form>
  </section>
`;

export async function createPage(ctx) {
  ctx.render(createTemplate(onCreate));

  async function onCreate(e) {
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

      await create({
        title,
        category,
        maxLevel,
        imageUrl,
        summary,
      });

      ctx.page.redirect("/");
      ctx.setUserNav();
    } catch (error) {
      alert(error.message);
    }
  }
}
