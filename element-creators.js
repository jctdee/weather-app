function weatherContentCreator(value, isFahrenheit) {
  const weatherContainer = document.getElementById("weather-content-container");
  resetHeader();
  backButtonCreator();

  // const weatherContent = document.getElementById("weather-content-container");
  const backBtn = document.getElementById("back-to-search-btn");

  const cityHeader = document.createElement("h1");
  cityHeader.textContent = value.name;

  const currDayHour = document.createElement("h5");
  currDayHour.textContent = dateToday();

  const temperatureNow = document.createElement("h2");
  temperatureNow.textContent = temperatureCreator(value.main.temp);

  // CREATE HEADER ICON+TEXT HERE
  const tempContainer = document.createElement("div");
  tempContainer.className = "temperature-container";
  const currImg = document.createElement("img");
  currImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`
  );
  const currFirstP = document.createElement("p");
  currFirstP.textContent = value.weather[0].main;
  const currSecondP = document.createElement("p");
  currSecondP.textContent = value.weather[0].description;
  tempContainer.appendChild(currImg);
  tempContainer.appendChild(currFirstP);
  tempContainer.append(currSecondP);

  // weatherContent.appendChild(cityHeader);
  // weatherContent.appendChild(currDayHour);
  // weatherContent.appendChild(temperatureNow);
  // weatherContent.appendChild(tempContainer);
  insertAfter(tempContainer, backBtn);
  insertAfter(temperatureNow, backBtn);
  insertAfter(currDayHour, backBtn);
  insertAfter(cityHeader, backBtn);
  // END OF HEADER HERE

  // START OF FEELS LIKE HERE
  const feelsLike = document.getElementById("feels-temperature");
  feelsLike.textContent = temperatureCreator(value.main.feels_like);
  // END OF FEELS LIKE HERE

  // START OF HUMIDITY HERE
  const humidity = document.getElementById("humidity-percent");
  humidity.textContent = `${value.main.humidity} %`;
  // END OF HUMIDITY HERE

  // START OF WIND SPEED HERE
  const windSpeed = document.getElementById("wind-speed");
  windSpeed.textContent = `${value.wind.speed} km/h`;
  // END OF WIND SPEED HERE

  // FUNCTIONS START HERE

  function backButtonCreator() {
    const btn = document.createElement("i");
    btn.className = "fa-solid fa-left-long fa-2x";
    btn.id = "back-to-search-btn";

    insertAsFirstChild(btn, weatherContainer);
  }

  function resetHeader() {
    const backBtn = document.getElementById("back-to-search-btn");
    if (backBtn === null) return;
    weatherContainer.removeChild(backBtn);
    const h1 = document.querySelector("h1");
    if (h1 === null) return;
    const h5 = document.querySelector("h5");
    const h2 = document.querySelector("h2");
    const tempContainer = document.querySelector(".temperature-container");

    weatherContainer.removeChild(h1);
    weatherContainer.removeChild(h5);
    weatherContainer.removeChild(h2);
    weatherContainer.removeChild(tempContainer);
  }

  function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }

  function insertAsFirstChild(newNode, existingNode) {
    existingNode.insertBefore(newNode, existingNode.firstChild);
  }

  function dateToday() {
    const currDate = new Date(Date.now());
    const currMonth = currDate.toLocaleString("default", { month: "long" });
    const currDay = currDate.getDate();
    const currHour = currDate.getHours();
    const currMin = currDate.getMinutes();
    const fullDate = `${currMonth} ${currDay} ${currHour}:${currMin}`;
    return fullDate;
  }

  function temperatureCreator(value) {
    if (isFahrenheit) {
      return fahreinheitConverter(value) + " °F";
    } else {
      return calciusConverter(value) + " °C";
    }
  }

  function fahreinheitConverter(value) {
    return Math.round(1.8 * (value - 273.15) + 32);
  }

  function calciusConverter(value) {
    return Math.round(value - 273.15);
  }
}

export { weatherContentCreator };
