import React, { useState, useEffect } from "react";
export const LocationContext = React.createContext({});

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const LocationContextProvider = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([
    {
      lat: 51.4408448,
      lon: 51.4408448,
      city: "Gravesend",
      country: "GB",
      IPlocation: true,
      geoLocation: false
    },
    { lat: 52.520007, lon: 13.404954, city: "Mitte", country: "CC" },
    { lat: 56.9494, lon: 24.1052, city: "Riga", country: "LV" }
  ]);

  // Fetching users approximate coordinates with IP address
  const fetchIPlocation = async () => {
    // console.log("fetching IP location...");
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
            country: data.country,
            IPlocation: true,
            geoLocation: false
          },
          ...prevState
        ]);
      }
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
    }
  };

  const addLocation = newLocation => {
    setLocations(prevState => [...prevState, newLocation]);
    // console.log("Added!");
  };

  // Getting users exact coordinates and fetching city name
  const getGeoLocation = () => {
    setIsLoading(true);
    // console.log("getting geolocation");
    const geoLocationPermissionAllowed = position => {
      (async function() {
        try {
          // console.log("fetching GEOlocation from API");
          const result = await fetch(
            `https://api.weatherbit.io/v2.0/current?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${API_KEY}`
          );
          const data = await result.json();
          // console.log("fetched GEOlocation from API", data);
          if (locations.length <= 1) {
            // console.log(data);
            // console.log(position);
            setLocations([
              {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                city: data.data[0].city_name,
                country: data.data[0].country_code,
                geoLocation: true,
                IPlocation: false
              }
            ]);

            setIsLoading(false);
          } else {
            locations.shift();
            setLocations(prevState => [
              {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                city: data.data[0].city_name,
                country: data.data[0].country_code
              },
              ...prevState
            ]);
            setIsLoading(false);
          }
        } catch (error) {
          // console.log(error);
          setIsLoading(false);
        }
      })();
    };

    const geoLocationPermissionDenied = err => {
      // console.log("Geolocation permission denied, using IP location");
      fetchIPlocation();
    };
    navigator.geolocation.getCurrentPosition(
      geoLocationPermissionAllowed,
      geoLocationPermissionDenied
    );
  };

  useEffect(() => {
    setIsLoading(true);
    getGeoLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocationContext.Provider
      value={{
        // todo get locations from local storage
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
