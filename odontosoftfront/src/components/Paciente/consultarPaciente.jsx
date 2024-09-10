import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './consultarPaciente.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import axios from "axios";
import config from "../../config";
import PacienteTabla from "./pacienteTabla";
import { useLocation } from "react-router-dom";
import showMessage from "../../util/UtilMessage";

const ConsultarPaciente = () => {
  const location = useLocation();
  const { redireccionadoModificar } = location.state || {};
  const [formData, setFormData] = useState({
    documento: '',
    nombre: ''
  });

  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    if (redireccionadoModificar) {
      if (localStorage.getItem('consultarPacienteFormData')) {
        setFormData(JSON.parse(localStorage.getItem('consultarPacienteFormData')));
        fetchPacientes(JSON.parse(localStorage.getItem('consultarPacienteFormData'))).then(r => r);
        localStorage.removeItem('consultarPacienteFormData');
      }
    } else if (localStorage.getItem('consultarPacienteFormData')) {
      localStorage.removeItem('consultarPacienteFormData');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.documento && !formData.nombre) {
      showMessage('warning', 'Debe realizar la busqueda por nombre o por documento.');
      return;
    }
    fetchPacientes(formData).then(r => r);
  };

  const fetchPacientes = async (formData) => {
    try {
      let token = localStorage.getItem('jsonwebtoken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`${config.baseURL}/pacientes/consultar`, {
        params: formData,
        validateStatus: function (status) {
          return status;
        }
      });

      if (response.status === 200) {
        setResponseData(response.data);
      } else if (response.status === 400 && response.data.codigoValidacion === '400') {
        showMessage('error', response.data.mensajeValidacion);
      } else if (response.status === 403) {
        showMessage('error', 'No autorizado');
      } else if (response.status > 400) {
        showMessage('error', 'Error en la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 403) {
        showMessage('error', 'No autorizado');
      } else {
        showMessage('error', 'Error en la solicitud');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card p-4" style={{ width: '800px' }}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{ maxWidth: '140px' }} />
          <h1>Consultar Paciente</h1>
        </header>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <section className="mb-4">
            <h3>Información Personal</h3>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="documento" value={formData.documento} onChange={handleChange} placeholder="Documento de Identidad" />
              <label>Documento de Identidad</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" />
              <label>Nombre</label>
            </div>
          </section>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Consultar</button>
          </div>
        </form>
        <br />
        {responseData.length > 0 && <PacienteTabla data={responseData} formData={formData} />}
        <br />
      </div>
    </div>
  );
}

export default ConsultarPaciente;