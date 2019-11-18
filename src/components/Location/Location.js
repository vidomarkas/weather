import React from "react";
import WeatherCurrent from "../WeatherCurrent/WeatherCurrent";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import "./Location.scss";

const Location = ({ currentLocation }) => {
  return (
    <>
      <div className="location">
        <WeatherCurrent location={currentLocation} />
        <WeatherForecast location={currentLocation} />
      </div>
    </>
  );
};

export default Location;
