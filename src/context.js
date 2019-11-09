import React, { useState, useEffect } from "react";
import { useHttp } from "./hooks/http";
export const LocationContext = React.createContext({});

const LocationContextProvider = props => {
  const [IPlocation, setIPlocation] = useState({});
  const [geoLocation, setGeoLocation] = useState(null);
  const [addedLocations, setAddedLocations] = useState(["London", "Chicago"]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchIPlocation = async () => {
    try {
      const result = await fetch(`https://ipapi.co/json/`);
      const data = await result.json();
      setIPlocation({ city: data.city, country: data.country });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchIPlocation();
  }, []);

  //   const addLocation = addedLocation => {
  //     setAddedLocations(prevState => [...prevState, addedLocation]);
  //   };

  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(showPosition);
    function showPosition(position) {
      console.log(
        "GEOLOCATION!!! lat: " +
          position.coords.latitude +
          " lon: " +
          position.coords.longitude
      );

      setGeoLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    }
  };

  return (
    <LocationContext.Provider
      value={{
        IPlocation: { ...IPlocation },
        geoLocation: { ...geoLocation },
        addedLocations: [...addedLocations],
        isLoading: isLoading,
        getGeoLocation: getGeoLocation
        // addLocation: addLocation
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export { LocationContextProvider };
