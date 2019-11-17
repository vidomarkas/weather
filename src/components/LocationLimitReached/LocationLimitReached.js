import React, { useContext } from "react";
import { Context } from "../../Context";
import "./LocationLimitReached.scss";

export default function LocationLimitReached() {
  const context = useContext(Context);

  if (context.locationLimitReached) {
    return (
      <div className="locationLimitReachedPopup">Location limit reached</div>
    );
  } else {
    return null;
  }
}
