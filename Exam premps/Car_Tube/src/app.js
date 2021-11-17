import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { homePage } from "./views/home.js";
import { logout } from "./api/data.js";
import { allListingPage } from "./views/all-listing.js";
import { createPage } from "./views/create.js";
import { detailPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { myListingPage } from "./views/my-listing.js";
import { searchPage } from "./views/search.js";

page("/index.html", middleware, homePage);
page("/", middleware, homePage);
page("/login", middleware, loginPage);
page("/register", middleware, registerPage);
page("/all-listing", middleware, allListingPage);
page("/create", middleware, createPage);
page("/details/:id", middleware, detailPage);
page("/edit/:id", middleware, editPage);
page("/my-listing", middleware, myListingPage);
page("/search", middleware, searchPage);

let main = document.querySelector("#site-content");
document.querySelector("#logout").addEventListener("click", async () => {
  await logout();
  setUserNav();
  page.redirect("/");
});

setUserNav();
page.start();

function setUserNav() {
  let username = sessionStorage.getItem("username");

  if (username) {
    document.querySelector("#profile").style.display = "block";
    document.querySelector("#guest").style.display = "none";
    document.querySelector("#wellcome").textContent = `Wellcome ${username}`;
  } else {
    document.querySelector("#profile").style.display = "none";
    document.querySelector("#guest").style.display = "block";
  }
}

function middleware(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  next();
}
