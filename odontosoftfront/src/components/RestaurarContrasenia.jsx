import React, { useState } from 'react';
import showMessage from "../util/UtilMessage";
import { useNavigate } from "react-router-dom";
import sha256 from "crypto-js/sha256";
import { apiPost, apiPut } from './apiService';

const RestaurarContrasenia = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordObj, setPasswordObj] = useState({
    clave: '',
    nuevaClave: '',
    confirmarClave: ''
  });
  const navigate = useNavigate();
  const usuario = sessionStorage.getItem('username');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordObj(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      usuario,
      clave: hashClave,
      nuevaClave: hashClaveNueva,
      confirmarClave: hashClaveConfirmar
    };

    try {
      await apiPost('/user/login', { usuario, clave: hashClave });
      await apiPut('/user/resetpassword', updatedPasswordObj);
      showMessage('success', 'La contraseña se cambió correctamente.');
      navigate('/inicio');
      setIsSubmitted(true);
    } catch (error) {
      showMessage('error', error?.message || 'Error al cambiar la contraseña. Por favor, inténtalo de nuevo más tarde.');
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
              <input type="password" className="form-control" name="clave"
                value={passwordObj.clave} onChange={handleInputChange} placeholder="Clave actual" required />
              <label>Clave actual</label>
              <div className="invalid-feedback">Debe ingresar una clave</div>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" name="nuevaClave"
                value={passwordObj.nuevaClave} onChange={handleInputChange} placeholder="Nueva clave" required />
              <label>Nueva clave</label>
              <div className="invalid-feedback">Debe ingresar una clave</div>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" name="confirmarClave"
                value={passwordObj.confirmarClave} onChange={handleInputChange} placeholder="Confirmar clave" required />
              <label>Confirmar clave</label>
              <div className="invalid-feedback">Debe ingresar una clave</div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RestaurarContrasenia;