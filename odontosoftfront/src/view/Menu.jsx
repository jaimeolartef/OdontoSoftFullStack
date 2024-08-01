import {Link} from "react-router-dom";
import "./Menu.css";
import React from "react";
import {connect} from "react-redux";

function Menu(props) {

    // Recuperar la variable del localStorage
  let data = localStorage.getItem('menuUser');
  if (data) {
    console.log('menuUser:', data);
  } else {
    console.log('No data found in localStorage for key "menuUser"');
  }

  return (
    <nav className="navigation">
      {props.isLoggedIn != null && props.isLoggedIn ? <Link to="/registroPac" className="menu">Registro Paciente</Link> : null}
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps)(Menu)