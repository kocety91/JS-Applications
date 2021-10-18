function getInfo() {
  let stopId = document.querySelector("#stopId");
  let stopName = document.querySelector("#stopName");
  let ul = document.querySelector("#buses");
  let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId.value} `;

  getBusInfo();

  async function getBusInfo() {
    try {
      let responce = await fetch(url);
      let data = await responce.json();

      for (const key in data.buses) {
        let li = document.createElement("li");
        li.textContent = `Bus ${key} arrives in ${data.buses[key]}`;
        ul.appendChild(li);
      }

      stopName.textContent = data.name;
    } catch (error) {
      stopName.textContent = "Error";
    }
  }

  stopId.value = "";
}
