document.querySelector("#register").addEventListener("submit", registerUser);
document.querySelector("#login").addEventListener("submit", loginUser);

async function registerUser(e) {
  e.preventDefault();
  let formData = new FormData(e.target);

  let email = formData.get("email");
  let password = formData.get("password");
  let repass = formData.get("rePass");

  if (!email || !password || password !== repass) {
    return;
  }

  let data = await requests("http://localhost:3030/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  localStorage.setItem("authorization", data.accessToken);
  window.location.assign("./index.html");
}

async function loginUser() {}

async function requests(url, options) {
  let responce = await fetch(url, options);

  if (!responce.ok) {
    let error = await responce.json();
    alert(error.message);
    throw new Error(error.message);
  }

  let data = await responce.json();

  return data;
}
