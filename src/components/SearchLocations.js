import React, { useContext } from "react";
import AlgoliaPlaces from "algolia-places-react";
import { LocationContext } from "../context";
import "./SearchLocations.scss";

export default function SearchLocations(props) {
  const locationContext = useContext(LocationContext);
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
          console.log("addedLocations", props.addedLocations);
          locationContext.addLocation({
            lat: suggestion.latlng.lat,
            lon: suggestion.latlng.lng,
            city: suggestion.name,
            country: suggestion.countryCode.toUpperCase()
          });

          props.setSearchOpen(false);
        }}
      />
    );
  }
}
