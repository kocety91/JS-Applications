function loadCommits() {
  let username = document.querySelector("#username");
  let repo = document.querySelector("#repo");
  let ul = document.querySelector("#commits");

  //repos/{owner}/{repo}/commits
  let url = `https://api.github.com/repos/${username.value}/${repo.value}/commits`;

  fetchCommits();

  async function fetchCommits() {
    let ss = "";
    try {
      const response = await fetch(url);
      ss = response.status;
      const data = await response.json();

      for (const key in data) {
        let li = document.createElement("li");
        li.textContent = `${data[key].commit.author.name}: ${data[key].commit.message}`;

        ul.appendChild(li);
      }
    } catch (error) {
      let errorLi = document.createElement("li");
      errorLi.textContent = `Error: ${ss} (Not Found)`;
      ul.appendChild(errorLi);
    }
  }
}
