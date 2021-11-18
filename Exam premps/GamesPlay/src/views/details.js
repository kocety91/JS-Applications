import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  getById,
  dele,
  getAllCommentsByGameId,
  createComment,
} from "../api/data.js";

const detailTemplate = (
  game,
  onDelete,
  comments,
  onComment,
  isCommentVisible
) => html`
  <!--Details Page-->
  <section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      <div class="game-header">
        <img class="game-img" src="${game.imageUrl}" />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
      </div>

      <p class="text">${game.summary}</p>

      ${multipleCommentsTemplete(comments)};
      ${game._ownerId != sessionStorage.getItem("userId")
        ? ""
        : html`<div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a href="javascript:void(0)" @click="${onDelete}" class="button"
              >Delete</a
            >
          </div>`}
    </div>

    ${isCommentVisible == false ? createCommentTemplete(onComment) : ""};
  </section>
`;

const singleCommentTemplete = (data) => html`
  <li class="comment">
    <p>Content: ${data.comment}</p>
  </li>
`;

const multipleCommentsTemplete = (comments) => html`
  <div class="details-comments">
    <h2>Comments:</h2>
    ${comments.length == 0
      ? html`<p class="no-comment">No comments.</p>`
      : html`<ul>
          ${comments.map(singleCommentTemplete)}
        </ul>`}
  </div>
`;

const createCommentTemplete = (onComment) => html`
  <article class="create-comment">
    <label>Add new comment:</label>
    <form class="form" @submit=${onComment}>
      <textarea name="comment" placeholder="Comment......"></textarea>
      <input class="btn submit" type="submit" value="Add Comment" />
    </form>
  </article>
`;

export async function detailsPage(ctx) {
  let gameId = ctx.params.id;
  let [game, comments] = await Promise.all([
    getById(gameId),
    getAllCommentsByGameId(gameId),
  ]);

  let isCommentVisible = showHideComment(game);
  console.log(isCommentVisible);
  console.log(game._ownerId);
  console.log(sessionStorage.getItem("userId"));

  ctx.render(
    detailTemplate(game, onDelete, comments, onComment, isCommentVisible)
  );

  async function onDelete() {
    let myconfirm = confirm("Are you sure you want to delete this game ? ");

    if (myconfirm) {
      await dele(ctx.params.id);
      ctx.setUserNav();
      ctx.page.redirect("/");
    }
  }

  async function onComment(e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    const comment = formData.get("comment");

    try {
      if (comment == "") {
        throw new Error("All fields should be filled !");
      }

      await createComment({ gameId, comment });
      ctx.page.redirect("/details/" + gameId);
      e.target.reset();
    } catch (error) {
      alert(error.message);
    }
  }
}

function showHideComment(game) {
  const sessionStrUserId = sessionStorage.getItem("userId");
  if (game._ownerId == sessionStrUserId) {
    return true;
  } else if (sessionStrUserId == null) {
    return true;
  }

  return false;
}
