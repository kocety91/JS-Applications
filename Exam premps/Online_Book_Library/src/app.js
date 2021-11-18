import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { logout } from "./api/data.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { dashboardPage } from "./views/dashboard.js";
import { addPage } from "./views/add.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";

let main = document.querySelector("#site-content");
document.querySelector("#logout").addEventListener("click", async () => {
  await logout();
  setUserNav();
  page.redirect("/");
});

page("/index.html", middleware, dashboardPage);
page("/", middleware, dashboardPage);
page("/login", middleware, loginPage);
page("/register", middleware, registerPage);
page("/add", middleware, addPage);
page("/details/:id", middleware, detailsPage);
page("/edit/:id", middleware, editPage);

setUserNav();
page.start();

function middleware(ctx, next) {
  ctx.render = (templete) => render(templete, main);
  ctx.setUserNav = setUserNav;
  next();
}

function setUserNav() {
  let email = sessionStorage.getItem("email");
  if (email == null) {
    document.querySelector("#user").style.display = "none";
    document.querySelector("#guest").style.display = "block";
  } else {
    document.querySelector("#user").style.display = "block";
    document.querySelector("#welcome-msg").textContent = `Wellcome ${email}`;
    document.querySelector("#guest").style.display = "none";
  }
}
