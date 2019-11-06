import React from "react";
import { useHttp } from "../hooks/http";
import MainWeatherImage from "./MainWeatherImage";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherCurrent = ({ location, setPartOfDay }) => {
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

    setPartOfDay(loadedWeather.partOfDay);
  }

  let content = <p>Loading...</p>;

  if (!isLoading && loadedWeather) {
    content = (
      <div className="current-weather">
        <div>Current weather</div>
        <div>
          {loadedWeather.cityName}, {loadedWeather.countryCode}
        </div>
        <div>Sunrise: {loadedWeather.sunrise}</div>
        <div>Sunset :{loadedWeather.sunset}</div>
        <div>Temperature: {Math.round(loadedWeather.temp)}°</div>
        <div>Feels like: {Math.round(loadedWeather.feelsLike)}°</div>
        <div>Description: {loadedWeather.desc}</div>
        <div>Precipitation: {Math.round(loadedWeather.precip)}mm</div>
        <MainWeatherImage iconName={loadedWeather.iconName} />
      </div>
    );
  } else if (!isLoading && !loadedWeather) {
    content = <p>Failed to fetch the weather</p>;
  }
  return content;
};

export default WeatherCurrent;
