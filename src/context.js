import React, { useState, useEffect } from "react";
import { useHttp } from "./hooks/http";
export const LocationContext = React.createContext({});

const API_KEY_OPENCAGEDATA = process.env.REACT_APP_WEATHER_API_KEY_OPENCAGEDATA;

const LocationContextProvider = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([
    // { lat: 52.520007, lon: 13.404954, city: "Mitte", country: "CC" },
    // { lat: 55.755826, lon: 37.6173, city: "Moscow", country: "LT" }
  ]);

  // Fetching users approximate coordinates with IP address
  const fetchIPlocation = async () => {
    console.log("fetching IP");
    setIsLoading(true);
    try {
      const result = await fetch(`https://ipapi.co/json/`);
      const data = await result.json();
      if (locations.length > 0) {
        locations.shift();
        setLocations(prevState => [
          {
            lat: data.latitude,
            lon: data.longitude,
            city: data.city,
            country: data.country
          },
          ...prevState
        ]);
      } else {
        setLocations(prevState => [
          {
            lat: data.latitude,
            lon: data.longitude,
            city: data.city,
            country: data.country
          },
          ...prevState
        ]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (locations.length < 1) {
      setIsLoading(true);
      fetchIPlocation();
    }
  }, []);

  const addLocation = newLocation => {
    setLocations(prevState => [...prevState, newLocation]);
    console.log("Added!");
  };

  // Getting users exact coordinates and fetching city name
  const getGeoLocation = () => {
    setIsLoading(true);
    console.log("getting geolocation");
    const showPosition = position => {
      (async function() {
        try {
          const result = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${API_KEY_OPENCAGEDATA}`
          );
          const data = await result.json();

          if (locations.length <= 1) {
            console.log(data);
            console.log(position);
            setLocations([
              {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                city: data.results[0].components.city,
                country: data.results[0].components.country_code
              }
            ]);

            setIsLoading(false);
          } else {
            locations.shift();
            setLocations(prevState => [
              {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                city: data.results[0].components.city,
                country: data.results[0].components.country_code
              },
              ...prevState
            ]);
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      })();
    };
    navigator.geolocation.getCurrentPosition(showPosition);
  };

  useEffect(() => {
    console.log("locations", locations);
  }, []);

  return (
    <LocationContext.Provider
      value={{
        locations: locations,
        isLoading: isLoading,
        getGeoLocation: getGeoLocation,
        addLocation: addLocation
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export { LocationContextProvider };
