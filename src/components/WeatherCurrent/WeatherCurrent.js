import React, { useContext } from "react";
import { useHttp } from "../../hooks/http";
import { Context } from "../../Context";
import MainWeatherImage from "../MainWeatherImage";
import pin from "../../assets/pin.svg";
import "./WeatherCurrent.scss";
import LottieControl from "../LottieControl";
import * as loader from "../../assets/loader.json";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY2;

const WeatherCurrent = ({ location }) => {
  const context = useContext(Context);
  const [isLoadingWeather, currentWeather] = useHttp(
    `https://api.weatherbit.io/v2.0/current?&lat=${location.lat}&lon=${location.lon}&units=${context.unit}&key=${API_KEY}`
  );

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
      date: currentWeather.data[0].timezone,
      humidity: currentWeather.data[0].rh
    };
  }

  let content = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "50vh"
      }}
    >
      <LottieControl animationData={loader} />
    </div>
  );

  if (!isLoadingWeather && loadedWeather) {
    content = (
      <div className="current-weather">
        {location.IPlocation ? (
          <div style={{ paddingBottom: "20px" }}>
            Using approximate location. Allow to use your location for more
            accuracy{" "}
          </div>
        ) : null}
        <div className="current-weather__main__location">
          {location.mainLocation ? (
            <img
              className="current-weather__main__location--pin"
              src={pin}
              alt="pin"
            />
          ) : null}
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

          <div>
            Precipitation: {Math.round(loadedWeather.precip)}
            {context.unit === "M" ? "mm" : "in"}
          </div>
          <div>Humidity: {loadedWeather.humidity}%</div>
        </div>
      </div>
    );
  } else if (!isLoadingWeather && !loadedWeather) {
    content = (
      <div className="current-weather">
        <p>Failed to fetch current weather</p>
      </div>
    );
  }
  return content;
};

export default WeatherCurrent;
