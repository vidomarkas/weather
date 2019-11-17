import React, { useState, useEffect } from "react";
import uuid from "uuid";

export const Context = React.createContext({});

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY2;

const ContextProvider = props => {
  const initialLocations = JSON.parse(localStorage.getItem("locations")) || [
    { city: "Paris", lat: "20", lon: "20", country: "FR" }
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([...initialLocations]);

  const initialUnit = JSON.parse(localStorage.getItem("unit")) || "M";
  const [unit, setUnit] = useState(initialUnit);

  const [locationLimitReached, setLocationLimitReached] = useState(false);

  // Fetching users approximate coordinates with IP address
  const fetchIPlocation = async () => {
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
            country: data.country,
            mainLocation: true,
            id: uuid.v4(),
            IPlocation: true
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
            mainLocation: true,
            id: uuid.v4(),
            IPlocation: true
          },
          ...prevState
        ]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const addLocation = newLocation => {
    setLocations(prevState => [...prevState, newLocation]);
  };

  const deleteLocation = id => {
    setLocations([...locations.filter(location => location.id !== id)]);
  };

  // Getting users exact coordinates and fetching city name
  const getGeoLocation = () => {
    setIsLoading(true);

    const geoLocationPermissionAllowed = position => {
      (async function() {
        try {
          const result = await fetch(
            `https://api.weatherbit.io/v2.0/current?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&key=${API_KEY}`
          );
          const data = await result.json();

          if (locations.length <= 1) {
            setLocations([
              {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                city: data.data[0].city_name,
                country: data.data[0].country_code,
                mainLocation: true,
                id: uuid.v4()
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
                country: data.data[0].country_code,
                mainLocation: true,
                id: uuid.v4()
              },
              ...prevState
            ]);
            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(false);
        }
      })();
    };

    const geoLocationPermissionDenied = err => {
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

  useEffect(() => {
    const locationsString = JSON.stringify(locations);
    localStorage.setItem("locations", locationsString);
  }, [locations]);

  const switchUnit = () => {
    if (unit === "M") {
      setUnit("I");
    } else {
      setUnit("M");
    }
  };

  useEffect(() => {
    const unitString = JSON.stringify(unit);
    localStorage.setItem("unit", unitString);
  }, [unit]);

  return (
    <Context.Provider
      value={{
        locations: locations,
        isLoading: isLoading,
        getGeoLocation: getGeoLocation,
        addLocation: addLocation,
        deleteLocation: deleteLocation,
        locationLimitReached: locationLimitReached,
        setLocationLimitReached: setLocationLimitReached,
        switchUnit: switchUnit,
        unit: unit
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { ContextProvider };
