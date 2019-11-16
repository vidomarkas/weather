import React, { useState, useEffect } from "react";
import uuid from "uuid";
export const LocationContext = React.createContext({});

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY2;

const LocationContextProvider = props => {
  const initialLocations = JSON.parse(localStorage.getItem("locations")) || [
    { city: "Klaipeda", lat: "20", lon: "20", country: "OO" }
  ];
  console.log(initialLocations);

  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([...initialLocations]);

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
    console.log("added", localStorage);
  };

  const deleteLocation = id => {
    setLocations([...locations.filter(location => location.id !== id)]);
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

  useEffect(() => {
    const locationsString = JSON.stringify(locations);
    console.log("useefect location from state", locations);
    localStorage.setItem("locations", locationsString);
    console.log("useeffect locations from local storage", localStorage);
  }, [locations]);

  return (
    <LocationContext.Provider
      value={{
        locations: locations,
        isLoading: isLoading,
        getGeoLocation: getGeoLocation,
        addLocation: addLocation,
        deleteLocation: deleteLocation
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export { LocationContextProvider };
