import React, { useState } from 'react';
import './Login.css'; // Asegúrate de tener un archivo CSS para estilos
import axios from "axios";
import sha256 from 'crypto-js/sha256';


const Login = () => {
  const [loginObj, setLoginObj] = useState({
    usuario: '',
    clave: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginObj((prevLoginObj) => ({
      ...prevLoginObj,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    try {
      const hash = sha256(loginObj.clave).toString();
      console.log(hash);
      loginObj.clave = hash;
      const response = await axios.post('http://localhost:8080/user/login', loginObj);
      if (response.status === 200) {
        alert('El registro ha sido exitoso' + response.data.token);
      }
    } catch (error) {
      alert('Error de autenticación, por favor validar sus credenciales');
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

export default Login;
