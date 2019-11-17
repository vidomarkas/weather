import React, { useState, useEffect, useContext } from "react";
import { LocationContext } from "../../context";
import "./LocationLimitReached.scss";

export default function LocationLimitReached() {
  const locationContext = useContext(LocationContext);
  const [showPopup, setShowPopup] = useState(false);

  //   if (locationContext.locationLimitReached) {
  //     console.log("showing popup");
  //     setShowPopup(true);
  //   }

  if (locationContext.locationLimitReached) {
    return (
      <div className="locationLimitReachedPopup">Location limit reached</div>
    );
  } else {
    return null;
  }
}
