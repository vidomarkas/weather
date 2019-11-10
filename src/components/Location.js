import React from "react";
import WeatherCurrent from "./WeatherCurrent/WeatherCurrent";
import WeatherForecast from "./WeatherForecast/WeatherForecast";

const Location = props => {
  console.log("location props", props);
  return (
    <>
      <WeatherCurrent
        location={props.location}
        isLoadingLocation={props.isLoading}
        // setPartOfDay={props.setPartOfDay}
      />
      <WeatherForecast location={props.location} />
    </>
  );
};

export default Location;
