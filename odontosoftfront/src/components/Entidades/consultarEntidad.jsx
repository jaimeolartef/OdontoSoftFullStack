import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import './entidadTabla.css';
import { useNavigate } from "react-router-dom";
import showMessage from "../../util/UtilMessage";
import EntidadTabla from "./entidadTabla";
import { apiGet } from '../apiService';

const ConsultarEntidad = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numerodocumento: '',
    nombre: ''
  });

  const rol = sessionStorage.getItem('Rol');
  const [entidades, setEntidades] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchEntidades(formData);
  };

  const fetchEntidades = async (filters = {}) => {
    try {
      setLoading(true);
      // Solo incluimos parámetros si tienen valor
      const params = {};
      if (filters.numerodocumento) params.numerodocumento = filters.numerodocumento;
      if (filters.nombre) params.nombre = filters.nombre;

      const response = await apiGet('/eps/consultar', { queryParams: params });

      if (Array.isArray(response)) {
        setEntidades(response);
        if (response.length === 0) {
          showMessage('info', 'No se encontraron entidades con los criterios de búsqueda');
        }
      } else if (response?.mensajeValidacion) {
        showMessage('error', response.mensajeValidacion);
      } else {
        showMessage('error', 'Error en la solicitud');
      }
    } catch (error) {
      showMessage('error', error?.message || 'Error al consultar entidades');
      setEntidades([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{width: '1500px'}}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{maxWidth: '140px'}}/>
          <h1>Entidades Prestadoras de Salud</h1>
        </header>

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <section className="mb-4">
            <h3>Criterios de búsqueda</h3>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="numerodocumento"
                      value={formData.numerodocumento}
                      onChange={handleChange}
                      placeholder="Número de documento"
                      disabled={rol === 'Paciente'}
                    />
                    <label>Número de documento</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Nombre de la entidad"
                      disabled={rol === 'Paciente'}
                    />
                    <label>Nombre de la entidad</label>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="d-flex justify-content-center mb-4">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Consultando...' : 'Buscar'}
            </button>
          </div>
        </form>

        <EntidadTabla data={entidades} loading={loading} />

        <div className="d-flex justify-content-center mt-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/inicio')}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsultarEntidad;