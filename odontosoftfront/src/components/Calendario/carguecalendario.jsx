import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import showMessage from "../../util/UtilMessage";
import config from "../../config";

const CargueCalendario = () => {
  const location = useLocation();
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
    {name: 'Lunes', value: 1, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
    {name: 'Martes', value: 2, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
    {name: 'Miércoles', value: 3, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
    {name: 'Jueves', value: 4, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
    {name: 'Viernes', value: 5, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
    {name: 'Sábado', value: 6, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
    {name: 'Domingo', value: 0, horainicioam: '', horafinam: '', horainiciopm: '', horafinpm: ''},
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

  const handleValidationYear = () => {
    if (!selectedOdontologo || selectedYear < new Date().getFullYear()) {
      showMessage('El año seleccionado no puede ser menor al actual');
      return true;
    }
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
          diasemana: day.value.toString(),
          horainicioam: day.horainicioam,
          horafinam: day.horafinam,
          horainiciopm: day.horainiciopm,
          horafinpm: day.horafinpm
        };
      })
    }];

    let tokenBearer = `Bearer ${token}`;
    console.log(tokenBearer);
    axios.defaults.headers.common['Authorization'] = tokenBearer;
    try {
      let body = JSON.stringify(disponibilidad, null, 2);
      console.log(body);

      axios.post(`${config.baseURL}/availability/save`, disponibilidad, {
        validateStatus: function (status) {
          return status;
        }
      })
        .then(response => {
          if (response.status === 200 || response.status === 201) {
            showMessage('info', 'La agenda se creó correctamente');
          } else {
            showMessage('error', 'Error al crear la agenda');
          }
        })
    } catch (error) {
      showMessage('error', 'Error al crear la agenda ' + error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card p-4" style={{width: '1500px'}}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{maxWidth: '140px'}}/>
          <h1>Cargue agenda</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <section className="mb-4">
            <h3>Cargue masivo</h3>
            <div className="form-group">
              <label htmlFor="file">Cargar archivo Excel o CSV</label>
              <input
                type="file"
                className="form-control"
                id="file"
                accept=".csv, .xlsx, .xls"
                onChange={handleFileChange}
              />
            </div>
          </section>
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
              <label>Seleccione el mes y año</label>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="month">Mes</label>
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
              <label>Seleccione los días de la semana</label>
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
                          min="06:00"
                          max="12:00"
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
                          min="06:00"
                          max="12:00"
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
                          min="13:00"
                          max="23:00"
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
                          min="13:00"
                          max="23:00"
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