import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import config from '../../config';
import Logo from '../../resource/LogoNegro.png';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import showMessage from "../../util/UtilMessage";

const VerEntidad = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();
  const [entidad, setEntidad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntidad = async () => {
      try {
        let token = sessionStorage.getItem('jsonwebtoken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get(`${config.baseURL}/eps/consultar/${id}`, {
          validateStatus: function (status) {
            return status;
          }
        });

        if (response.status === 200) {
          setEntidad(response.data);
        } else {
          showMessage('error', 'Error al obtener datos de la entidad');
        }
      } catch (error) {
        showMessage('error', 'Error de conexión: ' + error.message);
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
        <section className="mb-4">
          <h3>Información General</h3>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label fw-bold">Tipo de documento:</label>
                <p className="form-control bg-light">{entidad.tipodocumento}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label fw-bold">Número de documento:</label>
                <p className="form-control bg-light">{entidad.numerodocumento}</p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group mb-3">
                <label className="form-label fw-bold">Nombre:</label>
                <p className="form-control bg-light">{entidad.nombre}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label fw-bold">Tipo de entidad:</label>
                <p className="form-control bg-light">{entidad.tipoentidad}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label fw-bold">Código habilitación Minsalud:</label>
                <p className="form-control bg-light">{entidad.codigominsalud}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label fw-bold">Régimen que administra:</label>
                <p className="form-control bg-light">{entidad.regimenadministra}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <h3>Datos de Contacto</h3>
          <div className="row g-3">
            <div className="col-md-12">
              <div className="form-group mb-3">
                <label className="form-label fw-bold">Dirección:</label>
                <p className="form-control bg-light">{entidad.direccion}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label fw-bold">Teléfono:</label>
                <p className="form-control bg-light">{entidad.telefono}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label fw-bold">Sitio Web:</label>
                <p className="form-control bg-light">{entidad.sitioweb}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label fw-bold">Correo electrónico:</label>
                <p className="form-control bg-light">{entidad.correo}</p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group mb-3">
                <label className="form-label fw-bold">Canales de atención:</label>
                <p className="form-control bg-light">{entidad.canalesatencion}</p>
              </div>
            </div>
          </div>
        </section>

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