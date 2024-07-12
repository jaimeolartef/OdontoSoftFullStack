import {Link} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

function Menu(props) {
  console.log('Imprimir 1:' + props.isLoggedIn);
  return (
    <nav className="navigation">
      {props.isLoggedIn != null && props.isLoggedIn ? <Link to="/contacto">Contacto</Link> : null}
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps)(Menu)