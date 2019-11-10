import React from "react";
import { useHttp } from "../../hooks/http";
import "./WeatherForecast.scss";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherForecast = ({ location, setTodaysWeather }) => {
  let country;
  if (location.country) {
    country = `&country=${location.country}`;
  } else {
    country = ``;
  }
  const [isLoading, forecastWeather] = useHttp(
    `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${location.lat}&lon=${location.lon}&key=${API_KEY}`
  );

  let loadedWeather = null;

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

  if (forecastWeather) {
    loadedWeather = [];
    forecastWeather.data.map(dayWeather => {
      loadedWeather.push({ dayWeather });

      return null;
    });

    //remove first result from the array
    const todaysWeather = loadedWeather.shift();
    console.log(todaysWeather);
    console.log(loadedWeather);
    // setTodaysWeather(todaysWeather);

    // temp: forecastWeather.data[index].temp,
    // min: forecastWeather.data[index].min_temp,
    // max: forecastWeather.data[index].max_temp,
    // precipProb: forecastWeather.data[index].pop,
    // iconName: forecastWeather.data[index].weather.icon,
    // desc: forecastWeather.data[index].weather.description

    // loadedWeather = {
    //   tomorrow: {
    //     cityName: forecastWeather.city_name,
    //     countryCode: forecastWeather.country_code,

    //     temp: forecastWeather.data[0].temp,
    //     min: forecastWeather.data[0].min_temp,
    //     max: forecastWeather.data[0].max_temp,
    //     precipProb: forecastWeather.data[0].pop,
    //     iconName: forecastWeather.data[0].weather.icon,
    //     desc: forecastWeather.data[0].weather.description,

    //   },
    //   2: {
    //     cityName: forecastWeather.city_name,
    //     countryCode: forecastWeather.country_code,

    //     temp: forecastWeather.data[1].temp,
    //     min: forecastWeather.data[1].min_temp,
    //     max: forecastWeather.data[1].max_temp,
    //     precipProb: forecastWeather.data[1].pop,
    //     iconName: forecastWeather.data[1].weather.icon,
    //     desc: forecastWeather.data[1].weather.description,

    //   },

    // };
  }

  // const forecastIcon = day.dayWeather.weather.icon.slice(0, 3);
  // console.log(forecastIcon);

  let content = null;
  // <div
  //   style={{
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center"
  //   }}
  // >
  //   Getting forecast ...
  // </div>

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
