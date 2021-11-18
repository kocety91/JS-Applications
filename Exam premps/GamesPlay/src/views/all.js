import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../api/data.js";

const allTemplate = (data) => html`
  <section id="catalog-page">
    <h1>All Games</h1>
    ${data.length == 0
      ? html` <h3 class="no-articles">No articles yet</h3>`
      : data.map(signleTemplate)}
  </section>
`;

const signleTemplate = (game) => html`
  <div class="allGames">
    <div class="allGames-info">
      <img src="${game.imageUrl}" />
      <h6>${game.category}</h6>
      <h2>${game.title}</h2>
      <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
  </div>
`;

export async function allPage(ctx) {
  let games = await getAll();
  ctx.render(allTemplate(games));
}
