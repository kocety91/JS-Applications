function attachEvents() {
  let url = "http://localhost:3030/jsonstore/forecaster/locations";
  let forecast = document.querySelector("#forecast");
  let current = document.querySelector("#current");
  let upcoming = document.querySelector("#upcoming");
  document
    .querySelector("#submit")
    .addEventListener("click", () => getData(url));
}

async function getData(url) {
  let responce = await fetch(url);
  let input = document.querySelector("#location");
  let symbols = {
    sunny: "☀",
    "partly sunny": "⛅",
    overcast: "☁",
    rain: "☂",
    degrees: "°",
  };

  if (!responce.ok) {
    throw new Error();
  }

  let data = await responce.json();
  let obj = data.find((x) => x.name == input.value);

  if (!obj) {
    throw new Error();
  }

  forecast.style.display = "block";
  let ss = await getDataForToday(obj.code, symbols);
  current.appendChild(ss);

  let jj = await getDataForUpcoming(obj.code, symbols);
  upcoming.appendChild(jj);
}

async function getDataForToday(code, symbols) {
  let responce = await fetch(
    `http://localhost:3030/jsonstore/forecaster/today/${code}`
  );
  if (!responce.ok) {
    throw new Error();
  }
  let data = await responce.json();

  let div = document.createElement("div");
  div.classList.add("forecasts");

  let spanSymbol = document.createElement("span");
  spanSymbol.textContent = symbols[data.forecast.condition.toLowerCase()];
  spanSymbol.classList.add("condition", "symbol");

  let spanCondtion = document.createElement("span");
  spanCondtion.classList.add("condition");

  let spanForecastDateOne = document.createElement("span");
  spanForecastDateOne.classList.add("forecast-data");
  spanForecastDateOne.textContent = data.name;

  let spanForecastDateTwo = document.createElement("span");
  spanForecastDateTwo.classList.add("forecast-data");
  spanForecastDateTwo.textContent = `${data.forecast.low}°/${data.forecast.high}°`;

  let spanForecastDateThree = document.createElement("span");
  spanForecastDateThree.classList.add("forecast-data");
  spanForecastDateThree.textContent = data.forecast.condition;

  spanCondtion.appendChild(spanForecastDateOne);
  spanCondtion.appendChild(spanForecastDateTwo);
  spanCondtion.appendChild(spanForecastDateThree);

  div.appendChild(spanSymbol);
  div.appendChild(spanCondtion);

  return div;
}

async function getDataForUpcoming(code, symbols) {
  let responce = await fetch(
    `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`
  );

  if (!responce.ok) {
    throw new Error();
  }
  let data = await responce.json();

  let div = document.createElement("div");
  div.classList.add("forecast-info");

  data.forecast.forEach((x) => {
    let spanUpcoming = document.createElement("span");
    spanUpcoming.classList.add("upcoming");

    let spanSymbol = document.createElement("span");
    spanSymbol.classList.add("symbol");
    spanSymbol.textContent = symbols[x.condition.toLowerCase()];

    let spanDegreece = document.createElement("span");
    spanDegreece.classList.add("forecast-data");
    spanDegreece.textContent = `${x.low}° / ${x.high}°`;

    let spanWeather = document.createElement("span");
    spanWeather.classList.add("forecast-data");
    spanWeather.textContent = x.condition;

    spanUpcoming.appendChild(spanSymbol);
    spanUpcoming.appendChild(spanDegreece);
    spanUpcoming.appendChild(spanWeather);

    div.appendChild(spanUpcoming);
  });
  return div;
}

attachEvents();
