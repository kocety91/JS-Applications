function lockedProfile() {
  let main = document.querySelector("#main");
  main.innerHTML = "";

  (async () => {
    let responce = await fetch(
      "http://localhost:3030/jsonstore/advanced/profiles"
    );
    let data = await responce.json();

    Object.values(data).forEach((key, i) => {
      let currentProfile = createProfile(
        key.age,
        key.email,
        key.username,
        i + 1
      );
      main.appendChild(currentProfile);
    });
  })();

  function createProfile(age, email, username, id) {
    let div = document.createElement("div");
    div.classList.add("profile");

    let image = document.createElement("img");
    image.classList.add("userIcon");
    image.src = "./iconProfile2.png";

    let labelLock = document.createElement("label");
    labelLock.textContent = "Lock";

    let lockInput = document.createElement("input");
    lockInput.type = "radio";
    lockInput.value = "lock";
    lockInput.name = `user${id}Locked`;
    lockInput.checked = true;

    let labelUnlock = document.createElement("label");
    labelUnlock.textContent = "Unlock";

    let unlockInput = document.createElement("input");
    unlockInput.type = "radio";
    unlockInput.value = "unlock";
    unlockInput.name = `user${id}Locked`;

    let hr = document.createElement("hr");

    let userNameLabel = document.createElement("label");
    userNameLabel.textContent = "Username";

    let inputUserName = document.createElement("input");
    inputUserName.value = username;
    inputUserName.type = "text";
    inputUserName.name = `user${id}Locked`;
    inputUserName.disabled = true;
    inputUserName.readOnly = true;

    let divFields = document.createElement("div");
    divFields.id = "user1HiddenFields";

    let hrForDivFields = document.createElement("hr");

    let labelForDivFields = document.createElement("label");
    labelForDivFields.textContent = "Email:";

    let inputForDivFields = document.createElement("input");
    inputForDivFields.value = email;
    inputForDivFields.type = "email";
    inputForDivFields.name = `user${id}Email`;
    inputForDivFields.disabled = true;
    inputForDivFields.readOnly = true;

    let label2ForDivDields = document.createElement("label");
    label2ForDivDields.textContent = "Age:";
    let input2ForDivFields = document.createElement("input");
    input2ForDivFields.value = age;
    input2ForDivFields.type = "email";
    input2ForDivFields.name = `user${id}Age`;
    input2ForDivFields.disabled = true;
    input2ForDivFields.readOnly = true;

    divFields.appendChild(hrForDivFields);
    divFields.appendChild(labelForDivFields);
    divFields.appendChild(inputForDivFields);
    divFields.appendChild(label2ForDivDields);
    divFields.appendChild(input2ForDivFields);

    let btn = document.createElement("button");
    btn.textContent = "Show more";

    btn.addEventListener("click", showMore);

    div.appendChild(image);
    div.appendChild(labelLock);
    div.appendChild(lockInput);
    div.appendChild(labelUnlock);
    div.appendChild(unlockInput);
    div.appendChild(hr);
    div.appendChild(userNameLabel);
    div.appendChild(inputUserName);
    div.appendChild(divFields);
    div.appendChild(btn);

    return div;
  }

  function showMore(e) {
    let profile = e.target.parentElement;
    let hidelElementDiv = e.target.previousElementSibling;
    let showMoreBtn = e.target;

    let radiobtn = profile.querySelector('input[type="radio"]:checked');

    if (radiobtn.value !== "unlock") {
      return;
    }

    showMoreBtn.textContent =
      showMoreBtn.textContent === "Show more" ? "Hide it" : "Show more";

    hidelElementDiv.style.display =
      hidelElementDiv.style.display === "block" ? "none" : "block";
  }
}
