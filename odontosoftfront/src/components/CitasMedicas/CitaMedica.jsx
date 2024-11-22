import React, {useEffect, useState} from 'react';
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {format} from 'date-fns';
import Logo from "../../resource/LogoNegro.png";
import Calendar from 'react-calendar';
import styled from 'styled-components';
import Calendario from './Calendario';
import config from "../../config";

const StyledCalendar = styled(Calendar);

const Event = styled.div;

const CitaMedica = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [paciente, setPaciente] = useState('');
  const [selectedOdontologo, setSelectedOdontologo] = useState('');
  const [odontologo, setOdontologo] = useState([
    {
      idMedico: 0,
      nombre: ''
    }
  ]);

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

  const handleSearchChangeOdont = (event) => {
    setSelectedOdontologo(event.target.value);
  }

  const handleOdontologoChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOdontologo(selectedValue);
    console.log('Selected:', selectedValue);
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
      <div className="card p-4" style={{width: '1500px'}}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{maxWidth: '140px'}}/>
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
                      placeholder="Buscar Odontologo..."
                      value={selectedOdontologo}
                      onBlur={handleSearchChangeOdont}
                      onInput={handleOdontologoChange}
                    />
                    <datalist id="datalistodontologo">
                      {odontologo.map((odontologo) => (
                        <option key={odontologo.idMedico} value={odontologo.nombre}/>
                      ))}
                    </datalist>
                </div>
                <div className="espacio"/>
                <div className="calendar-container">
                  <Calendario/>
                </div>
                <div className="form-group">
                  <label>Paciente</label>
                  <input type="text" className="form-control" value={paciente}
                         onChange={(e) => setPaciente(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>Fecha</label>
                  <DatePicker selected={startDate} onChange={date => setStartDate(date)}/>
                </div>
                <div className="form-group">
                  <label>Hora</label>
                  <input type="time" className="form-control" value={hora} onChange={(e) => setHora(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>Motivo</label>
                  <textarea className="form-control" value={motivo} onChange={(e) => setMotivo(e.target.value)}/>
                </div>
                <div className="espacio"/>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </form>
            </div>
          </div>
      </div>
    </div>
  );
}

export default CitaMedica;