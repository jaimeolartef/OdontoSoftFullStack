import React, { useState } from 'react';
import './Login.css'; // Asegúrate de tener un archivo CSS para estilos
import axios from "axios";
import sha256 from 'crypto-js/sha256';
import {connect} from "react-redux";
import { useNavigate } from 'react-router-dom';
import config from './config';
import showMessage from "../src/util/UtilMessage";
//TODO poder dar enter en el boton de la contraseña para hacer login

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

    axios.post(`${config.baseURL}/user/login`, loginObj)
      .then(response => {
        if (response.data) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
          localStorage.setItem('jsonwebtoken', response.data.token);
          usuarioDto.codigo = response.data.usuario;
          axios.post(`${config.baseURL}/user/validateRole`, usuarioDto)
            .then(responseMenu => {
              const responseValidateRole = JSON.stringify(responseMenu.data.menus);
              localStorage.setItem('menuUser', responseValidateRole);
              navigate('/inicio');
              localStorage.setItem('username', usuarioDto.codigo);
              props.onLoggedIn();
            }).catch(error => {
            showMessage('error','Error al validar el rol del usuario');
            });
        } else {
          showMessage('error','Error de autenticación, por favor validar sus credenciales');
        }
      }).catch(error => {
      showMessage('error','Error de autenticación, por favor validar sus credenciales');
      });
  } catch (error) {
    showMessage('error','Error ' + error);
  }
};

  return (
    <div className="parent">
      <div className="container">
        <div>
          <h2>Inicio de sesión</h2>
          <form>
            <div className="input-box">
              <input type="usuario" className="input-translate" name="usuario" value={loginObj.usuario} onChange={handleInputChange} required/>
              <label>Usuario</label>
            </div>
            <div className="input-box">
              <input type="password" className="input-translate" name="clave" value={loginObj.clave} onChange={handleInputChange} required/>
              <label>Clave</label>
            </div>
            <div className="center">
              <button type="button" className="btn" onClick={handleLogin}>
                Iniciar Sesión
              </button>
            </div>
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
