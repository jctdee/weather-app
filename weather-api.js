async function getGeolocation(place) {
  let locationArray = [];
  await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=dcef71e1128c2f83dcabf8c95eea590c`,
    {
      mode: "cors",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        return;
      } else {
        // store latitude in index 0 and longitude in index 1
        locationArray.push(data[0].lat);
        locationArray.push(data[0].lon);
      }
    });
  return locationArray;
}

async function getWeatherData(place) {
  const geocode = await getGeolocation(place);
  // again, index 0 = latitude; index 1 = longitude;
  let returnedData;
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${geocode[0]}&lon=${geocode[1]}&appid=dcef71e1128c2f83dcabf8c95eea590c`,
    {
      mode: "cors",
    }
  )
    .then((response) => {
      if (response.status === 400) {
        throw new Error("City not found");
      } else {
        return response.json();
      }
    })
    .then((data) => (returnedData = data));
  return returnedData;
}

export { getWeatherData };
