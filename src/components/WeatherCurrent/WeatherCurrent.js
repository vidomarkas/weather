import React, { useState, useContext } from "react";
import { useHttp } from "../../hooks/http";
import MainWeatherImage from "../MainWeatherImage";
import pin from "../../assets/pin.svg";
import IPpin from "../../assets/IPpin.svg";

import "./WeatherCurrent.scss";
import loadingIcon from "../../assets/loader.gif";
import { LocationContext } from "../../context";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherCurrent = ({ location, isLoadingLocation, setPartOfDay }) => {
  const locationContext = useContext(LocationContext);
  
  const [isLoadingWeather, currentWeather] = useHttp(
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
      <img
        style={{ height: "60px", width: "60px", marginBottom: "20px" }}
        src={loadingIcon}
        alt="loading"
      />
      Loading...
    </div>
  );

  if (!isLoadingLocation && loadedWeather) {
    content = (
      <LocationContext.Consumer>
        {value => (
          <div className="current-weather">
            <div
              className="current-weather__main__location"
              onClick={ value.getGeoLocation}
            >
              <img
                className="current-weather__main__location--pin"
                src={locationContext.geoLocation.lat ? pin : IPpin}
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
        )}
      </LocationContext.Consumer>
    );
  } else if (!isLoadingLocation && !loadedWeather && !isLoadingWeather) {
    content = (
      <div className="current-weather">
        <p>Failed to fetch current weather</p>
      </div>
    );
  }
  return content;
};

export default WeatherCurrent;
