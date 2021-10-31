function attachEvents() {
  document.querySelector(".load").addEventListener("click", showCatches);
}

async function showCatches() {
  let responce = await fetch("http://localhost:3030/data/catches");
  let data = await responce.json();
  let catchElement = document.querySelector("#catches");

  data.forEach((x) => {
    let ss = creaeElements(x);
    catchElement.appendChild(ss);
  });
}

function creaeElements(x) {
  let classElement = document.createElement("div");
  classElement.classList.add("catch");

  let label = document.createElement("label");
  label.textContent = "Angler";

  let inputName = document.createElement("input");
  inputName.type = "text";
  inputName.classList.add("angler");
  inputName.value = x.angler;

  let hrOne = document.createElement("hr");

  let labelTwo = document.createElement("label");
  labelTwo.textContent = "Weight";

  let inputNumber = document.createElement("input");
  inputNumber.type = "number";
  inputNumber.classList.add("weight");
  inputNumber.value = x.weight;

  let hrTwo = document.createElement("hr");

  let labelThree = document.createElement("label");
  labelThree.textContent = "Species";

  let inputSpecies = document.createElement("input");
  inputSpecies.type = "text";
  inputSpecies.classList.add("species");
  inputSpecies.value = x.species;

  let hrThree = document.createElement("hr");

  let labelLocation = document.createElement("label");
  labelLocation.textContent = "Location";

  let inputLocation = document.createElement("input");
  inputLocation.type = "text";
  inputLocation.classList.add("location");
  inputLocation.value = x.location;

  let hrFour = document.createElement("hr");

  let labelFour = document.createElement("label");
  labelFour.textContent = "Bait";

  let inputBait = document.createElement("input");
  inputBait.type = "text";
  inputBait.classList.add("bait");
  inputBait.value = x.bait;

  let hrFive = document.createElement("hr");

  let labelFive = document.createElement("label");
  labelFive.textContent = "Capture Time";

  let inputCaptureTime = document.createElement("input");
  inputCaptureTime.type = "number";
  inputCaptureTime.classList.add("captureTime");
  inputCaptureTime.value = x.captureTime;

  let hrSix = document.createElement("hr");

  let btnUpdate = document.createElement("button");
  btnUpdate.textContent = "Update";
  btnUpdate.disabled = true;
  let btnDelete = document.createElement("button");
  btnDelete.textContent = "Delete";
  btnDelete.disabled = true;

  classElement.appendChild(label);
  classElement.appendChild(inputName);
  classElement.appendChild(hrOne);
  classElement.appendChild(labelTwo);
  classElement.appendChild(inputNumber);
  classElement.appendChild(hrTwo);
  classElement.appendChild(labelThree);
  classElement.appendChild(inputSpecies);
  classElement.appendChild(hrThree);
  classElement.appendChild(labelLocation);
  classElement.appendChild(inputLocation);
  classElement.appendChild(hrFour);
  classElement.appendChild(labelFour);
  classElement.appendChild(inputBait);
  classElement.appendChild(hrFive);
  classElement.appendChild(labelFive);
  classElement.appendChild(inputCaptureTime);
  classElement.appendChild(hrSix);
  classElement.appendChild(btnUpdate);
  classElement.appendChild(btnDelete);

  return classElement;
}

attachEvents();
