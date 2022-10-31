import "./App.css";
import Search from "./Parts/searchPart/find";
import Forecast from "./Parts/forecast/forecast";
import CurrentWeather from "./Parts/current-weather/current-weather";
import { weatherApiUrlPrefix, weatherApiKey } from "./forApi";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const respondOnFindChange = (findData) => {
    const [lat, lon] = findData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${weatherApiUrlPrefix}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    );

    const forcastFetch = fetch(
      `${weatherApiUrlPrefix}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    );

    Promise.all([currentWeatherFetch, forcastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ location: findData.label, ...weatherResponse });
        setForecast({ location: findData.label, ...forecastResponse });
      })

      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onFindChange={respondOnFindChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
