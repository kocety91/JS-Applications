function solve() {
  let nextStop = {
    name: "Depot",
    next: "depot",
  };
  let info = document.querySelector("#info > span");
  let departBtn = document.querySelector("#depart");
  let arriveBtn = document.querySelector("#arrive");

  async function depart() {
    let responce = await fetch(
      " http://localhost:3030/jsonstore/bus/schedule/" + nextStop.next
    );
    let data = await responce.json();

    nextStop.name = data.name;
    nextStop.next = data.next;
    info.textContent = `Next stop ${data.name}`;
    departBtn.disabled = true;
    arriveBtn.disabled = false;
  }

  function arrive() {
    info.textContent = `Arriving at ${nextStop.name}`;
    departBtn.disabled = false;
    arriveBtn.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
