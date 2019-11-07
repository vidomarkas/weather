import React, { useState } from "react";
import menu from "../assets/menu.svg";
import "./Menu.scss";

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log("from togglemenu", menuOpen);
  };

  //Check if menu is open
  // React.useEffect(() => {
  //   if (menuOpen === true) {
  //     console.log("open");
  //   } else {
  //     console.log("false");
  //   }
  // }, [menuOpen]);

  return (
    <div className="menu" onClick={toggleMenu}>
      <img className="menu__svg" src={menu} alt="" />
    </div>
  );
};

export default Menu;
