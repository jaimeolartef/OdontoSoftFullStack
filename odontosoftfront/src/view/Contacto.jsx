import React from "react";

const Menu = () => {

  const loadPage = (event) => {
    console.log('Cargo el menu')
  }

  return(
    <div className="parent">
      <div className="container">
        <h2>Inicio de sesión</h2>
        <form>
          <label>Menu</label>
        </form>
      </div>
    </div>
  );
};

export default Menu;