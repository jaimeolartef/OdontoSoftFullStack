import './Calendario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import showMessage from "../../util/UtilMessage";
import { Modal, Button } from 'react-bootstrap';
import axios from "axios";
import config from "../../config";

const Calendar = ({ availability, citaMedicas }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date().getDate();
  const [availableHours, setAvailableHours] = useState([]);
  const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedCita, setSelectedCita] = useState(null);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

  const toggleDaySelection = (day, month, year) => {
    if (availability.length === 0) {
      showMessage('warning', 'Debe seleccionar un odontólogo para ver su disponibilidad');
      return;
    }

    if (day < new Date().getDate() && month <= new Date().getMonth() && year <= new Date().getFullYear()) {
      showMessage('warning', 'Debe seleccionar un día igual o posterior al día actual');
      return;
    }

    setSelectedDay(day);
    setSelectedMonth(month);
    setSelectedYear(year);

    let date = new Date(year, month, day);
    let dayOfWeek = date.getDay();

    let hourFinal = '';
    const availableHours = availability
      .filter(item => item.diaSemana === dayOfWeek)
      .map(item => {
        const start = parseInt(item.horaInicio.split(':')[0], 10);
        const end = parseInt(item.horaFin.split(':')[0], 10);
        hourFinal = end;
        return Array.from({ length: (end - start) * 2 }, (_, i) => `${String(start + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`);
      })
      .flat();

    if (new Date().getHours() > hourFinal && day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
      showMessage('warning', 'El día de hoy ya no puede agendar citas');
      setAvailableHours([]);
      return;
    }

    citaMedicas.forEach(citaMedica => {
      let fechaCita = citaMedica.fecha.split('-');
      let fecha = new Date(fechaCita[0], fechaCita[1] - 1, fechaCita[2]);
      if (fecha.getDate() === day && fecha.getMonth() === month && fecha.getFullYear() === year) {
        availableHours.forEach((hour, index) => {
          if (hour === citaMedica.horainicio) {
            if (hour === citaMedica.horainicio) {
              availableHours[index] = `${hour} - ${citaMedica.nombrePaciente} - ${citaMedica.id}`;
            }
          }
        });
      }
    });

    setAvailableHours(availableHours);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const selectionInitToday = (day, month, year) => {
    setSelectedDay(day);
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleButtonClick = (time, label, cita) => {
    if (cita) {
      handleCancelClick(cita);
    } else {
      console.log('cita para agendar');
    }
  };

  const handleCancelClick = (cita) => {
    setSelectedCita(cita);
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = () => {
    if (selectedCita) {
      let citaCancelada = citaMedicas.find(citaMedica => citaMedica.id == selectedCita);
      citaCancelada.habilitado = false;
      citaCancelada.motivoCancelacion = cancelReason;
      fetchCitaCancelada(citaCancelada).then(r => console.log('Cita cancelada:', r));
    }
    console.log('Cita cancelada:', selectedCita);
    setShowCancelDialog(false);
    setCancelReason('');
  };

  const fetchCitaCancelada = async (citaCancelada) => {
    let token = localStorage.getItem('jsonwebtoken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.put(`${config.baseURL}/appointment/update`, citaCancelada);
      if (response.status === 200) {
        console.log('Cita cancelada:', citaCancelada);
        showMessage('success', 'La historia clínica se guardo con éxito');
        //TODO DEBO RECARGAR LAS CITAS DEL DIA SELECCIONADO
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }

  }

  const handleCancelClose = () => {
    setShowCancelDialog(false);
    setCancelReason('');
  };

  useEffect(() => {
    selectionInitToday(new Date().getDate(), new Date().getMonth(), new Date().getFullYear());
  }, []);

  return (
    <div className="row g-3">
      <div className="col">
        <div className="row">
          <div className="col">
            <button className="button btn btn-sm" onClick={goToCurrentMonth}>Mes Actual</button>
          </div>
          <div className="col">
            <p className="fw-bolder">
              {monthNames[currentMonth]} {currentYear}
            </p>
          </div>
          <div className="col">
            <button className="button btn btn-sm" onClick={goToNextMonth}>Siguiente Mes</button>
          </div>
        </div>
        <div className="weekdays">
          {dayNames.map((dayName, index) => (
            <div className="weekday" key={index}>
              {dayName}
            </div>
          ))}
        </div>
        <div className="days">
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div className="day empty" key={`empty-${i}`}></div>
          ))}
          {days.map(day => {
            const isToday = day === today && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
            const isSelected = day === selectedDay && currentMonth === selectedMonth && currentYear === selectedYear;
            console.log('isSelected:', isSelected);
            return (
              <div
                className={`day ${isSelected  ? 'selected-day' : ''}`}
                key={day}
                onClick={() => toggleDaySelection(day, currentMonth, currentYear)}>
                {day}
              </div>
            );
          })}
        </div>
      </div>
      <div className="col">
        {selectedDay && (
          <div className="dialog">
            <div className="dialog-content">
              <h3>Horas del día {selectedDay}</h3>
              <table className="table">
                <tbody>
                {availableHours.length === 0 ? (
                  <tr>
                    <td>No hay horas disponibles</td>
                  </tr>
                ) : (
                  availableHours.map(hour => {
                    const [time, label, cita] = hour.split(' - ');
                    return (
                      <tr key={hour}>
                        <td>
                          <button className={`btn btn-sm ${label ? 'btn-outline-danger' : 'btn-outline-primary'}`} onClick={() => handleButtonClick(time, label, cita)}>
                            {time}
                          </button>
                          {label && <span className="label ms-2">{label}</span>}
                        </td>
                      </tr>
                    );
                  })
                )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Modal show={showCancelDialog} onHide={handleCancelClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancelar cita odontológica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Razón de la cancelación</label>
            <textarea
              className="form-control"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <button type="button" className="btn btn-primary" style={{ width: '90px' }} onClick={handleCancelClose}>
                Cancelar
              </button>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-secondary" style={{ width: '90px' }} onClick={handleCancelConfirm}>
                Aceptar
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendar;