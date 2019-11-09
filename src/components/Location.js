import React from "react";
import WeatherCurrent from "./WeatherCurrent";
import WeatherForecast from "./WeatherForecast";

const Location = props => {
  //   console.log("location props", props);
  return (
    <>
      <WeatherCurrent
        location={props.location}
        setPartOfDay={props.setPartOfDay}
      />
      <WeatherForecast location={props.location} />
    </>
  );
};

export default Location;
