import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";

const loginTemplate = (onSubmit) => html`
  <section id="login">
    <form id="login-form" @submit="${onSubmit}">
      <div class="container">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" placeholder="Enter Email" name="email" type="text" />
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          name="password"
        />
        <input type="submit" class="registerbtn button" value="Login" />
        <div class="container signin">
          <p>Dont have an account?<a href="/register">Sign up</a>.</p>
        </div>
      </div>
    </form>
  </section>
`;

export async function loginPage(ctx) {
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      if (email == "" || password == "") {
        throw new Error("all fields are required !");
      }
      await login(email, password);
      ctx.setUserNav();
      ctx.page.redirect("/index.html");
    } catch (error) {
      alert(error.message);
    }
  }
}
