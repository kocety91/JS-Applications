function attachEvents() {
  document.querySelector("#submit").addEventListener("click", sendMessage);
  document.querySelector("#refresh").addEventListener("click", showMessage);
}

async function sendMessage() {
  let author = document.querySelector('input[name="author"]').value;
  let content = document.querySelector('input[name="content"]').value;

  const responce = await fetch("http://localhost:3030/jsonstore/messenger", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      author,
      content,
    }),
  });
}

async function showMessage() {
  let message = document.querySelector("#messages");
  message.textContent = "";
  const responce = await fetch("http://localhost:3030/jsonstore/messenger");

  const data = await responce.json();
  message.removeAttribute("disabled");

  Object.values(data).forEach((x) => {
    message.textContent += `${x.author} : ${x.content}\n`;
  });
}

attachEvents();
