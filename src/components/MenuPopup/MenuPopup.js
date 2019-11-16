import React, { useState } from "react";
import "./MenuPopup.scss";
import ManageLocations from "../ManageLocations/ManageLocations";

export default function MenuPopup(props) {
  const [showManageLocations, setShowManageLocations] = useState(false);

  const toggleManageLocations = () => {
    setShowManageLocations(!showManageLocations);
  };
  return (
    <>
      {showManageLocations ? (
        <ManageLocations closeManageLocations={props.toggleMenu} />
      ) : (
        <div className="menuPopup">
          <div onClick={toggleManageLocations}>Manage locations</div>
          <div>Unit C</div>
        </div>
      )}
    </>
  );
}
