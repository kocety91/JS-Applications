import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { logout } from "./api/data.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { allPage } from "./views/all.js";
import { homePage } from "./views/home.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";

let main = document.querySelector("main");
document.querySelector("#logout").addEventListener("click", async () => {
  await logout();
  setUserNav();
  page.redirect("/");
});

page("/index.html", middleware, homePage);
page("/", middleware, homePage);
page("/login", middleware, loginPage);
page("/register", middleware, registerPage);
page("/all", middleware, allPage);
page("/create", middleware, createPage);
page("/details/:id", middleware, detailsPage);
page("/edit/:id", middleware, editPage);

page.start();
setUserNav();

function setUserNav() {
  let email = sessionStorage.getItem("email");

  if (email) {
    document.querySelector("#user").style.display = "block";
    document.querySelector("#guest").style.display = "none";
  } else {
    document.querySelector("#user").style.display = "none";
    document.querySelector("#guest").style.display = "block";
  }
}

function middleware(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  next();
}
