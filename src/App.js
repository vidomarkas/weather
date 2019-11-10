import React, { useContext } from "react";
import "./App.scss";

import { LocationContext } from "./context";
import Menu from "./components/Menu/Menu";
import Location from "./components/Location";
import Background from "./components/Background/Background";

const App = () => {
  const locationContext = useContext(LocationContext);
  // todo const [partOfDay, setPartOfDay] = useState("default");

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
        className="App background--default"
        //todo partOfDay
      >
        <Background />
        <div className="App__container">
          <Menu />
          <LocationContext.Consumer>
            {value => {
              // console.log("value", value);
              return (
                <Location
                  location={
                    value.geoLocation.lat ? value.geoLocation : value.IPlocation
                  }
                  isLoading={value.isLoading}
                  // setPartOfDay={}
                />
              );
            }}
          </LocationContext.Consumer>
          {/* <LocationContext.Consumer>
            {value => {
              return value.addedLocations.map(location => {
                return <Location location={location} />;
              });
            }}
          </LocationContext.Consumer> */}
        </div>
      </div>
    );
  } else if (!locationContext.IPlocation && !locationContext.isLoading) {
    content = <p>Failed to fetch your location</p>;
  }
  return content;
};

export default App;
