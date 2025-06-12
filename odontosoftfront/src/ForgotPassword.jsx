import React, { useState } from 'react';
import showMessage from '../src/util/UtilMessage';
import { useNavigate } from 'react-router-dom';
import { apiPut } from './components/apiService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiPut('/user/recordarContrasenia', {email}, {includeAuth: false});
      showMessage('success', 'Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico.');
    } catch (error) {
      showMessage('error', error?.message || 'Error al enviar el enlace de restablecimiento de contraseña.');
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
              Enviar nueva contraseña
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