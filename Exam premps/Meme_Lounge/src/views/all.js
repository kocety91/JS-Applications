import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../api/data.js";

const allTemplate = (data) => html`
  <section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
      ${data.length == 0
        ? html`<p class="no-memes">No memes in database.</p>`
        : data.map(singleTemplate)}
    </div>
  </section>
`;

const singleTemplate = (single) => html`
  <div class="meme">
    <div class="card">
      <div class="info">
        <p class="meme-title">${single.tile}</p>
        <img class="meme-image" alt="meme-img" src="${single.imageUrl}" />
      </div>
      <div id="data-buttons">
        <a class="button" href="/details/${single._id}">Details</a>
      </div>
    </div>
  </div>
`;

export async function allPage(ctx) {
  let data = await getAll();
  ctx.render(allTemplate(data));
  ctx.setUserNav();
}
