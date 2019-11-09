import React from "react";
import { useHttp } from "../hooks/http";
import MainWeatherImage from "./MainWeatherImage";
import pin from "../assets/pin.svg";

import "./WeatherCurrent.scss";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherCurrent = ({ location }) => {
  const [isLoading, currentWeather] = useHttp(
    `https://api.weatherbit.io/v2.0/current?&lat=${location.lat}&lon=${location.lon}&key=${API_KEY}`
  );

  // const [partOfDay, setPartOfDay] = useState("d");

  let loadedWeather = null;

  if (currentWeather) {
    loadedWeather = {
      temp: currentWeather.data[0].temp,
      feelsLike: currentWeather.data[0].app_temp,
      cityName: currentWeather.data[0].city_name,
      countryCode: currentWeather.data[0].country_code,
      sunrise: currentWeather.data[0].sunrise,
      sunset: currentWeather.data[0].sunset,
      precip: currentWeather.data[0].precip,
      iconName: currentWeather.data[0].weather.icon,
      desc: currentWeather.data[0].weather.description,
      partOfDay: currentWeather.data[0].pod
    };

    // setPartOfDay(loadedWeather.partOfDay);
  }

  let content = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh"
      }}
    >
      Getting current weather...
    </div>
  );

  if (!isLoading && loadedWeather) {
    content = (
      <div className="current-weather">
        <div className="current-weather__main__location">
          <img
            className="current-weather__main__location--pin"
            src={pin}
            alt="pin"
          />
          {loadedWeather.cityName}, {loadedWeather.countryCode}
        </div>
        <div className="current-weather__main">
          <MainWeatherImage iconName={loadedWeather.iconName} />
          <div className="current-weather__main__temp">
            <p className="current-weather__main__temp--number">
              {Math.round(loadedWeather.temp)}

              <span className="current-weather__main__temp--degree">°</span>
            </p>
          </div>
        </div>
        <div className="current-weather__main__stats">
          <p>Feels like {Math.round(loadedWeather.feelsLike)}°</p>
          <p>{loadedWeather.desc}</p>
        </div>
        <div className="current-weather__details">
          <p className="current-weather__details__sunrise">
            Sunrise {loadedWeather.sunrise}
          </p>
          <p className="current-weather__details__sunset">
            Sunset {loadedWeather.sunset}
          </p>

          <div>Precipitation: {Math.round(loadedWeather.precip)}mm</div>
        </div>
      </div>
    );
  } else if (!isLoading && !loadedWeather) {
    content = <p>Failed to fetch the weather</p>;
  }
  return content;
};

export default WeatherCurrent;
