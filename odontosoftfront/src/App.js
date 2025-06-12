import React, { useState } from 'react';
import './Login.css';
import sha256 from 'crypto-js/sha256';
import { useNavigate } from 'react-router-dom';
import showMessage from "../src/util/UtilMessage";
import { apiPost } from './components/apiService'; // Importa apiPost

function App() {
  const [loginObj, setLoginObj] = useState({
    usuario: '',
    clave: '',
  });

  const [usuarioDto, setUsuarioDto] = useState({
    codigo: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginObj((prevLoginObj) => ({
      ...prevLoginObj,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const hash = sha256(loginObj.clave).toString();
      const loginData = { ...loginObj, clave: hash };

      // Login
      const loginResponse = await apiPost('/user/login', loginData, { includeAuth: false });
      if (loginResponse) {
        sessionStorage.setItem('jsonwebtoken', loginResponse.token);
        const usuarioCodigo = loginResponse.usuario;
        setUsuarioDto({ codigo: usuarioCodigo });

        // Validar rol
        const roleResponse = await apiPost('/user/validateRole', { codigo: usuarioCodigo });
        const responseValidateRole = JSON.stringify(roleResponse.menus);
        sessionStorage.setItem('menuUser', responseValidateRole);
        sessionStorage.setItem('username', usuarioCodigo);

        navigate('/inicio');
      } else {
        showMessage('error', 'Error de autenticación, por favor validar sus credenciales');
      }
    } catch (error) {
      showMessage('error', 'Error de autenticación, por favor validar sus credenciales');
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
}

export default App;