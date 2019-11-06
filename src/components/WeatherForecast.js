import React from "react";
import { useHttp } from "../hooks/http";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherForecast = ({ location }) => {
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

  let content = <p>Loading...</p>;

  if (!isLoading && loadedWeather) {
    content = (
      <>
        <div>
          {loadedWeather.map((day, index) => {
            return (
              <div key={index}>
                {getWeekday(index + 1)}{" "}
                <img
                  className="forecastImage"
                  src={require("../assets/weatherbitIcons/" +
                    day.dayWeather.weather.icon +
                    ".png")}
                  alt=""
                />{" "}
                {Math.round(day.dayWeather.max_temp)}
                {"°/"}
                {Math.round(day.dayWeather.min_temp)}
                {"°"}
              </div>
            );
          })}
        </div>
      </>
    );
  } else if (!isLoading && !loadedWeather) {
    content = <p>Failed to fetch the weather</p>;
  }
  return content;
};

export default WeatherForecast;
