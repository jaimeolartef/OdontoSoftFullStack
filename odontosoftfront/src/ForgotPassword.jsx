import React, { useState } from 'react';
import axios from 'axios';
import config from './config';
import showMessage from '../src/util/UtilMessage';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${config.baseURL}/user/recordarContrasenia`, { "email": email });
      if (response.status === 201) {
        showMessage('success', 'Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico.');
      }
    } catch (error) {
      showMessage('error', 'Error al enviar el enlace de restablecimiento de contraseña.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-5 w-50">
        <h2 className="card-title text-center">Recordar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Correo Electrónico"
              required
            />
            <label>Correo Electrónico</label>
            <div className="invalid-feedback">
              Debe ingresar un correo electrónico válido
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Enviar Enlace
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/inicio')}>
              Regresar al Inicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;