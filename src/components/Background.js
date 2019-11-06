import React from "react";
import cloud from "../assets/cloud.svg";
import "./Background.scss";

export default function Background() {
  return (
    <div className="background">
      <img className="background__cloud1" src={cloud} alt="" />
      <img className="background__cloud2" src={cloud} alt="" />
      <img className="background__cloud3" src={cloud} alt="" />
    </div>
  );
}
