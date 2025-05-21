import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import './entidadTabla.css';
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import showMessage from "../../util/UtilMessage";
import EntidadTabla from "./entidadTabla";

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
            <h3>Información Personal</h3>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="documento" value={formData.documento}
                     onChange={handleChange} placeholder="Documento de Identidad" disabled={rol === 'Paciente'}/>
              <label>Documento de Identidad</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange}
                     placeholder="Nombre" disabled={rol === 'Paciente'}/>
              <label>Nombre</label>
            </div>
          </section>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Consultando...' : 'Consultar'}
            </button>
          </div>
        </form>
        <br/>
        <EntidadTabla data={entidades} loading={loading} />
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

export default ConsultarEntidad;