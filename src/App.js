import React, { useState, useContext } from "react";
import "./App.scss";

import { LocationContext } from "./context";
import Menu from "./components/Menu/Menu";
import Location from "./components/Location/Location";
import Background from "./components/Background/Background";
import SearchLocations from "./components/SearchLocations";
import loadingIcon from "./assets/loader.gif";
import Slider from "react-slick";
import {sliderSettings} from './components/SliderConfig/SliderConfig'


const App = () => {
  const locationContext = useContext(LocationContext);
  const [partOfDay, setPartOfDay] = useState("default");
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    console.log("from toggleSearch", searchOpen);
  };

  const sliders = () => {
    return locationContext.locations.map((location, index )=> {
      return (
        <Location key={index} setPartOfDay={setPartOfDay} currentLocation={location} />
      );
    });
  };

  

  let content = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        flexDirection: "column",
        height: "50vh"
      }}
    >
      <img
        style={{ height: "60px", width: "60px", marginBottom: "20px" }}
        src={loadingIcon}
        alt="loading"
      />
      Getting location...
    </div>
  );

  if (locationContext.locations.length > 0 && !locationContext.isLoading) {
    content = (
      <div className={"App background--" + partOfDay}>
        <Background />
        <div className="App__container">
          <Menu toggleSearch={toggleSearch} />
          <SearchLocations
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
          />
          <div className="locationContainer">
            <Slider
            {...sliderSettings}
            >
              {sliders()}
            </Slider>
          </div>
        </div>
      </div>
    );
  } else if (
    locationContext.locations.length < 1 &&
    !locationContext.isLoading
  ) {
    content = <p>Failed to fetch your location</p>;
  }
  return content;
};

export default App;
