import React, { useState } from 'react';
import './Login.css'; // Asegúrate de tener un archivo CSS para estilos
import axios from "axios";
import sha256 from 'crypto-js/sha256';
import {connect} from "react-redux";
import { useNavigate } from 'react-router-dom';
import Contacto from "./view/Contacto";



const Login = (props) => {
  const [loginObj, setLoginObj] = useState({
    usuario: '',
    clave: '',
  });


  const [usuarioDto, setUsuarioDto] = useState({
    codigo : ''
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginObj((prevLoginObj) => ({
      ...prevLoginObj,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    try {
      const hash = sha256(loginObj.clave).toString();
      loginObj.clave = hash;

      axios.post('http://localhost:8080/user/login', loginObj)
        .then(response => {
          if (response.data) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            localStorage.setItem('jsonwebtoken', response.data.token);
            usuarioDto.codigo = response.data.usuario;
            //const responseMenu = axios.post('http://localhost:8080/user/validateRole', usuarioDto);
            navigate(Contacto);
            localStorage.setItem('username', usuarioDto.codigo);
            props.onLoggedIn();
          }  else {
            alert('Error de autenticación, por favor validar sus credenciales');
          }
        }).catch(error => {
        alert('Error de autenticación, por favor validar sus credenciales');
      })
    } catch (error) {
      alert('Error ' + error);
    }
  };

  return (
    <div className="parent">
      <div className="container">
        <div>
          <h2>Inicio de sesión</h2>
          <form>
            <div className="input-box">
              <input type="usuario" name="usuario" value={loginObj.usuario} onChange={handleInputChange} required />
              <label>Usuario</label>
            </div>
            <div className="input-box">
              <input type="password" name="clave" value={loginObj.clave} onChange={handleInputChange} required />
              <label>Clave</label>
            </div>
            <button type="button" className="btn" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDisPatchToProps = (dispatch) => {
  return {
    onLoggedIn: () => dispatch({type: 'ON_LOGGED_IN'})
  }
}

export default connect(null, mapDisPatchToProps)(Login);
