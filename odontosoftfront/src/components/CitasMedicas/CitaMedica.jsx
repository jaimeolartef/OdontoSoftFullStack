import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {format} from 'date-fns';
import Logo from "../../resource/LogoNegro.png";
import Calendar from 'react-calendar';
import styled from 'styled-components';
import Calendario from './Calendario';

const StyledCalendar = styled(Calendar);

const Event = styled.div;

const CitaMedica = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [paciente, setPaciente] = useState('');
  const [odontologo, setOdontologo] = useState('');

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
                <div className="calendar-container">
                  <Calendario />
                </div>
                <div className="form-group">
                  <label>Paciente</label>
                  <input type="text" className="form-control" value={paciente}
                         onChange={(e) => setPaciente(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>Odontologo</label>
                  <input type="text" className="form-control" value={odontologo}
                         onChange={(e) => setOdontologo(e.target.value)}/>
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
                <button type="submit" className="btn btn-primary">Guardar</button>
              </form>
            </div>
          </div>
      </div>
    </div>
  );
}

export default CitaMedica;