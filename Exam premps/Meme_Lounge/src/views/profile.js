import { html } from "../../node_modules/lit-html/lit-html.js";
import { profileById } from "../api/data.js";

const profileTemplate = (data) => html`
  <section id="user-profile-page" class="user-profile">
    <article class="user-info">
      <img id="user-avatar-url" alt="user-profile" src="/images/female.png" />
      <div class="user-content">
        <p>Username: ${sessionStorage.getItem("username")}</p>
        <p>Email:${sessionStorage.getItem("email")}</p>
        <p>My memes count: ${data.length}</p>
      </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
      ${data.length == 0
        ? html`<p class="no-memes">No memes in database.</p>`
        : data.map(signleTemplate)}
    </div>
  </section>
`;

const signleTemplate = (single) => html`
  <div class="user-meme">
    <p class="user-meme-title">${single.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${single.imageUrl}" />
    <a class="button" href="/details/${single._id}">Details</a>
  </div>
`;

export async function profilePage(ctx) {
  let data = await profileById();
  console.log(data);
  ctx.render(profileTemplate(data));
}
