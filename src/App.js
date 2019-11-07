import React, { useState } from "react";
import "./App.scss";
import { useHttp } from "./hooks/http";

import Menu from "./components/Menu";
import WeatherCurrent from "./components/WeatherCurrent";
import WeatherForecast from "./components/WeatherForecast";
import Background from "./components/Background";

const App = () => {
  const [partOfDay, setPartOfDay] = useState("d");
  const [isLoading, fetchedLocation] = useHttp(`https://ipapi.co/json/`, []);

  let loadedLocation = null;

  if (fetchedLocation) {
    loadedLocation = {
      city: fetchedLocation.city,
      lat: fetchedLocation.latitude,
      lon: fetchedLocation.longitude,
      country: fetchedLocation.country_name,
      countryCode: fetchedLocation.country
    };
  }

  let content = <p>Loading...</p>;

  if (!isLoading && loadedLocation) {
    content = (
      <div className={"App " + partOfDay}>
        <Background />
        <div className="App__container">
          <Menu />
          <WeatherCurrent
            location={loadedLocation}
            setPartOfDay={setPartOfDay}
            // todaysWeather={todaysWeather}
          />
          <WeatherForecast
            location={loadedLocation}
            // setTodaysWeather={setTodaysWeather}
          />
        </div>
      </div>
    );
  } else if (!isLoading && !loadedLocation) {
    content = <p>Failed to fetch your location</p>;
  }
  return content;
};

export default App;
