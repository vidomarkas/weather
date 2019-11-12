import React, { useState, useContext } from "react";
import "./App.scss";
// import { BrowserRouter as Router } from "react-router-dom";
import { LocationContext } from "./context";
import Menu from "./components/Menu/Menu";
import Location from "./components/Location/Location";
import Background from "./components/Background/Background";
import SearchLocations from "./components/SearchLocations";
import loadingIcon from "./assets/loader.gif";

const App = () => {
  const locationContext = useContext(LocationContext);
  const [partOfDay, setPartOfDay] = useState("default");
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    console.log("from toggleSearch", searchOpen);
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
          <LocationContext.Consumer>
            {value => {
              return (
                <>
                  <SearchLocations
                    searchOpen={searchOpen}
                    setSearchOpen={setSearchOpen}
                  />
                  {value.locations.map(location => {
                    return (
                      <Location
                        setPartOfDay={setPartOfDay}
                        currentLocation={location}
                      />
                    );
                  })}
                </>
              );
            }}
          </LocationContext.Consumer>
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
