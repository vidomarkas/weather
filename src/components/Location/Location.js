import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LocationContext } from "../../context";
import WeatherCurrent from "../WeatherCurrent/WeatherCurrent";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import "./Location.scss";

const Location = ({ setPartOfDay, currentLocation }) => {
  const locationContext = useContext(LocationContext);
  console.log("CONTEXT", locationContext);

  // Create previous and next location links
  // let leftLink = "";
  // let rightLink = "";

  // const getLocationLinks = () => {
  //   const citiesArr = [];
  //   locationContext.addedLocations.map(location => {
  //     citiesArr.push(location.city);
  //     return null;
  //   });

  //   console.log("cities arr", citiesArr);

  //   const currentIndex = citiesArr.indexOf(props.location.city);
  //   if (currentIndex === 0) {
  //     leftLink = null;
  //     rightLink = citiesArr[currentIndex + 1];
  //     return leftLink, rightLink;
  //   } else if (currentIndex > 0 && currentIndex < citiesArr.length - 1) {
  //     leftLink = citiesArr[currentIndex - 1];
  //     rightLink = citiesArr[currentIndex + 1];
  //     return leftLink, rightLink;
  //   } else if (currentIndex > 0 && currentIndex === citiesArr.length - 1) {
  //     leftLink = citiesArr[currentIndex - 1];
  //     rightLink = null;
  //     return leftLink, rightLink;
  //   } else if (currentIndex === 0 && currentIndex === citiesArr.length - 1) {
  //     leftLink = null;
  //     rightLink = null;
  //     return leftLink, rightLink;
  //   }
  // };

  // useEffect(() => {
  //   getLocationLinks();
  //   console.log("leftLink: ", leftLink, "rightLink:", rightLink);
  // }, []);

  return (
    <div className="location">
      {/* <Link to={`/${props.location[0]}`}>Link</Link> */}
      <WeatherCurrent location={currentLocation} setPartOfDay={setPartOfDay} />
      <WeatherForecast location={currentLocation} />
    </div>
  );
};

export default Location;
