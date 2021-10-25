function lockedProfile() {
  let url = "http://localhost:3030/jsonstore/advanced/profiles";
  console.log(getDate(url));
}

async function getDate(url) {
  let responce = await fetch(url);
  let data = await responce.json();

  document.querySelector("button").addEventListener("click", function (e) {
    let locked = document.querySelector("[name=user1Locked]");
    console.log(locked);

    let user1HiddenFields = document.querySelector("#user1HiddenFields");
    user1HiddenFields.style.display = "block";
  });
}
