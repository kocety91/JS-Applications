import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js";

let registerTemplete = (onRegister) => html`
  <section id="register-page" class="register">
    <form id="register-form" action="" method="" @submit=${onRegister}>
      <fieldset>
        <legend>Register Form</legend>
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
        <p class="field">
          <label for="repeat-pass">Repeat Password</label>
          <span class="input">
            <input
              type="password"
              name="confirm-pass"
              id="repeat-pass"
              placeholder="Repeat Password"
            />
          </span>
        </p>
        <input class="button submit" type="submit" value="Register" />
      </fieldset>
    </form>
  </section>
`;

export async function registerPage(ctx) {
  ctx.render(registerTemplete(onRegister));

  async function onRegister(e) {
    e.preventDefault();

    let formDta = new FormData(e.target);

    let email = formDta.get("email");
    let password = formDta.get("password");
    let confirmPass = formDta.get("confirm-pass");

    try {
      if (email == "" || password == "" || confirmPass == "") {
        throw new Error("All fields should be filled !");
      } else if (password != confirmPass) {
        throw new Error("Password and confirmPass should be the same !");
      }

      await register(email, password);
      ctx.setUserNav();
      ctx.page.redirect("/");
    } catch (error) {
      alert(error.message);
    }
  }
}
