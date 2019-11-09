import React, { useState, useEffect } from "react";
import { useHttp } from "./hooks/http";
export const LocationContext = React.createContext({});

const LocationContextProvider = props => {
  const [IPlocation, setIPlocation] = useState({
    // lat: 55.65,
    // lon: 0.32
  });
  const [geoLocation, setGeoLocation] = useState(null);
  const [addedLocations, setAddedLocations] = useState(["London", "Chicago"]);
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const DATA = await fetch(`https://ipapi.co/json/`);
      const DATAjson = await DATA.json();
      console.log("LAT", DATAjson.latitude);
      console.log("LON", DATAjson.longitude);
      setIPlocation({ lat: DATAjson.latitude, lon: DATAjson.longitude });
      console.log("IPLocation", IPlocation);
    }
    fetchData();
  }, []);

  //   useEffect(async () => {
  //     const DATA = await fetch(`https://ipapi.co/json/`)
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch.");
  //         }

  //         return response.json();
  //       })
  //       .then(data => {
  //         console.log("DATA", data);
  //         setFetchedData(data);

  //         const coords = {
  //           lat: fetchedData.latitude,
  //           lon: fetchedData.longitude
  //         };
  //         setIPlocation(...coords);
  //         console.log("IPlocation", IPlocation);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         setIsLoading(false);
  //       });
  //   }, []);

  return (
    <LocationContext.Provider
      value={{
        IPlocation: { ...IPlocation },
        geoLocation: { ...geoLocation },
        addedLocations: [...addedLocations]
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

// const LocationContextConsumer = LocationContext.Consumer;
export { LocationContextProvider };
