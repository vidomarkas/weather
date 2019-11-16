import React from "react";
import WeatherCurrent from "../WeatherCurrent/WeatherCurrent";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import "./Location.scss";

const Location = ({ setPartOfDay, currentLocation }) => {
  return (
    <>
      <div className="location">
        <WeatherCurrent
          location={currentLocation}
          setPartOfDay={setPartOfDay}
        />
        <WeatherForecast location={currentLocation} />
      </div>
    </>
  );
};

export default Location;
