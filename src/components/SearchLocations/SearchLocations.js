import React, { useContext } from "react";
import AlgoliaPlaces from "algolia-places-react";
import { Context } from "../../Context";
import uuid from "uuid";
import "./SearchLocations.scss";

export default function SearchLocations(props) {
  const context = useContext(Context);
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
          if (context.locations.length < 6) {
            context.addLocation({
              lat: suggestion.latlng.lat,
              lon: suggestion.latlng.lng,
              city: suggestion.name,
              country: suggestion.countryCode.toUpperCase(),
              mainLocation: false,
              id: uuid.v4()
            });
          } else {
            context.setLocationLimitReached(true);
            setTimeout(() => context.setLocationLimitReached(false), 2000);
          }
          props.setSearchOpen(false);
        }}
      />
    );
  }
}
