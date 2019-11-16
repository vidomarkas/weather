import React, { useContext } from "react";
import "./ManageLocations.scss";
import { LocationContext } from "../../context";

export default function ManageLocations(props) {
  const locationContext = useContext(LocationContext);
  return (
    <div className="manageLocations">
      <div className="manageLocations_inner">
        <h2>manage locations</h2>
        {locationContext.locations.map(location => {
          return (
            <div key={location.id} style={{ color: "#000" }}>
              {location.city}
              {location.mainLocation ? null : (
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => locationContext.deleteLocation(location.id)}
                >
                  X
                </button>
              )}
            </div>
          );
        })}
        <button onClick={props.closeManageLocations}>close</button>
      </div>
    </div>
  );
}
