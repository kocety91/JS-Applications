import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";

const loginTemplete = (onLogin) => html`
  <section id="login-page" class="login">
    <form id="login-form" action="" method="" @submit=${onLogin}>
      <fieldset>
        <legend>Login Form</legend>
        <p class="field">
          <label for="email">Email</label>
          <span class="input">
            <input type="text" name="email" id="email" placeholder="Email" />
          </span>
        </p>
        <p class="field">
          <label for="password">Password</label>
          <span class="input">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </span>
        </p>
        <input class="button submit" type="submit" value="Login" />
      </fieldset>
    </form>
  </section>
`;

export async function loginPage(ctx) {
  ctx.render(loginTemplete(onLogin));

  async function onLogin(e) {
    e.preventDefault();

    let formDta = new FormData(e.target);

    let email = formDta.get("email");
    let password = formDta.get("password");

    try {
      if (email == "" || password == "") {
        throw new Error("All fields should be filled !");
      }

      await login(email, password);
      ctx.setUserNav();
      ctx.page.redirect("/");
    } catch (error) {
      alert(error.message);
    }
  }
}
