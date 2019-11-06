import React, { useState } from "react";
import "./App.scss";
import { useHttp } from "./hooks/http";

//import Menu from "./components/Menu";
import WeatherCurrent from "./components/WeatherCurrent";
import WeatherForecast from "./components/WeatherForecast";
import Background from "./components/Background";

function App(props) {
  const [isLoading, fetchedData] = useHttp("http://ip-api.com/json", []);
  const [partOfDay, setPartOfDay] = useState("d");

  let loadedLocation = null;

  if (fetchedData) {
    loadedLocation = {
      city: fetchedData.city,
      lat: fetchedData.lat,
      lon: fetchedData.lon,
      timezone: fetchedData.timezone,
      country: fetchedData.country,
      countryCode: fetchedData.countryCode
    };
  }

  let content = <p>Loading...</p>;

  if (!isLoading && loadedLocation) {
    content = (
      <div className={"App " + partOfDay}>
        <Background />
        <div className="App__container">
          <WeatherCurrent
            location={loadedLocation}
            setPartOfDay={setPartOfDay}
          />
          <WeatherForecast location={loadedLocation} />
        </div>
      </div>
    );
  } else if (!isLoading && !loadedLocation) {
    content = <p>Failed to fetch your location</p>;
  }
  return content;
}

export default App;
