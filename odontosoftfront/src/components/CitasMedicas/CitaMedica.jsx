import React, { useEffect, useMemo, useState } from 'react';
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import Logo from "../../resource/LogoNegro.png";
import Calendario from './Calendario';
import config from "../../config";
import { useLocation, useNavigate } from "react-router-dom";
import showMessage from "../../util/UtilMessage";

const CitaMedica = () => {
  const [paciente, setPaciente] = useState('');
  const [selectedOdontologo, setSelectedOdontologo] = useState('');
  const [selectedPaciente, setSelectedPaciente] = useState('');
  const navigate = useNavigate();
  const [odontologo, setOdontologo] = useState([
    {
      idMedico: 0,
      nombre: ''
    }
  ]);
  const [pacientes, setPacientes] = useState([
    {
      idPaciente: 0,
      nombre: ''
    }
  ]);
  const [availability, setAvailability] = useState([]);
  const [calendarKey, setCalendarKey] = useState(0); // Estado para controlar la clave del componente Calendario
  const location = useLocation();
  const patient = useMemo(() => {
    return location.state?.patient || {};
  }, [location.state]);
  const Rol = sessionStorage.getItem('Rol');

  useEffect(() => {
    fetchOdontologos();
    fetchPacientes();
  }, []);

  const fetchOdontologos = async () => {
    let token = sessionStorage.getItem('jsonwebtoken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${config.baseURL}/doctor/consultar`);
      if (response.status === 200) {
        setOdontologo(response.data);
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  }

  const fetchPacientes = async () => {
    if (Rol != 'Paciente') {
      let token = sessionStorage.getItem('jsonwebtoken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const response = await axios.get(`${config.baseURL}/pacientes/listar`);
        if (response.status === 200) {
          let index0 = pacientes.findIndex(paci => paci.idPaciente === 0);
          if (index0 > -1) {
            pacientes.splice(index0, 1);
          }
          response.data.map((paciente) => {
            let index = pacientes.findIndex(paci => paci.idPaciente === paciente.id);
            if (index === -1) {
              pacientes.push({
                idPaciente: paciente.id,
                nombre: paciente.primernombre.trim() + ' ' + (paciente.segundonombre == null ? '': paciente.segundonombre.trim()) + ' ' + paciente.primerapellido.trim() + ' ' + (paciente.segundoapellido == null ? '': paciente.segundoapellido.trim())
              });
            }
          });
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    } else {
      let token = sessionStorage.getItem('jsonwebtoken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const response = await axios.get(`${config.baseURL}/pacientes/consultar/${sessionStorage.getItem('idPaciente')}`);
        if (response.status === 200) {
          setSelectedPaciente(response.data.id + ' - ' + (response.data.segundonombre == null ? '': response.data.segundonombre) + ' ' + response.data.primerapellido.trim() + ' ' + (response.data.segundoapellido == null ? '': response.data.segundoapellido.trim()));
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    }
  }

  const handleSearchChangeOdont = (event) => {
    setSelectedOdontologo(event.target.value);
  }

  const handleSearchChangePac = (event) => {
    setSelectedPaciente(event.target.value);
  }

  const handleOdontologoChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOdontologo(selectedValue);
    let odontoSelec = selectedValue.split(' - ');
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    const odontoSelected = odontologo.findIndex(odontologo => odontologo.idMedico == odontoSelec[0]);
    if (odontoSelected > -1) {
      let token = sessionStorage.getItem('jsonwebtoken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const response = await axios.get(`${config.baseURL}/availability/doctor/${odontoSelec[0]}?month=${month}&year=${year}`);
        if (response.status === 200) {
          let availab = response.data;
          if (availab.length === 0) {
            showMessage('warning', 'La agenda no esta disponible para el mes seleccionado');
          } else {
            setAvailability(availab);
            setCalendarKey(prevKey => prevKey + 1); // Cambiar la clave del componente Calendario
          }
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    }
  }

  const handlePacienteChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPaciente(selectedValue);
    let paciSelec = selectedValue.split(' - ');
    const paciSelected = pacientes.findIndex(paciente => paciente.idPaciente == paciSelec[0]);
    if (paciSelected > -1) {
      setPaciente(pacientes[paciSelected].nombre);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleClearOdontologo = () => {
    setSelectedOdontologo('');
    setAvailability([]);
    setCalendarKey(prevKey => prevKey + 1); // Cambiar la clave del componente Calendario
  };

  const handleClearPaciente = () => {
    setSelectedPaciente('');
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ width: '1500px' }}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{ maxWidth: '140px' }} />
          <h1>Asignación de Citas</h1>
        </header>
        <div className="card">
          <div className="card-header">
            <h2>Agendar Cita Medica</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="odontologo">Odontologo</label>
                <div className="input-group">
                  <input className="form-control"
                         list="datalistodontologo"
                         id="dataListOdonto"
                         placeholder="Buscar odontologo..."
                         value={selectedOdontologo || ''}
                         onBlur={handleSearchChangeOdont}
                         onInput={handleOdontologoChange}
                         onChange={handleSearchChangeOdont}
                         autoComplete="off"/>
                  <button type="button" className="btn btn-outline-secondary" onClick={handleClearOdontologo}>
                    Limpiar
                  </button>
                </div>
                <datalist id="datalistodontologo">
                  {odontologo.map((odontologo) => (
                    <option key={odontologo.idMedico} value={`${odontologo.idMedico} - ${odontologo.nombre}`}/>
                  ))}
                </datalist>
              </div>
              <div className="espacio"/>
              {Rol != 'Paciente' && (
                <div className="form-group">
                  <label htmlFor="paciente">Paciente</label>
                  <div className="input-group">
                    <input className="form-control"
                           list="datalistpaciente"
                           id="dataListPacien"
                           placeholder="Buscar paciente..."
                           value={selectedPaciente || ''}
                           onBlur={handleSearchChangePac}
                           onChange={handlePacienteChange}
                           autoComplete="off"/>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleClearPaciente}>
                      Limpiar
                    </button>
                  </div>
                  <datalist id="datalistpaciente">
                    {pacientes.map((paci) => (
                      <option key={paci.idPaciente} value={`${paci.idPaciente} - ${paci.nombre}`}/>
                    ))}
                  </datalist>
                </div>
              )}
              <div className="espacio"/>
              <div className="calendar-container">
                <Calendario key={calendarKey} availability={availability} patient={selectedPaciente}
                            setAvailability={setAvailability} Rol={Rol}/>
              </div>
              <div className="espacio"/>
              <button type="button" className="btn btn-secondary"
                      onClick={() => navigate('/inicio')}>Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CitaMedica;