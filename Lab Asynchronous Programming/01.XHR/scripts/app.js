function loadRepos() {
  let url = "https://api.github.com/users/testnakov/repos";
  const htttpRequest = new XMLHttpRequest();
  htttpRequest.addEventListener("readystatechange ", function () {
    if (htttpRequest.readyState == 4 && htttpRequest.status == 200) {
      document.getElementById("res").textContent = htttpRequest.responseText;
    }
  });

  htttpRequest.open("GET", url);
  htttpRequest.send();
}
