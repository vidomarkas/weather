import React, { useContext, useEffect } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { LocationContext } from "../../context";
import WeatherCurrent from "../WeatherCurrent/WeatherCurrent";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import "./Location.scss";

const Location = ({ setPartOfDay, currentLocation }) => {
  const locationContext = useContext(LocationContext);
  // console.log(locationContext);
  // Create previous and next location links
  let leftLink = "";
  let rightLink = "";
  const links = [];

  const getLocationLinks = () => {
    const citiesArr = [];
    locationContext.locations.map(location => {
      citiesArr.push(location.city);
      return null;
    });

    console.log("cities arr", citiesArr);
    console.log(currentLocation.city);

    const currentIndex = citiesArr.indexOf(currentLocation.city);
    if (currentIndex === 0) {
      leftLink = null;
      rightLink = citiesArr[currentIndex + 1];
      links.push(leftLink, rightLink);
      return links;
    } else if (currentIndex > 0 && currentIndex < citiesArr.length - 1) {
      leftLink = citiesArr[currentIndex - 1];
      rightLink = citiesArr[currentIndex + 1];
      links.push(leftLink, rightLink);
      return links;
    } else if (currentIndex > 0 && currentIndex === citiesArr.length - 1) {
      leftLink = citiesArr[currentIndex - 1];
      rightLink = null;
      links.push(leftLink, rightLink);
      return links;
    } else if (currentIndex === 0 && currentIndex === citiesArr.length - 1) {
      leftLink = null;
      rightLink = null;
      links.push(leftLink, rightLink);
      return links;
    }
  };
  getLocationLinks();
  console.log(links);

  useEffect(() => {
    // console.log("leftLink: ", leftLink, "rightLink:", rightLink);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="location">
      {links[0] === null ? null : <Link to={`/${links[0]}`}>Prev</Link>}

      <WeatherCurrent location={currentLocation} setPartOfDay={setPartOfDay} />
      <WeatherForecast location={currentLocation} />
      {links[1] === null ? null : <Link to={`/${links[1]}`}>Next</Link>}
    </div>
  );
};

export default Location;
