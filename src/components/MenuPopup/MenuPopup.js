import React, { useState, useContext } from "react";
import "./MenuPopup.scss";
import ManageLocations from "../ManageLocations/ManageLocations";
import tempLogo from "../../assets/thermometer.svg";
import locationLogo from "../../assets/locationPins.svg";
import { Context } from "../../Context";

export default function MenuPopup(props) {
  const context = useContext(Context);
  const [showManageLocations, setShowManageLocations] = useState(false);

  const toggleManageLocations = () => {
    setShowManageLocations(!showManageLocations);
  };

  const handleTempSwitch = () => {
    context.switchUnit();
    props.toggleMenu();
  };

  const UnitText = () => {
    if (context.unit === "M") {
      return " Switch to Fahrenheit";
    } else {
      return "Switch to Celsius";
    }
  };

  return (
    <>
      {showManageLocations ? (
        <ManageLocations closeManageLocations={props.toggleMenu} />
      ) : (
        <div className="menuPopup">
          <div className="menuPopup__item" onClick={toggleManageLocations}>
            <img className="menuPopup__item__img" src={locationLogo} alt="" />
            Manage locations
          </div>
          <div className="menuPopup__item" onClick={handleTempSwitch}>
            {" "}
            <img className="menuPopup__item__img" src={tempLogo} alt="" />
            {UnitText()}
          </div>
        </div>
      )}
    </>
  );
}
