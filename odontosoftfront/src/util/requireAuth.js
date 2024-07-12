import { useEffect } from "react";
import { connect } from 'react-redux'
import {useNavigate} from "react-router-dom";

export default function (ComposedComponent) {

  const Authenticate = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      if(!props.isAuthenticated) {
        console.log('No autenticado');
        navigate('/login');
      }
    }, [props.isAuthenticated, navigate]);

    return <ComposedComponent {...props} />
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.isLoggedIn
    }
  }

  return connect(mapStateToProps)(Authenticate)
}