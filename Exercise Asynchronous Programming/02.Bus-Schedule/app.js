function solve() {
  let url = `http://localhost:3030/jsonstore/bus/schedule`;

  getAll();

  async function getAll() {
    let responce = await fetch(url);
    let data = await responce.json();

    console.log(data);
  }

  function depart() {
    console.log("Depart TODO...");
  }

  function arrive() {
    console.log("Arrive TODO...");
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
