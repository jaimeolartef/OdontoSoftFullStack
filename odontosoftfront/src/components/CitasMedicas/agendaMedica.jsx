import React, {useEffect, useState} from 'react';
import Logo from "../../resource/LogoNegro.png";
import {useNavigate} from 'react-router-dom';
import {createEvents} from 'ics';
import {saveAs} from 'file-saver';
import showMessage from "../../util/UtilMessage";
import {apiGet} from '../apiService';

const AgendaMedica = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  let [totalCells, setTotalCells] = useState(0);
  let [offset, setOffset] = useState(0);
  let [dayLastMonth, setDayLastMonth] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [citaDia, setCitaDia] = useState([]);
  const monthFormated = (new Date().getMonth() + 1 < 10) ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
  const [showFromToday, setShowFromToday] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null);

  const isDateFromTodayOrLater = (year, month, day) => {
    const today = new Date();
    const checkDate = new Date(year, month - 1, day);
    return checkDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const [hours, setHours] = useState({
    horainicioam: '',
    horafinam: '',
    horainiciopm: '',
    horafinpm: ''
  });
  const [odontologo, setOdontologo] = useState([
    {
      idMedico: 0,
      nombre: ''
    }
  ]);

  useEffect(() => {
    fetchLoadCalendar();
    fetchOdontologo();
  }, []);

  const fetchLoadCalendar = () => {
    const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const daysMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const newDaysOfWeek = Array.from({ length: daysMonth }, (_, index) => ({
      id: index + 1,
      dayInMonth: index + 1,
      horainicioam: '',
      horafinam: '',
      horainiciopm: '',
      horafinpm: ''
    }));
    setDayLastMonth(daysMonth);
    setDaysOfWeek(newDaysOfWeek);
    setTotalCells(Math.ceil((daysMonth + offset) / 7) * 7);
    setOffset(offset);
  };

  const fetchOdontologo = async () => {
    const usuario = sessionStorage.getItem('username');
    try {
      const response = await apiGet(`/doctor/consultar/documento/${usuario}`);
      setOdontologo(response);
      const odontoSelec = response.idMedico;
      const year = selectedYear;
      const daysInMonth = new Date(year, monthFormated, 0).getDate();
      let allCitas = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const dayFormated = (day < 10) ? '0' + day : '' + day;
        const date = `${year}-${monthFormated}-${dayFormated}`;
        try {
          const appointmentResponse = await apiGet(`/appointment/doctor`, {
            queryParams: { idOdontologo: odontoSelec, fechaDia: date }
          });
          allCitas = [...allCitas, ...appointmentResponse];
        } catch (error) {
          showMessage('error', error?.message || `Error al obtener citas para el día ${date}`);
        }
      }
      setCitaDia(allCitas);
    } catch (error) {
      showMessage('error', error?.message || 'Error al obtener datos del odontólogo');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleCitaClick = async (cita) => {
    try {
      let paciente = await handlePatientClick(cita.idpaciente);
      handleMedicalRecordClick(paciente);
    } catch (error) {
      showMessage('error', error?.message || 'Error al consultar historia clínica');
    }
  };

  const handlePatientClick = async (idpaciente) => {
    try {
      return await apiGet(`/pacientes/consultar/${idpaciente}`);
    } catch (error) {
      showMessage('error', error?.message || 'Error al consultar paciente');
    }
  };

  const handleMedicalRecordClick = (paciente) => {
    navigate('/historialCita', { state: { patient: paciente, readOnly: false } });
  };

  const handleHistoriaClinicaClick = async (cita) => {
    try {
      const paciente = await handlePatientClick(cita.idpaciente);
      navigate('/historiaClinica', { state: { patient: paciente} });
    } catch (error) {
      showMessage('error', error?.message || 'Error al consultar paciente');
    }
  };

  const handleCitaBlockClick = (cita) => {
    setSelectedCita(cita);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedCita(null);
  };

  const handleIniciarCita = () => {
    handleCitaClick(selectedCita);
    handlePopupClose();
  };

  const handleHistoriaClinica = () => {
    handleHistoriaClinicaClick(selectedCita);
    handlePopupClose();
  };

  const exportCalendar = () => {
    if (citaDia.length === 0) {
      alert("No hay citas para exportar");
      return;
    }
    const events = citaDia.map(cita => {
      const [year, month, day] = cita.fecha.split('-').map(Number);
      const [startHour, startMinute] = cita.horainicio.split(':').map(Number);
      const [endHour, endMinute] = cita.horafin.split(':').map(Number);
      return {
        title: `Cita: ${cita.nombrePaciente}`,
        description: `Cita médica con paciente ${cita.nombrePaciente}`,
        start: [year, month, day, startHour, startMinute],
        end: [year, month, day, endHour, endMinute],
        location: 'Consultorio dental',
        organizer: { name: odontologo.nombre, email: 'contacto@odontosoft.com' }
      };
    });
    createEvents(events, (error, value) => {
      if (error) {
        console.error("Error al generar el calendario:", error);
        alert("Error al generar el calendario");
        return;
      }
      const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
      saveAs(blob, `agenda_medica_${selectedYear}_${selectedMonth}.ics`);
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card p-4" style={{ width: '1500px' }}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{ maxWidth: '140px' }} />
          <h1>Agenda Medica</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="espacio"></div>
          <section className="mb-4">
            <div className="form-group">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <h3>{new Date(selectedYear, selectedMonth - 1).toLocaleString('es', { month: 'long' }).charAt(0).toUpperCase() + new Date(selectedYear, selectedMonth - 1).toLocaleString('es', { month: 'long' }).slice(1)} {selectedYear}</h3>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="showFromToday"
                      checked={showFromToday}
                      onChange={(e) => setShowFromToday(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="showFromToday">
                      Mostrar citas a partir del día actual
                    </label>
                  </div>
                  <table className="table">
                    <thead>
                    <tr>
                      {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => (
                        <th key={index}>{day}</th>
                      ))}
                    </tr>
                    </thead>
                    <tbody>
                    {
                      Array.from({ length: totalCells / 7 }, (_, weekIndex) => (
                        <tr key={weekIndex}>
                          {Array.from({ length: 7 }, (_, dayIndex) => {
                            const dayNumber = weekIndex * 7 + dayIndex + 1 - offset;
                            return (
                              <td key={dayIndex} className="table-cell">
                                {dayNumber > 0 && dayNumber <= dayLastMonth && (
                                  <div>
                                    {dayNumber}
                                    {citaDia.map((cita, index) => {
                                      const dayFormatted = dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;
                                      const formattedDate = `${selectedYear}-${monthFormated}-${dayFormatted}`;
                                      if (cita.fecha === formattedDate &&
                                        (!showFromToday || isDateFromTodayOrLater(selectedYear, selectedMonth, dayNumber))) {
                                        return (
                                          <div
                                            key={index}
                                            className={index % 2 === 0 ? "blue-block" : "silver-block"}
                                            style={{ marginBottom: '4px', cursor: 'pointer' }}
                                            onClick={() => handleCitaBlockClick(cita)}>
                                            {cita.horainicio} - {cita.horafin}: {cita.nombrePaciente}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
          <div className="col-md-12 mb-3">
            <div className="d-flex justify-content-between mb-3">
              <button
                className="btn btn-primary"
                onClick={exportCalendar}
                title="Exportar calendario a formato .ics (compatible con Google Calendar y iOS)">
                Exportar Calendario
              </button>
            </div>
          </div>
        </form>
      </div>

      {showPopup && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Opciones de Cita</h5>
                <button type="button" className="btn-close" onClick={handlePopupClose}></button>
              </div>
              <div className="modal-body">
                <p><strong>Paciente:</strong> {selectedCita?.nombrePaciente}</p>
                <p><strong>Horario:</strong> {selectedCita?.horainicio} - {selectedCita?.horafin}</p>
                <p><strong>Fecha:</strong> {selectedCita?.fecha}</p>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" onClick={handleIniciarCita}>
                    Iniciar Cita
                  </button>
                  <button className="btn btn-secondary" onClick={handleHistoriaClinica}>
                    Historia Clínica
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaMedica;