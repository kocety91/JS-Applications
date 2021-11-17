import page from "../node_modules/page/page.mjs";
import { loginPage } from "../src/views/login.js";
import { render } from "../node_modules/lit-html/lit-html.js";
import { registerPage } from "../src/views/register.js";
import { homePage } from "../src/views/home.js";
import { logout } from "./api/api.js";
import { createPage } from "./views/create.js";
import { allPage } from "./views/all.js";
import { deatilPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { profilePage } from "./views/profile.js";

let main = document.querySelector("main");
document.querySelector("#logout").addEventListener("click", async () => {
  await logout();
  page.redirect("/index.html");
});

page("/", myRender, homePage);
page("/index.html", myRender, homePage);
page("/login", myRender, loginPage);
page("/register", myRender, registerPage);
page("/create", myRender, createPage);
page("/all", myRender, allPage);
page("/details/:id", myRender, deatilPage);
page("/edit/:id", myRender, editPage);
page("/profile", myRender, profilePage);

setUserNav();
page.start();

function setUserNav() {
  let email = sessionStorage.getItem("email");
  if (email == null) {
    document.querySelector(".user").style.display = "none";
    document.querySelector(".guest").style.display = "block";
  } else {
    document.querySelector(".user").style.display = "block";
    document.querySelector("#user-email").textContent = `Wellcome ${email}`;
    document.querySelector(".guest").style.display = "none";
  }
}

function myRender(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  next();
}
