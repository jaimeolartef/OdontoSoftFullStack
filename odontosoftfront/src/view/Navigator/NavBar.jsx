import React from "react";
import {Link, NavLink} from "react-router-dom";
import Menu from "../Menu";

//const links = localStorage.getItem("menu");

/*const links = [
  {
    name: "Login",
    href: "./Menu"
  },
  {
    name: "Menu",
    href: "./Menu"
  },
  {
    name: "Contact",
    href: "Contact"
  }
];*/

  const NavBar = (props) => {
    return (
      <div>
        <Menu />
        {props.children}
      </div>
  );
};

  export default NavBar;