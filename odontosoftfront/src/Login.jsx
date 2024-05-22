import React, { useState } from 'react';
import './Login.css'; // Asegúrate de tener un archivo CSS para estilos

const Login = () => {
  const [loginObj, setLoginObj] = useState({
    EmailId: '',
    Password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginObj((prevLoginObj) => ({
      ...prevLoginObj,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log('Email:', loginObj.EmailId);
    console.log('Password:', loginObj.Password);
  };

  return (
    <div className="parent">
      <div className="container">
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="input-box">
              <input type="email" name="EmailId" value={loginObj.EmailId} onChange={handleInputChange} required />
              <label>Email</label>
            </div>
            <div className="input-box">
              <input type="password" name="Password" value={loginObj.Password} onChange={handleInputChange} required />
              <label>Password</label>
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
