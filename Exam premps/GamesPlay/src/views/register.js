import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js";

const registerTemplate = (onRegister) => html`
  <section id="register-page" class="content auth">
    <form id="register" @submit="${onRegister}">
      <div class="container">
        <div class="brand-logo"></div>
        <h1>Register</h1>

        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="maria@email.com"
        />

        <label for="pass">Password:</label>
        <input type="password" name="password" id="register-password" />

        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password" />

        <input class="btn submit" type="submit" value="Register" />

        <p class="field">
          <span>If you already have profile click <a href="#">here</a></span>
        </p>
      </div>
    </form>
  </section>
`;

export async function registerPage(ctx) {
  ctx.render(registerTemplate(onRegister));

  async function onRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let confirm = formData.get("confirm-password");

    try {
      if (email == "" || password == "" || confirm == "") {
        throw new Error("All fields should be filled !");
      }

      if (password != confirm) {
        throw new Error("Password must match !");
      }

      await register(email, password);
      ctx.setUserNav();
      ctx.page.redirect("/");
    } catch (error) {
      alert(error.message);
    }
  }
}
