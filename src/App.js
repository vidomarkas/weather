import React, { useState, useContext } from "react";
import "./App.scss";
import { Context } from "./Context";
import Menu from "./components/Menu/Menu";
import Location from "./components/Location/Location";
import Background from "./components/Background/Background";
import SearchLocations from "./components/SearchLocations/SearchLocations";
import loadingIcon from "./assets/loader.gif";
import Slider from "react-slick";
import { sliderSettings } from "./components/SliderConfig/SliderConfig";
import LocationLimitReached from "./components/LocationLimitReached/LocationLimitReached";

const App = () => {
  const context = useContext(Context);

  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const sliders = () => {
    return context.locations.map((location, index) => {
      return <Location key={index} currentLocation={location} />;
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

  if (context.locations.length > 0 && !context.isLoading) {
    content = (
      <div className={"App background--default"}>
        <Background />
        <div className="App__container">
          <LocationLimitReached />
          <Menu toggleSearch={toggleSearch} />
          <SearchLocations
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
          />
          <div className="locationContainer">
            <Slider {...sliderSettings}>{sliders()}</Slider>
          </div>
        </div>
      </div>
    );
  } else if (context.locations.length < 1 && !context.isLoading) {
    content = <p>Failed to fetch your location</p>;
  }
  return content;
};

export default App;
