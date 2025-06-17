import './Calendario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import showMessage from "../../util/UtilMessage";
import { Modal } from 'react-bootstrap';
import { apiGet, apiPost, apiPut } from '../apiService';

const Calendar = ({ availability, patient, Rol }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const [availableHours, setAvailableHours] = useState([]);
  const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedCita, setSelectedCita] = useState(null);
  const [citasMedicas, setCitasMedicas] = useState([]);
  const duracionCita = sessionStorage.getItem('DURACION_CITA');

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

  const toggleDaySelection = async (day, month, year) => {
    if (availability.length === 0) {
      showMessage('warning', 'Debe seleccionar un odontólogo para ver su disponibilidad');
      return;
    }

    if (availability[0].mes !== month || availability[0].anio !== year) {
      showMessage('warning', 'La disponibilidad del odontólogo no corresponde al mes seleccionado');
      return;
    }

    if (day < new Date().getDate() && month <= new Date().getMonth() && year <= new Date().getFullYear()) {
      showMessage('warning', 'Debe seleccionar un día igual o posterior al día actual');
      return;
    }

    setSelectedDay(day);
    setSelectedMonth(month);
    setSelectedYear(year);

    let hourFinal = '';
    const availableHours = availability
      .filter(item => item.dia === day)
      .map(item => {
        let startAm = 0;
        let endAm = 0;
        let startPm = 0;
        let endPm = 0;

        if (item.horaInicioam !== null && item.horaInicioam.length > 0) {
          startAm = parseHour(item.horaInicioam);
        }
        if (item.horaFinam !== null && item.horaFinam.length > 0) {
          endAm = parseHour(item.horaFinam);
        }
        if (item.horaIniciopm !== null && item.horaIniciopm.length > 0) {
          startPm = parseHour(item.horaIniciopm);
        }
        if (item.horaFinpm !== null && item.horaFinpm.length > 0) {
          endPm = parseHour(item.horaFinpm);
        }

        return [
          ...Array.from({ length: (endAm - startAm) * 2 }, (_, i) => `${String(startAm + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`),
          ...Array.from({ length: (endPm - startPm) * 2 }, (_, i) => `${String(startPm + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`)
        ];
      })
      .flat();

    if (new Date().getHours() > hourFinal && day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
      showMessage('warning', 'El día de hoy ya no puede agendar citas');
      setAvailableHours([]);
      return;
    }

    let listCita = await fetchCitas(day, month, year);

    listCita.forEach(citaMedica => {
      let fechaCita = citaMedica.fecha.split('-');
      let fecha = new Date(fechaCita[0], fechaCita[1], fechaCita[2]);
      if (fecha.getDate() === day && fecha.getMonth() === month && fecha.getFullYear() === year) {
        availableHours.forEach((hour, index) => {
          if (hour === citaMedica.horainicio) {
            availableHours[index] = `${hour} - ${citaMedica.nombrePaciente} - ${citaMedica.id} - ${citaMedica.idpaciente}`;
          }
        });
      }
    });

    setAvailableHours(availableHours);
  };

  function parseHour(timeString) {
    return parseInt(timeString.split(':')[0], 10);
  }

  const fetchCitas = async (day, month, year) => {
    let odontoSelec = odontologoSelect();
    let monthFormated = (month) < 10 ? '0' + (month) : month;
    let dayFormated = (day < 10 ? '0' + day : day);
    try {
      const response = await apiGet(`/appointment/doctor`, {
        queryParams: {
          idOdontologo: odontoSelec,
          fechaDia: `${year}-${monthFormated}-${dayFormated}`
        }
      });
      setCitasMedicas(response);
      return response;
    } catch (error) {
      console.error('Error fetching citas:', error);
      return [];
    }
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setAvailableHours([]);
  };

  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
    setAvailableHours([]);
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
      handleAgendarCita(time);
    }
  };

  const handleCancelClick = (cita) => {
    setSelectedCita(cita);
    setShowCancelDialog(true);
  };

  const handleAgendarCita = async (time) => {
    let odontoSelec = odontologoSelect();
    let idpaciente = pacienteSelect();
    let hourFinal = addMinutesToTime(time, duracionCita);

    if (odontoSelec != null && odontoSelec.length <= 0) {
      showMessage('warning', 'Debe seleccionar un odontólogo para agendar la cita');
      return;
    }

    if (idpaciente != null && idpaciente.length <= 0) {
      showMessage('warning', 'Debe seleccionar un paciente para agendar la cita');
      return;
    }

    let day = selectedDay < 10 ? '0' + selectedDay : selectedDay;
    let month = selectedMonth < 10 ? '0' + (selectedMonth) : selectedMonth;
    let fechaFormateada = `${selectedYear}-${month}-${day}`;
    let citaMedica = {
      idMedico: odontoSelec[0],
      id: null,
      idpaciente: idpaciente,
      fecha: fechaFormateada,
      fechaNotificacion: calculateDateNotif(fechaFormateada),
      horainicio: time,
      horafin: hourFinal,
      habilitado: true
    };

    try {
      await apiPost(`/appointment/create`, citaMedica);
      showMessage('success', 'La cita fue agendada con éxito');
      fetchCitas(selectedDay, selectedMonth, selectedYear);
      toggleDaySelection(selectedDay, selectedMonth, selectedYear);
    } catch (error) {
      console.error('Error agendando cita:', error);
    }
  }

  function addMinutesToTime(time, minutesToAdd) {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    const newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() + parseInt(minutesToAdd));
    const newHours = String(newDate.getHours()).padStart(2, '0');
    const newMinutes = String(newDate.getMinutes()).padStart(2, '0');
    return `${newHours}:${newMinutes}`;
  }

  const calculateDateNotif = (fecha) => {
    let fechaNotif = new Date(fecha);
    fechaNotif.setDate(fechaNotif.getDate() - 1);
    return fechaNotif.toISOString();
  }

  const handleCancelConfirm = () => {
    if (!cancelReason.trim() || /^[^a-zA-Z0-9]+$/.test(cancelReason)) {
      showMessage('warning', 'Debe ingresar un motivo de cancelación válido');
      setShowCancelDialog(true);
      return;
    }

    if (selectedCita) {
      let citaCancelada = citasMedicas.find(citaMedica => citaMedica.id == selectedCita);
      citaCancelada.habilitado = false;
      citaCancelada.motivoCancelacion = cancelReason;
      fetchCitaCancelada(citaCancelada).then(r => {});
    }
    setShowCancelDialog(false);
    setCancelReason('');
  };

  const fetchCitaCancelada = async (citaCancelada) => {
    try {
      await apiPut(`/appointment/update`, citaCancelada);
      showMessage('success', 'La cita se canceló con éxito');
      fetchCitas(selectedDay, selectedMonth, selectedYear);
      toggleDaySelection(selectedDay, selectedMonth, selectedYear);
    } catch (error) {
      console.error('Error cancelando cita:', error);
    }
  }

  const odontologoSelect = () => {
    const odontologoInput = document.getElementById('dataListOdonto');
    const odontologoValue = odontologoInput.value;

    if (!odontologoValue.length > 0) {
      showMessage('warning', 'Debe seleccionar un odontólogo');
      return null;
    }

    return odontologoValue.split('-')[0];
  }

  const pacienteSelect = () => {
    return patient.split(' - ')[0];
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
            const isSelected = day === selectedDay && currentMonth === selectedMonth && currentYear === selectedYear;
            return (
              <div
                className={`day ${isSelected  ? 'selected-day' : ''}`}
                key={day}
                onClick={() => toggleDaySelection(day, currentMonth + 1, currentYear)}>
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
                  availableHours.map((hour, idx) => {
                    const partes = hour.split(' - ');
                    const esCita = partes.length > 1;
                    return (
                      <tr key={idx}>
                        <td>
                          <button
                            className={`btn ${esCita ? 'btn-outline-danger' : 'btn-outline-primary'} btn-sm`}
                            onClick={() => handleButtonClick(partes[0], hour, esCita ? partes[2] : null)}
                          >
                            {esCita ? `Cancelar: ${partes[0]} (${partes[1]})` : `Agendar: ${partes[0]}`}
                          </button>
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
              onChange={(e) => setCancelReason(e.target.value)}
              required/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <button type="button" className="btn btn-secondary" style={{ width: '90px' }} onClick={handleCancelClose}>
                Cancelar
              </button>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-primary" style={{ width: '90px' }} onClick={handleCancelConfirm}>
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