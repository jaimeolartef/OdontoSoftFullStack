import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../resource/LogoNegro.png';
import { useNavigate, useLocation } from 'react-router-dom';
import showMessage from "../../util/UtilMessage";
import { apiGet } from '../apiService';

const VerEntidad = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();
  const [entidad, setEntidad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntidad = async () => {
      try {
        const response = await apiGet(`/eps/consultar/${id}`);
        if (response) {
          setEntidad(response);
        } else {
          showMessage('error', 'Error al obtener datos de la entidad');
        }
      } catch (error) {
        showMessage('error', 'Error de conexión: ' + (error?.message || ''));
      } finally {
        setLoading(false);
      }
    };
    fetchEntidad();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!entidad) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="alert alert-danger" role="alert">
          No se encontró la entidad solicitada
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ width: '1200px' }}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{ maxWidth: '140px' }} />
          <h1>Detalles de la Entidad Prestadora de Salud</h1>
        </header>
        {/* ...resto del renderizado igual... */}
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/entidad')}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerEntidad;