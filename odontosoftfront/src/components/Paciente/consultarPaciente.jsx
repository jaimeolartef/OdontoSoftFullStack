import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './consultarPaciente.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import axios from "axios";
import config from "../../config";
import PacienteTabla from "./pacienteTabla";
import {useLocation, useNavigate} from "react-router-dom";
import showMessage from "../../util/UtilMessage";

const ConsultarPaciente = () => {
  const location = useLocation();
  const [permisosHistoria, setPermisosHistoria] = useState([]);
  const [permisosPaciente, setPermisosPaciente] = useState([]);
  const { redireccionadoModificar } = location.state || {};
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    documento: '',
    nombre: ''
  });
  const rol = localStorage.getItem('Rol');

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

  useEffect(() => {
    if (rol === 'Paciente') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        documento: localStorage.getItem('documento')
      }));
    }
  }, [rol]);

  useEffect(() => {
    if (rol === 'Paciente' && formData.documento) {
      handleSubmit(new Event('submit'));
    }
  }, [formData.documento]);

  useEffect(() => {
    if (permisosHistoria.length === 0 && permisosPaciente.length === 0) {
      let menuUser = JSON.parse(localStorage.getItem('menuUser'));
      if (menuUser) {
        const newPermisosHistoria = [];
        const newPermisosPaciente = [];
        menuUser.forEach((item) => {
          if (item.nombreMenu === 'Pacientes') {
            item.menuHijo.forEach((itemHijo) => {
              if (itemHijo.nombreMenu === 'Historia Clinica') {
                newPermisosHistoria.push({
                  pantalla: itemHijo.nombreMenu.trim(),
                  consultar: itemHijo.consultar,
                  editar: itemHijo.editar,
                  eliminar: itemHijo.eliminar,
                  crear: itemHijo.crear
                });
              } else if (itemHijo.nombreMenu === 'Registrar paciente') {
                newPermisosPaciente.push({
                  pantalla: itemHijo.nombreMenu.trim(),
                  consultar: itemHijo.consultar,
                  editar: itemHijo.editar,
                  eliminar: itemHijo.eliminar,
                  crear: itemHijo.crear
                });
              }
            });
          }
        });
        setPermisosHistoria(newPermisosHistoria);
        setPermisosPaciente(newPermisosPaciente);
      }
    }
  }, [rol]);

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
      <div className="card p-4" style={{width: '1500px'}}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{maxWidth: '140px'}}/>
          <h1>Consultar Paciente</h1>
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
            <button type="submit" className="btn btn-primary" disabled={rol === 'Paciente'}>Consultar</button>
          </div>
        </form>
        <br/>
        <PacienteTabla data={responseData} formData={formData} permisosPaciente={permisosPaciente}
                       permisosHistoria={permisosHistoria}/>
        <br/>
        <button type="button" className="btn btn-secondary"
                onClick={() => navigate('/inicio')}>Cancelar
        </button>
      </div>
    </div>
  );
}

export default ConsultarPaciente;