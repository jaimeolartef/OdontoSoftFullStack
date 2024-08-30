import React, { useState, useEffect } from 'react';
import './consultarPaciente.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import axios from "axios";
import config from "../../config";
import PacienteTabla from "./pacienteTabla";
import {useLocation} from "react-router-dom";

const ConsultarPaciente = () => {
  const location = useLocation();
  const { redireccionadoModificar } = location.state || {};
  const [formData, setFormData] = useState({
    documento: '',
    nombre: ''
  });

  const initialFormData = {
    documento: '',
    nombre: ''
  };

  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    if (redireccionadoModificar) {
      if (localStorage.getItem('consultarPacienteFormData')) {
        setFormData(JSON.parse(localStorage.getItem('consultarPacienteFormData')));
        console.log('Se va a consumir el servicio con:', formData);
        fetchPacientes(JSON.parse(localStorage.getItem('consultarPacienteFormData'))).then(r => r);
        console.log('Removing item from localStorage : ' + localStorage.getItem('consultarPacienteFormData'));
        localStorage.removeItem('consultarPacienteFormData');
        console.log('Item removed from localStorage' + localStorage.getItem('consultarPacienteFormData'));
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
      alert('Debe realizar la busqueda por nombre o por documento.');
      return;
    }
    localStorage.setItem('consultarPacienteFormData', JSON.stringify(formData));
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
      alert(response.data.mensajeValidacion);
    } else if (response.status === 403) {
      alert('No autorizado');
    } else if (response.status > 400) {
      alert('Error en la solicitud');
    }
  } catch (error) {
    console.error('Error:', error);
    if (error.response && error.response.status === 403) {
      alert('No autorizado');
    } else {
      alert('Error en la solicitud');
    }
  }
};

  return (
    <div className="medical-form-container">
      <header>
        <img src={Logo} alt="Logo"/>
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
      <br/>
      {responseData.length > 0 && <PacienteTabla data={responseData}/>}
      <br/>
    </div>
  );
}

export default ConsultarPaciente;