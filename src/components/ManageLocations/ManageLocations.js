import React, { useContext } from "react";
import "./ManageLocations.scss";
import { Context } from "../../Context";
import deleteIcon from "../../assets/rubbish-bin.svg";

export default function ManageLocations(props) {
  const context = useContext(Context);
  return (
    <div className="manageLocations">
      <div className="manageLocations_inner">
        {context.locations.map(location => {
          return (
            <div className="manageLocations__item" key={location.id}>
              {location.city}
              {location.mainLocation ? null : (
                <div
                  className="manageLocations__item__deleteBtn"
                  onClick={() => context.deleteLocation(location.id)}
                >
                  <img
                    className="manageLocations__item__deleteBtn--img"
                    src={deleteIcon}
                    alt=""
                  />
                </div>
              )}
            </div>
          );
        })}
        <button
          className="manageLocations__closeBtn"
          onClick={props.closeManageLocations}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
