import React, {useEffect, useState} from 'react';
import axios from 'axios';
import config from "../config";
import showMessage from "../util/UtilMessage";
import {useLocation, useNavigate} from "react-router-dom";
import sha256 from "crypto-js/sha256";

const RestaurarContrasenia = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  const [passwordObj, setPasswordObj] = useState({
    usuario: '',
    clave: '',
    nuevaClave: '',
    confirmarClave: ''
  });
  const navigate = useNavigate();
  const usuario = localStorage.getItem('username');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordObj(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (passwordObj.nuevaClave !== passwordObj.confirmarClave) {
      showMessage('error', 'Las claves no coinciden.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(passwordObj.nuevaClave)) {
      showMessage('error', 'La clave debe contener letras, números y un mínimo de 8 caracteres.');
      return;
    }

    const hashClave = sha256(passwordObj.clave).toString();
    const hashClaveNueva = sha256(passwordObj.nuevaClave).toString();
    const hashClaveConfirmar = sha256(passwordObj.confirmarClave).toString();

    const updatedPasswordObj = {
      usuario: usuario,
      clave: hashClave,
      nuevaClave: hashClaveNueva,
      confirmarClave: hashClaveConfirmar
    };

    try {
      const loginObj = {
        usuario: usuario,
        clave: hashClave
      };

      const loginResponse = await axios.post(`${config.baseURL}/user/login`, loginObj);

      const token = localStorage.getItem('jsonwebtoken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const resetResponse = await axios.put(`${config.baseURL}/user/resetpassword`, updatedPasswordObj);
      if (resetResponse.status === 200) {
        showMessage('success', 'La contraseña se cambió correctamente.');
        navigate('/inicio');
        setIsSubmitted(true);
      } else {
        showMessage('error', 'Error al cambiar la contraseña. Por favor, inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      if (error.response.status === 403) {
        showMessage('error', 'Error de autenticación, por favor validar sus credenciales');
        return;
      } else {
        showMessage('error', 'Error al cambiar la contraseña. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-5 w-50">
        <h2 className="card-title text-center">Restaurar Contraseña</h2>
        {isSubmitted ? (
          <p className="text-center">Por favor, revisa tu correo para el enlace de restablecimiento de contraseña.</p>
        ) : (
          <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input id="floatingInputPwd" type="password"
                     className="form-control" name="clave"
                     value={passwordObj.clave} onChange={handleInputChange} placeholder="Clave actual" required/>
              <label htmlFor="floatingInputPwd">Clave actual</label>
              <div className="invalid-feedback">
                Debe ingresar una clave
              </div>
            </div>
            <div className="form-floating mb-3">
              <input id="floatingInputPwdNew" type="password" className="form-control" name="nuevaClave" value={passwordObj.nuevaClave}
                     onChange={handleInputChange} placeholder="Nueva clave" required/>
              <label htmlFor="floatingInputPwdNew">Nueva clave</label>
              <div className="invalid-feedback">
                Debe ingresar una clave
              </div>
            </div>
            <div className="form-floating mb-3">
              <input id="floatingInputPwdRepeat" type="password" className="form-control" name="confirmarClave" value={passwordObj.confirmarClave}
                     onChange={handleInputChange} placeholder="Confirmar clave" required/>
              <label htmlFor="floatingInputPwdRepeat">Confirmar clave</label>
              <div className="invalid-feedback">
                Debe ingresar una clave
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RestaurarContrasenia;