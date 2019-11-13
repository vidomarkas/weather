import React from "react";
import { useHttp } from "../../hooks/http";
import "./WeatherForecast.scss";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherForecast = ({ location, setTodaysWeather }) => {
  const [isLoading, forecastWeather] = useHttp(
    `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${location.lat}&lon=${location.lon}&key=${API_KEY}`
  );

  const getWeekday = upcomingDay => {
    const date = new Date();
    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let index = date.getDay() + upcomingDay;

    const shiftWeek = index => {
      if (index > 6) {
        index = index - 7;

        return shiftWeek(index);
      } else {
        return index;
      }
    };

    const day = weekday[shiftWeek(index)];

    return day;
  };

  let loadedWeather = null;

  if (forecastWeather) {
    loadedWeather = [];
    forecastWeather.data.map(dayWeather => {
      loadedWeather.push({ dayWeather });

      return null;
    });

    //remove first result from the array
    loadedWeather.shift();
  }

  let content = null;

  if (!isLoading && loadedWeather) {
    content = (
      <>
        <div className="weather-forecast">
          {loadedWeather.map((day, index) => {
            return (
              <div className="weather-forecast__day" key={index}>
                <div className="weather-forecast__weekdayName">
                  {getWeekday(index + 1)}
                </div>
                <div className="weather-forecast__details">
                  <img
                    className="forecastImage"
                    src={require("../../assets/weatherbitIcons/" +
                      day.dayWeather.weather.icon +
                      ".png")}
                    alt={day.dayWeather.description}
                  />
                  <div className="weather-forecast__details__temps">
                    <p className="weather-forecast__details__temps--primary">
                      {Math.round(day.dayWeather.max_temp)}°
                    </p>

                    <p className="weather-forecast__details__temps--secondary">
                      /{Math.round(day.dayWeather.min_temp)}°
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else if (!isLoading && !loadedWeather) {
    content = (
      <div className="weather-forecast">
        <p>Failed to fetch the forecast</p>
        <button
          className="btn-reload"
          value="Refresh Page"
          onClick={() => window.location.reload()}
        >
          Try again?
        </button>
      </div>
    );
  }
  return content;
};

export default WeatherForecast;
