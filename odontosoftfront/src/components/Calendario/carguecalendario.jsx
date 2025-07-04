import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import showMessage from "../../util/UtilMessage";
import validationHours from "../../util/UtilValidation";
import { Modal, Button } from 'react-bootstrap';
import { apiGet, apiPost } from '../apiService';

const CargueCalendario = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [hours, setHours] = useState({
    horainicioam: '',
    horafinam: '',
    horainiciopm: '',
    horafinpm: ''
  });
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedOdontologo, setSelectedOdontologo] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [odontologo, setOdontologo] = useState([{ idMedico: 0, nombre: '' }]);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [totalCells, setTotalCells] = useState(0);
  const [dayLastMonth, setDayLastMonth] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchOdontologos();
    fetchLoadCalendar();
    // eslint-disable-next-line
  }, []);

  const fetchOdontologos = async () => {
    try {
      const data = await apiGet('/doctor/consultar');
      setOdontologo(data);
    } catch (error) {
      showMessage('error', error?.message || 'Error al obtener odontólogos');
    }
  };

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

  const handleValidationOdontologo = () => {
    if (!selectedOdontologo) {
      showMessage('warning', 'Por favor, seleccione un odontólogo');
      return false;
    }
    return true;
  };

  const handleOdontologoChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOdontologo(selectedValue);
    let odontoSelec = selectedValue.split(' - ');
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    const odontoSelected = odontologo.findIndex(o => o.idMedico == odontoSelec[0]);
    if (odontoSelected > -1) {
      try {
        const availab = await apiGet(`/availability/doctor/${odontoSelec[0]}`, {
          queryParams: { month, year }
        });
        if (availab.length !== 0) {
          setSelectedMonth(availab[0].mes);
          setSelectedYear(availab[0].anio);
          const updatedDaysOfWeek = daysOfWeek.map(day => {
            const availability = availab.find(item => item.dia === day.dayInMonth);
            if (availability) {
              return {
                ...day,
                horainicioam: availability.horaInicioam,
                horafinam: availability.horaFinam,
                horainiciopm: availability.horaIniciopm,
                horafinpm: availability.horaFinpm,
                iddisponibilidad: availability.idDisponibilidad
              };
            }
            return day;
          });
          setDaysOfWeek(updatedDaysOfWeek);
        }
      } catch (error) {
        showMessage('error', error?.message || 'Error al obtener disponibilidad');
      }
    }
  };

  const handleSearchChangeOdont = (event) => {
    setSelectedOdontologo(event.target.value);
  };

  const handleClearOdontologo = () => {
    setSelectedOdontologo('');
    setSelectedDay(null);
    fetchLoadCalendar();
  };

  const handleTimeChange = (dayValue, type, value) => {
    setHours(prevHours => ({
      ...prevHours,
      [type]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let listOdontologo = selectedOdontologo.split(' - ');
    let disponibilidad = [{
      idmedico: parseInt(listOdontologo[0]),
      mes: selectedMonth,
      anio: selectedYear,
      detalledisponibilidad: daysOfWeek.map(day => {
        if (day.horainicioam || day.horafinam || day.horainiciopm || day.horafinpm) {
          return {
            dia: day.dayInMonth,
            horainicioam: day.horainicioam,
            horafinam: day.horafinam,
            horainiciopm: day.horainiciopm,
            horafinpm: day.horafinpm,
            idDisponibilidad: day.iddisponibilidad
          };
        }
        return null;
      }).filter(day => day)
    }];

    if (!validateForm(disponibilidad)) return;

    try {
      await apiPost('/availability/save', disponibilidad);
      showMessage('info', 'La agenda se creó correctamente');
    } catch (error) {
      showMessage('error', error?.message || 'Error al crear la agenda');
    }
  };

  const validateForm = (disponibilidad) => {
    let validate = true;
    const monthDecember = 12;
    if (!selectedOdontologo) {
      showMessage('warning', 'Por favor, seleccione un odontólogo');
      validate = false;
    }
    let nextMonth = new Date().getMonth() + 2;
    let nowMonth = new Date().getMonth() + 1;
    if (selectedMonth < nowMonth && selectedYear === new Date().getFullYear()) {
      showMessage('warning', 'El mes seleccionado no puede ser menor al mes actual');
      validate = false;
    }
    if (selectedMonth > nextMonth && selectedYear === new Date().getFullYear()) {
      showMessage('warning', 'El mes seleccionado no puede ser mayor al mes actual');
      validate = false;
    }
    if (!selectedYear) {
      showMessage('warning', 'Por favor, seleccione un año');
      validate = false;
    }
    const currentYear = new Date().getFullYear();
    const isDecember = nowMonth === monthDecember;
    const maxAllowedYear = currentYear + (isDecember ? 2 : 0);
    if (selectedYear < currentYear || selectedYear > maxAllowedYear) {
      showMessage('warning', 'El año seleccionado no es valido');
      validate = false;
    }
    if (disponibilidad[0].detalledisponibilidad.length === 0) {
      showMessage('warning', 'Por favor, seleccione al menos un día');
      validate = false;
    }
    disponibilidad[0].detalledisponibilidad.forEach(day => {
      if (!validateTime(day)) validate = false;
    });
    return validate;
  };

  const validateTime = (day) => {
    if (!day.horainicioam && !day.horafinam && !day.horainiciopm && !day.horafinpm) {
      showMessage('warning', 'Debe ingresar al menos un rango de horario');
      return false;
    }
    return validationHours(day.horainicioam, day.horafinam, true) && validationHours(day.horainiciopm, day.horafinpm, false);
  };

  const handleDayClick = (dayNumber) => {
    if (dayNumber > 0 && dayNumber <= dayLastMonth) {
      let day = daysOfWeek[dayNumber - 1];
      if (handleValidationOdontologo()) {
        setHours({
          horainicioam: day.horainicioam,
          horafinam: day.horafinam,
          horainiciopm: day.horainiciopm,
          horafinpm: day.horafinpm
        });
        setSelectedDay(dayNumber);
        setShowPopup(true);
      }
    }
  };

  const handleAddTime = (hours, selectDays) => {
    if (validateTime(hours)) {
      const updatedDaysOfWeek = daysOfWeek.map(day => {
        if (day.dayInMonth === selectedDay) {
          return {
            ...day,
            horainicioam: hours.horainicioam,
            horafinam: hours.horafinam,
            horainiciopm: hours.horainiciopm,
            horafinpm: hours.horafinpm,
            idDisponibilidad: null
          };
        }
        return day;
      });
      setDaysOfWeek(updatedDaysOfWeek);
      setShowPopup(false);
      setHours({
        horainicioam: '',
        horafinam: '',
        horainiciopm: '',
        horafinpm: ''
      });
      setSelectedDay(null);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card p-4" style={{ width: '1500px' }}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{ maxWidth: '140px' }} />
          <h1>Cargue agenda</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="espacio"></div>
          <section className="mb-4">
            <h3>Cargue agenda odontólogo</h3>
            <div className="form-group">
              <label htmlFor="odontologo">Odontólogo</label>
              <div className="input-group">
                <input className="form-control"
                  list="datalistodontologo"
                  id="dataListOdonto"
                  placeholder="Buscar odontólogo..."
                  value={selectedOdontologo || ''}
                  onBlur={handleSearchChangeOdont}
                  onInput={handleOdontologoChange}
                  onChange={handleSearchChangeOdont}
                  autoComplete="off" />
                <button type="button" className="btn btn-outline-secondary" onClick={handleClearOdontologo}>
                  Limpiar
                </button>
              </div>
              <datalist id="datalistodontologo">
                {odontologo.map((o) => (
                  <option key={o.idMedico} value={`${o.idMedico} - ${o.nombre}`} />
                ))}
              </datalist>
            </div>
            <div className="espacio" />
            <div className="form-group">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <h3>{new Date(selectedYear, selectedMonth - 1).toLocaleString('es', { month: 'long' }).charAt(0).toUpperCase() + new Date(selectedYear, selectedMonth - 1).toLocaleString('es', { month: 'long' }).slice(1)} {selectedYear}</h3>
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
                                  <td key={dayIndex} className="table-cell"
                                      onClick={() => handleDayClick(dayNumber)}>
                                    {dayNumber > 0 && dayNumber <= dayLastMonth && (
                                      <div>
                                        {dayNumber}
                                        {daysOfWeek.length !== 0 && daysOfWeek[dayNumber - 1]?.horainicioam !== null && daysOfWeek[dayNumber - 1]?.horainicioam !== '' && (
                                          <div className="blue-block">Mañana: {daysOfWeek[dayNumber - 1]?.horainicioam} - {daysOfWeek[dayNumber - 1]?.horafinam}</div>
                                        )}
                                        <div className="espacio"></div>
                                        {daysOfWeek.length !== 0 && daysOfWeek[dayNumber - 1]?.horainiciopm !== null && daysOfWeek[dayNumber - 1]?.horainiciopm !== '' && (
                                          <div className="silver-block">Tarde: {daysOfWeek[dayNumber - 1]?.horainiciopm} - {daysOfWeek[dayNumber - 1]?.horafinpm}</div>
                                        )}
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
          <div className="espacio-2"></div>
          <div className="form-group d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/inicio')}>Cancelar</button>
          </div>
          <div className="espacio-2"></div>
          <Modal show={showPopup} onHide={() => setShowPopup(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Detalles del día {selectedDay}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="width-modal">
              <div className="mb-3">
                <label htmlFor={`start-time-am`}>Hora inicio mañana</label>
                <input
                  type="time"
                  id={`start-time-am`}
                  value={hours.horainicioam || ''}
                  className="form-control"
                  onChange={(e) => handleTimeChange(selectedDay, 'horainicioam', e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor={`end-time-am`}>Hora fin mañana</label>
                <input
                  type="time"
                  id={`end-time-am`}
                  value={hours.horafinam || ''}
                  className="form-control"
                  onChange={(e) => handleTimeChange(selectedDay, 'horafinam', e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor={`start-time-pm`}>Hora inicio tarde</label>
                <input
                  type="time"
                  id={`start-time-pm`}
                  value={hours.horainiciopm || ''}
                  className="form-control"
                  onChange={(e) => handleTimeChange(selectedDay, 'horainiciopm', e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor={`end-time-pm`}>Hora fin tarde</label>
                <input
                  type="time"
                  id={`end-time-pm`}
                  value={hours.horafinpm || ''}
                  className="form-control"
                  onChange={(e) => handleTimeChange(selectedDay, 'horafinpm', e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="primary" onClick={() => handleAddTime(hours, selectedDay)}>
                Agregar horario
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>
    </div>
  );
};

export default CargueCalendario;