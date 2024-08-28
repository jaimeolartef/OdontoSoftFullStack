import React, { useState } from 'react';
import './consultarPaciente.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import axios from "axios";
import config from "../../config";
import PacienteTable from "../Paciente/PacienteTable";


const ConsultarPaciente = () => {

  const [formData, setFormData] = useState({
    documento: '',
    nombre: ''
  });

  const initialFormData = {
    documento: '',
    nombre: ''
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const [responseData, setResponseData] = useState([]);

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
    alert('Debe realizar la busqueda por nombre o por documento.');
    return;
  }

  let token = localStorage.getItem('jsonwebtoken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.get(`${config.baseURL}/pacientes/consultar`, {
    params: formData,
    validateStatus: function (status) {
      return status;
    }
  })
    .then(response => {
      if (response.status === 200) {
        setResponseData(response.data);
        resetForm();
      } else if (response.status === 400 && response.data.codigoValidacion === '400') {
        alert(response.data.mensajeValidacion);
      } else if (response.status === 403) {
        alert('No autorizado');
      } else if (response.status > 400) {
        alert('Error en la solicitud');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      if (error.response && error.response.status === 403) {
        alert('No autorizado');
      } else {
        alert('Error en la solicitud');
      }
    });
};

  return (
    <div className="medical-form-container">
      <header>
        <img src={Logo} alt="Logo" />
        <h1>Registrar Paciente</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <section className="personal-information">
          <h3>Consultar paciente</h3>
          <div className="input-box">
            <input type="text" name="documento" value={formData.documento} onChange={handleChange}/>
            <label>Número de documento de identidad</label>
          </div>
          <div className="input-box">
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}/>
            <label>Nombre</label>
          </div>
        </section>
        <button type="submit" className="btn">Consultar</button>
      </form>
      {responseData.length > 0 && <PacienteTable data={responseData} />}
    </div>
  );
}

export default ConsultarPaciente