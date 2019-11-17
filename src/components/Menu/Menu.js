import React, { useState } from "react";
import MenuPopup from "../MenuPopup/MenuPopup";
import menu from "../../assets/menu.svg";
import search from "../../assets/search.svg";
import "./Menu.scss";

const Menu = props => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="menu">
      <img
        className="menu__svg"
        src={search}
        alt="menu-icon"
        onClick={props.toggleSearch}
      />
      <img
        className="menu__svg"
        src={menu}
        alt="menu-icon"
        onClick={toggleMenu}
      />
      {menuOpen ? <MenuPopup toggleMenu={toggleMenu} /> : null}
    </div>
  );
};

export default Menu;
