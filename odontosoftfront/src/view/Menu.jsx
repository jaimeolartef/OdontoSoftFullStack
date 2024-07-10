import {Link} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

function Menu(props) {
  return (
    <nav className="navigation">
      {props.isLoggedIn ? <Link to="/contacto">Contacto</Link> : null}
      {props.isLoggedIn ? null : <Link to="/login">Login</Link>}
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps)(Menu)