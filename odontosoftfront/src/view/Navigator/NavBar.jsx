import React from "react";
import Menu from "../Menu";

  const NavBar = (props) => {
    return (
      <div>
        <Menu />
        {props.children}
      </div>
  );
};

  export default NavBar;