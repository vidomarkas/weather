import React, { useState, useEffect } from "react";
import AlgoliaPlaces from "algolia-places-react";
import "./SearchLocations.scss";

export default function SearchLocations(props) {
  const [city, setCity] = useState({ name: "", latlng: "", countryCode: "" });

  // useEffect(() => {
  //   console.log(city);
  // }, [city]);

  if (!props.searchOpen) {
    return null;
  } else {
    return (
      <AlgoliaPlaces
        placeholder="Search for a location..."
        options={{
          type: "city",
          useDeviceLocation: true,
          templates: {
            value: suggestion =>
              `${suggestion.name}, ${suggestion.countryCode.toUpperCase()}`
          }
        }}
        onChange={({ suggestion }) => {
          // setCity({
          //   name: suggestion.name,
          //   latlng: suggestion.latlng,
          //   countryCode: suggestion.countryCode
          // });
          console.log("addedLocations", props.addedLocations);
          props.setAddedLocations([
            ...props.addedLocations,
            {
              lat: suggestion.latlng.lat,
              lon: suggestion.latlng.lng
            }
          ]);
          props.setSearchOpen(false);
        }}
        // onLimit={({ message }) => {
        //   setRateLimit(true);
        //   setTimeout(() => setRateLimit(false), 3000);
        // }}
      />
    );
  }
}
