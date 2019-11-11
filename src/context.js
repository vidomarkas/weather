import React, { useState, useEffect } from "react";
import { useHttp } from "./hooks/http";
export const LocationContext = React.createContext({});

const LocationContextProvider = props => {
  const [IPlocation, setIPlocation] = useState({});
  const [geoLocation, setGeoLocation] = useState(null);
  const [addedLocations, setAddedLocations] = useState([
    { lat: 52.520007, lon: 13.404954 },
    { lat: 55.755826, lon: 37.6173 }
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchIPlocation = async () => {
    try {
      const result = await fetch(`https://ipapi.co/json/`);
      const data = await result.json();
      setIPlocation({ lat: data.latitude, lon: data.longitude });
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
    console.log("getting geolocation");
    const showPosition = position => {
      setGeoLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    };
    navigator.geolocation.getCurrentPosition(showPosition);
  };

  return (
    <LocationContext.Provider
      value={{
        IPlocation: { ...IPlocation },
        geoLocation: { ...geoLocation },
        addedLocations: [...addedLocations],
        setAddedLocations: setAddedLocations,
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
