import React, { useEffect, useMemo, useState } from 'react';
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Logo from "../../resource/LogoNegro.png";
import Calendario from './Calendario';
import config from "../../config";
import { useLocation } from "react-router-dom";

const CitaMedica = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [paciente, setPaciente] = useState('');
  const [selectedOdontologo, setSelectedOdontologo] = useState('');
  const [selectedPaciente, setSelectedPaciente] = useState('');
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
  const location = useLocation();
  const patient = useMemo(() => {
    return location.state?.patient || {};
  }, [location.state]);

  useEffect(() => {
    const fetchOdontologos = async () => {
      let token = localStorage.getItem('jsonwebtoken');
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
    fetchOdontologos();
  }, []);

  useEffect(() => {
    const fetchPacientes = async () => {
      let token = localStorage.getItem('jsonwebtoken');
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
                nombre: paciente.primernombre.trim() + ' ' + paciente.segundonombre.trim() + ' ' + paciente.primerapellido.trim() + ' ' + paciente.segundoapellido.trim()
              });
            }
          });
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    }
    fetchPacientes();
  }, [odontologo]);

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
    const odontoSelected = odontologo.findIndex(odontologo => odontologo.idMedico == odontoSelec[0]);
    if (odontoSelected > -1) {
      let token = localStorage.getItem('jsonwebtoken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const response = await axios.get(`${config.baseURL}/availability/doctor/${odontoSelec[0]}`);
        if (response.status === 200) {
          let availab = response.data;
          setAvailability(availab);
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
    console.log('Paciente:', paciente);
    console.log('Odontologo:', odontologo);
    console.log('Fecha:', format(startDate, 'dd/MM/yyyy'));
    console.log('Hora:', hora);
    console.log('Motivo:', motivo);
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
                <input
                  className="form-control"
                  list="datalistodontologo"
                  id="dataListOdonto"
                  placeholder="Buscar odontologo..."
                  value={selectedOdontologo || ''}
                  onBlur={handleSearchChangeOdont}
                  onInput={handleOdontologoChange}
                  onChange={handleSearchChangeOdont}
                />
                <datalist id="datalistodontologo">
                  {odontologo.map((odontologo) => (
                    <option key={odontologo.idMedico} value={`${odontologo.idMedico} - ${odontologo.nombre}`} />
                  ))}
                </datalist>
              </div>
              <div className="espacio" />
              <div className="form-group">
                <label htmlFor="paciente">Paciente</label>
                <input
                  className="form-control"
                  list="datalistpaciente"
                  id="dataListPacien"
                  placeholder="Buscar paciente..."
                  value={selectedPaciente || ''}
                  onBlur={handleSearchChangePac}
                  onChange={handlePacienteChange}
                />
                <datalist id="datalistpaciente">
                  {pacientes.map((paci) => (
                    <option key={paci.idPaciente} value={`${paci.idPaciente} - ${paci.nombre}`} />
                  ))}
                </datalist>
              </div>
              <div className="espacio" />
              <div className="calendar-container">
                <Calendario availability={availability} patient={selectedPaciente} />
              </div>
              <div className="espacio" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CitaMedica;