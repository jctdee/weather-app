import { getWeatherData } from "./weather-api.js";
import { weatherContentCreator } from "./element-creators.js";

// ON SUBMIT
document.getElementById("weather-form").addEventListener("submit", (event) => {
  // I AM STORING EVERYTHING IN HERE (VARIABLES, FUNCTIONS)
  // SINCE IT WON'T BE USED ANYWHERE ELSE
  event.preventDefault();
  let isValid = true;
  let errorMessage;
  let weatherValue;
  let isFahrenheit = true;

  const cityValue = document.getElementById("city").value;

  // THIS FUNCTION IS TO CHECK THE INPUT BEFORE SENDING THE DATA TO THE API
  function formValidation(value) {
    const val = value.trim();

    if (val.length === 0) {
      // CHECK IF EMPTY STRING
      errorMessage = "City cannot be empty";
      setInvalid();
      return false;
    } else if (val.length < 3) {
      // CHECK IF STRING LESS THAN 3 CHARACTERS
      errorMessage = "City cannot be less than 3 characters";
      setInvalid();
      return false;
    } else {
      return true;
    }
  }

  // THIS FUNCTION IS TO CHECK IF THE API IS GIVING BACK ANY DATA
  async function checkDataIfAvailable(value) {
    try {
      // IF SUCCESSFUL, STORE THE OBJECT RETURNED TO VARIABLE WEATHERVALUE
      await getWeatherData(value).then((response) => (weatherValue = response));
    } catch (err) {
      // IF ERROR 400 IS FOUND (BAD HEADERS), IT CATCHES THE ERROR HERE
      setInvalid();
      errorMessage = "City cannot be found";
    }
  }

  // THIS FUNCTION IS MADE TO RUN AFTER THE INPUT IS VALIDATED AND TO WAIT FOR THE API TO RUN
  async function finalDataValidation() {
    if (!formValidation(cityValue)) {
      showError(errorMessage);
    } else {
      await checkDataIfAvailable(cityValue);
      if (isValid) {
        hideError();
        weatherContentCreator(weatherValue, isFahrenheit);
        showWeatherContent();
        // getForecastData(cityValue);
      } else {
        showError(errorMessage);
      }
    }
  }

  function setInvalid() {
    isValid = false;
  }

  function showError(message) {
    const errorElement = document.getElementById("error-message");
    errorElement.textContent = errorMessage;
    errorElement.classList.remove("hidden-error");
    errorElement.classList.add("active-error");
  }

  function hideError() {
    const errorElement = document.getElementById("error-message");
    errorElement.classList.remove("active-error");
    errorElement.classList.add("hidden-error");
  }

  finalDataValidation();
});
// END OF ON SUBMIT

document
  .getElementById("weather-content-container")
  .addEventListener("click", (event) => {
    if (event.target && event.target.id === "back-to-search-btn") {
      backToSearch();
    }
  });

function showWeatherContent() {
  document.getElementById("search-box-container").classList.remove("active");
  document.getElementById("search-box-container").classList.add("hidden");
  document
    .getElementById("weather-content-container")
    .classList.remove("hidden");
  document.getElementById("weather-content-container").classList.add("active");
}

function backToSearch() {
  document
    .getElementById("weather-content-container")
    .classList.remove("active");
  document.getElementById("weather-content-container").classList.add("hidden");
  document.getElementById("search-box-container").classList.remove("hidden");
  document.getElementById("search-box-container").classList.add("active");
}
