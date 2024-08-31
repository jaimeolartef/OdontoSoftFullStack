import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import './Menu.css';

function Menu(props) {
  // Recuperar la variable del localStorage
  let data = localStorage.getItem('menuUser');
  let dataMenu = [];

  // Comprobar si la variable existe
  if (data) {
    // Convertir la cadena JSON en un objeto JavaScript
    data = JSON.parse(data);

    // Recorrer el objeto
    for (let key in data) {
      if (data[key] != null) {
        dataMenu.push(JSON.parse(JSON.stringify(data[key])));
      }
    }
  } else {
    console.log('No data found in localStorage for key "menuUser"');
  }

  const renderSubMenu = (menu) => {
    if (menu.menuHijo !== undefined && menu.menuHijo !== null && menu.menuHijo.length > 0) {
      return (
        <div className="dropdown-content">
          {menu.menuHijo.map((subMenu, index) => (
            <Link key={index} to={subMenu.url}>{subMenu.nombreMenu}</Link>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <nav className="menu">
      {props.isLoggedIn != null && props.isLoggedIn ?
        dataMenu.map((menu, index) => (
          <div key={index} className="menu-item">
            <Link to={menu.url}>{menu.nombreMenu}</Link>
            {renderSubMenu(menu)}
          </div>
        ))
        : null}
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps)(Menu);