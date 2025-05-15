import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import showMessage from "../../util/UtilMessage";

const Entidad = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numerodocumento: '',
    nombre: ''
  });

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
    fetchEntidades();
  };

  const fetchEntidades = async () => {
    try {
      setLoading(true);
      let token = sessionStorage.getItem('jsonwebtoken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`${config.baseURL}/eps/consultar`, {
        params: formData,
        validateStatus: function (status) {
          return status;
        }
      });

      if (response.status === 200) {
        setEntidades(response.data);
      } else if (response.status === 400) {
        showMessage('error', response.data.mensajeValidacion || 'Error en los datos');
      } else if (response.status === 403) {
        showMessage('error', 'No autorizado');
      } else {
        showMessage('error', 'Error en la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
      showMessage('error', 'Error al consultar entidades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntidades();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{width: '1500px'}}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{maxWidth: '140px'}}/>
          <h1>Entidades Prestadoras de Salud</h1>
        </header>

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <section className="mb-4">
            <h3>Filtros de Búsqueda</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="numerodocumento"
                    value={formData.numerodocumento}
                    onChange={handleChange}
                    placeholder="Número de Documento"
                  />
                  <label>Número de Documento</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                  />
                  <label>Nombre</label>
                </div>
              </div>
            </div>
          </section>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Consultando...' : 'Consultar'}
            </button>
          </div>
        </form>

        <div className="mt-4">
          <h3>Resultados</h3>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Tipo Doc.</th>
                  <th>Número Doc.</th>
                  <th>Nombre</th>
                  <th>Tipo Entidad</th>
                  <th>Código Habilitación</th>
                  <th>Régimen</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Sitio Web</th>
                  <th>Correo</th>
                </tr>
              </thead>
              <tbody>
                {entidades.length > 0 ? (
                  entidades.map((entidad, index) => (
                    <tr key={index}>
                      <td>{entidad.idtipodocumento}</td>
                      <td>{entidad.numerodocumento}</td>
                      <td>{entidad.nombre}</td>
                      <td>{entidad.idtipoentidad}</td>
                      <td>{entidad.codigohabilitacionminsalud}</td>
                      <td>{entidad.idregimenadministra}</td>
                      <td>{entidad.direccion}</td>
                      <td>{entidad.telefono}</td>
                      <td>{entidad.sitioweb}</td>
                      <td>{entidad.correo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      {loading ? 'Cargando datos...' : 'No se encontraron entidades'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d-grid mt-3">
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

export default Entidad;