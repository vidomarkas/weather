import React, { useState, useContext } from "react";
import "./App.scss";

import { LocationContext } from "./context";
import Menu from "./components/Menu/Menu";
import Location from "./components/Location";
import Background from "./components/Background/Background";
import SearchLocations from "./components/SearchLocations";

const App = () => {
  const locationContext = useContext(LocationContext);
  const [partOfDay, setPartOfDay] = useState("default");
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    console.log("from toggleSearch", searchOpen);
  };
  // const [locations, setLocations] = useState({
  //   currentLocation: [{ IPlocation: null }, { geoLocation: null }],
  //   addedLocations: []
  // });

  // console.log("app locationContext", locationContext);

  let content = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      Getting location...
    </div>
  );

  if (locationContext.IPlocation && !locationContext.isLoading) {
    content = (
      <div
        className={"App background--" + partOfDay}
        //todo partOfDay
      >
        <Background />
        <div className="App__container">
          <Menu toggleSearch={toggleSearch} />

          <LocationContext.Consumer>
            {value => {
              console.log("value", value);
              return (
                <>
                  <SearchLocations
                    searchOpen={searchOpen}
                    setSearchOpen={setSearchOpen}
                    setAddedLocations={value.setAddedLocations}
                    addedLocations={value.addedLocations}
                  />
                  <Location
                    location={
                      value.geoLocation.lat
                        ? value.geoLocation
                        : value.IPlocation
                    }
                    isLoading={value.isLoading}
                    setPartOfDay={setPartOfDay}
                  />
                  {value.addedLocations.map(location => {
                    return <Location location={location} />;
                  })}
                </>
              );
            }}
          </LocationContext.Consumer>
        </div>
      </div>
    );
  } else if (!locationContext.IPlocation && !locationContext.isLoading) {
    content = <p>Failed to fetch your location</p>;
  }
  return content;
};

export default App;
