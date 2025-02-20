import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import showMessage from "../../util/UtilMessage";
import config from "../../config";

const CargueCalendario = () => {
  const token = localStorage.getItem('jsonwebtoken');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    documento: '',
    nombre: '',
    file: null
  });

  const [selectedOdontologo, setSelectedOdontologo] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [odontologo, setOdontologo] = useState([
    {
      idMedico: 0,
      nombre: ''
    }
  ]);
  const [daysOfWeek, setDaysOfWeek] = useState([
    {id:0, name: 'Lunes', value: 1, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
    {id:0, name: 'Martes', value: 2, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
    {id:0, name: 'Miércoles', value: 3, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
    {id:0, name: 'Jueves', value: 4, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
    {id:0, name: 'Viernes', value: 5, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
    {id:0, name: 'Sábado', value: 6, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
    {id:0, name: 'Domingo', value: 0, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
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

  const handleCheckboxChange = (day) => {
    console.log(selectedOdontologo);
    console.log(selectedMonth);
    console.log(selectedYear);

    if (!handleValidationOdontologo()) {
      return;
    }

    setSelectedDays(prevSelectedDays =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter(d => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleValidationOdontologo = () => {
    if (!selectedOdontologo) {
      showMessage('warning', 'Por favor, seleccione un odontólogo');
      return false;
    }
    return true;
  }

  const handleOdontologoChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOdontologo(selectedValue);
    let odontoSelec = selectedValue.split(' - ');
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    const odontoSelected = odontologo.findIndex(odontologo => odontologo.idMedico == odontoSelec[0]);
    if (odontoSelected > -1) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const response = await axios.get(`${config.baseURL}/availability/doctor/${odontoSelec[0]}?month=${month}&year=${year}`);
        if (response.status === 200) {
          let availab = response.data;
          console.log(availab);
          setSelectedMonth(availab[0].mes);
          setSelectedYear(availab[0].anio);

          const updatedDaysOfWeek = daysOfWeek.map(day => {
            const availability = availab.find(a => a.diaSemana === day.value);
            if (availability) {
              selectedDays.push(day.value);
              return {
                ...day,
                id: availability.idDisponibilidad,
                horainicioam: availability.horaInicioam,
                horafinam: availability.horaFinam,
                horainiciopm: availability.horaIniciopm,
                horafinpm: availability.horaFinpm
              };
            }
            return day;
          });

          setDaysOfWeek(updatedDaysOfWeek);
          console.log('Console log ' + selectedDays.length);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    }
  };

  const handleSearchChangeOdont = (event) => {
    setSelectedOdontologo(event.target.value);
  };

  const handleClearOdontologo = () => {
    setSelectedOdontologo('');
    setSelectedDays([]);
    setDaysOfWeek([
      {id:0, name: 'Lunes', value: 1, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
      {id:0, name: 'Martes', value: 2, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
      {id:0, name: 'Miércoles', value: 3, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
      {id:0, name: 'Jueves', value: 4, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
      {id:0, name: 'Viernes', value: 5, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
      {id:0, name: 'Sábado', value: 6, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
      {id:0, name: 'Domingo', value: 0, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
    ]);
  };

  const handleFileChange = (e) => {
    setFormData({...formData, file: e.target.files[0]});
  };

  const handleTimeChange = (dayValue, type, value) => {
    setDaysOfWeek(prevDaysOfWeek => {
      return prevDaysOfWeek.map(day => {
        if (day.value === dayValue) {
          return {...day, [type]: value};
        }
        return day;
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let listOdontologo = selectedOdontologo.split(' - ');
    let disponibilidad = [{
      idmedico: parseInt(listOdontologo[0]),
      mes: selectedMonth,
      anio: selectedYear,
      detalledisponibilidad: selectedDays.map(dayValue => {
        const day = daysOfWeek.find(d => d.value === dayValue);
        return {
          id: day.id,
          diasemana: day.value.toString(),
          horainicioam: day.horainicioam,
          horafinam: day.horafinam,
          horainiciopm: day.horainiciopm,
          horafinpm: day.horafinpm
        };
      })
    }];

    if (!valdateForm()) {
      return;
    }

    let tokenBearer = `Bearer ${token}`;
    console.log(tokenBearer);
    axios.defaults.headers.common['Authorization'] = tokenBearer;
    try {

      const response = await axios.post(`${config.baseURL}/availability/save`, disponibilidad, {
        validateStatus: function (status) {
          return status;
        }
      });
      if (response.status === 200 || response.status === 201) {
        showMessage('info', 'La agenda se creó correctamente');
      } else {
        showMessage('error', 'Error al crear la agenda');
      }
    } catch (error) {
      showMessage('error', 'Error al crear la agenda ' + error);
    }
  };

  const valdateForm = () => {
    let validate = true;
    const monthDecember = 12;

    if (!selectedOdontologo) {
      showMessage('warning', 'Por favor, seleccione un odontólogo');
      validate = false;
    }

    let nextMonth = new Date().getMonth() + 2;
    let nowMonth = new Date().getMonth() + 1;

    // se valida que el mes seleccionado no sea menor al mes actual
    if (selectedMonth < nowMonth && selectedYear === new Date().getFullYear()) {
      showMessage('warning', 'El mes seleccionado no puede ser menor al mes actual');
      validate = false;
    }

    // se valida que el mes seleccionado no sea mayor al mes actual y al siguiente
    if (selectedMonth > nextMonth && selectedYear === new Date().getFullYear()) {
      showMessage('warning', 'El mes seleccionado no puede ser mayor al mes actual');
      validate = false;
    }

    // debe validar el año seleccionado
    if (selectedYear === null || selectedYear == '') {
      showMessage('warning', 'Por favor, seleccione un año');
      validate = false;
    }

    // Se introducen variables descriptivas que unifican la lógica y evitan código repetido
    const currentYear = new Date().getFullYear();
    const isDecember = nowMonth === monthDecember;
    const maxAllowedYear = currentYear + (isDecember ? 2 : 0);

    if (selectedYear < currentYear || selectedYear > maxAllowedYear) {
      showMessage('warning', 'El año seleccionado no es valido');
      validate = false;
    }

    if (selectedDays.length === 0) {
      showMessage('warning', 'Por favor, seleccione al menos un día');
      validate = false;
    }

    // Uso en la validación del formulario
    daysOfWeek.forEach(day => {
      if (selectedDays.includes(day.value)) {
        if (!validateTime(day)) {
          validate = false;
        }
      }
    });

    return validate;
  }

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const validateTime = (day) => {
    const noon = convertTimeToMinutes('12:00');
    const midnight = convertTimeToMinutes('00:00');
    const endOfDay = convertTimeToMinutes('23:59');

    if (day.horainicioam && day.horafinam) {
      const startAM = convertTimeToMinutes(day.horainicioam);
      const endAM = convertTimeToMinutes(day.horafinam);

      if (startAM >= noon || endAM > noon) {
        showMessage('warning', 'La hora de la mañana se comprende entre las 00:00 y 12:00');
        return false;
      }

      if (startAM > endAM) {
        showMessage('warning', 'La hora de inicio de la mañana no puede ser mayor a la hora de fin de la mañana');
        return false;
      }
    }

    if (day.horainiciopm && day.horafinpm) {
      const startPM = convertTimeToMinutes(day.horainiciopm);
      const endPM = convertTimeToMinutes(day.horafinpm);

      if (startPM <= noon || endPM <= noon || startPM > endOfDay || endPM > endOfDay) {
        showMessage('warning', 'La hora de la tarde se comprende entre las 12:01 y 23:59');
        return false;
      }

      if (startPM > endPM) {
        showMessage('warning', 'La hora de inicio de la tarde no puede ser mayor a la hora de fin de la tarde');
        return false;
      }
    }

    return true;
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card p-4" style={{width: '1500px'}}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{maxWidth: '140px'}}/>
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
            <div className="form-group">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="month">Mes</label>
                  //TODO: INHABILIDAR EL CAMPO MES Y AÑO
                  <select
                    id="month"
                    className="form-control"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {[...Array(12).keys()].map(month => (
                      <option key={month + 1} value={month + 1}>
                        {new Date(0, month).toLocaleString('es', {month: 'long'})}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="year">Año</label>
                  <input
                    type="number"
                    id="year"
                    className="form-control"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    min={new Date().getFullYear()}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="espacio"/>
              <div className="row">
                {daysOfWeek.map(day => (
                  <div key={day.value} className="col-md-12 mb-3">
                    <div className="row">
                      <div className="form-check">
                        <input
                          type="checkbox" className="btn-check"
                          id={`day-${day.value}`}
                          checked={selectedDays.includes(day.value)}
                          onChange={() => handleCheckboxChange(day.value)}
                        />
                        <label className="btn btn-outline-primary" htmlFor={`day-${day.value}`}>{day.name}</label>
                      </div>

                      <div className="col-md-3">
                        <label htmlFor={`start-time-am-${day.value}`}>Hora inicio mañana</label>
                        <input
                          type="time"
                          id={`start-time-am-${day.value}`}
                          value={daysOfWeek.find(d => d.value === day.value)?.horainicioam || ''}
                          className="form-control"
                          disabled={!selectedDays.includes(day.value)}
                          onChange={(e) => handleTimeChange(day.value, 'horainicioam', e.target.value)}
                        />
                      </div>

                      <div className="col-md-3">
                        <label htmlFor={`end-time-am-${day.value}`}>Hora fin mañana</label>
                        <input
                          type="time"
                          id={`end-time-am-${day.value}`}
                          value={daysOfWeek.find(d => d.value === day.value)?.horafinam || ''}
                          className="form-control"
                          disabled={!selectedDays.includes(day.value)}
                          onChange={(e) => handleTimeChange(day.value, 'horafinam', e.target.value)}
                        />
                      </div>

                      <div className="col-md-3">
                        <label htmlFor={`start-time-pm-${day.value}`}>Hora inicio tarde</label>
                        <input
                          type="time"
                          id={`start-time-pm-${day.value}`}
                          value={daysOfWeek.find(d => d.value === day.value)?.horainiciopm || ''}
                          className="form-control"
                          disabled={!selectedDays.includes(day.value)}
                          onChange={(e) => handleTimeChange(day.value, 'horainiciopm', e.target.value)}
                        />
                      </div>

                      <div className="col-md-3">
                        <label htmlFor={`end-time-pm-${day.value}`}>Hora fin tarde</label>
                        <input
                          type="time"
                          id={`end-time-pm-${day.value}`}
                          value={daysOfWeek.find(d => d.value === day.value)?.horafinpm || ''}
                          className="form-control"
                          disabled={!selectedDays.includes(day.value)}
                          onChange={(e) => handleTimeChange(day.value, 'horafinpm', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className="espacio-2"></div>
          <div className="form-group d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/inicio')}>Cancelar</button>
          </div>
          <div className="espacio-2"></div>
        </form>
      </div>
    </div>
  );
}

export default CargueCalendario;