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
  const {redireccionadoModificar} = location.state || {};
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    documento: '',
    nombre: '',
    file: null
  });

  const [selectedOdontologo, setSelectedOdontologo] = useState('');
  const [odontologo, setOdontologo] = useState([
    {
      idMedico: 0,
      nombre: ''
    }
  ]);

  const daysOfWeek = [
    { name: 'Lunes', value: 1, startam : '', endam : '', startpm : '', endpm : '' },
    { name: 'Martes', value: 2, startam : '', endam : '', startpm : '', endpm : '' },
    { name: 'Miércoles', value: 3, startam : '', endam : '', startpm : '', endpm : ''  },
    { name: 'Jueves', value: 4, startam : '', endam : '', startpm : '', endpm : ''  },
    { name: 'Viernes', value: 5, startam : '', endam : '', startpm : '', endpm : ''  },
    { name: 'Sábado', value: 6, startam : '', endam : '', startpm : '', endpm : ''  },
    { name: 'Domingo', value: 0, startam : '', endam : '', startpm : '', endpm : ''  },
  ]

  const [selectedDays, setSelectedDays] = useState([]);

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
    setSelectedDays(prevSelectedDays =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter(d => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleTimeChange = (day, type, value) => {
    setTimes(prevTimes => ({
      ...prevTimes,
      [day]: {
        ...prevTimes[day],
        [type]: value
      }
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', formData.file);

    try {
      const response = await axios.post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      showMessage('File uploaded successfully');
    } catch (error) {
      showMessage('Error uploading file');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card p-4" style={{width: '1500px'}}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{maxWidth: '140px'}}/>
          <h1>Cargue Calendario Odontólogos</h1>
        </header>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
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
          <div className="form-group">
            <h1 className="text-2xl font-bold mb-4">Select Days of the Week</h1>
            <div className="space-y-4">
              {daysOfWeek.map(day => (
                <div key={day.value} className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    id={`day-${day.value}`}
                    checked={selectedDays.includes(day.value)}
                    onChange={() => handleCheckboxChange(day.value)}
                  />
                  <label htmlFor={`day-${day.value}`} className="text-sm font-medium">
                    {day.name} ({day.value})
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="time"
                      id={`start-time-${day.value}`}
                      value={times[day.value].startam}
                      onChange={(e) => handleTimeChange(day.value, 'start', e.target.value)}
                      className="w-24"
                      disabled={!selectedDays.includes(day.value)}
                    />
                    <input
                      type="time"
                      id={`end-time-${day.value}`}
                      value={times[day.value].endam}
                      onChange={(e) => handleTimeChange(day.value, 'end', e.target.value)}
                      className="w-24"
                      disabled={!selectedDays.includes(day.value)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="time"
                      id={`start-time-${day.value}`}
                      value={times[day.value].startpm}
                      onChange={(e) => handleTimeChange(day.value, 'start', e.target.value)}
                      className="w-24"
                      disabled={!selectedDays.includes(day.value)}
                    />
                    <input
                      type="time"
                      id={`end-time-${day.value}`}
                      value={times[day.value].endpm}
                      onChange={(e) => handleTimeChange(day.value, 'end', e.target.value)}
                      className="w-24"
                      disabled={!selectedDays.includes(day.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Selected Days and Times:</h2>
              <ul className="text-gray-700">
                {selectedDays.map(day => (
                  <li key={day}>
                    {daysOfWeek.find(d => d.value === day)?.name} ({day}):
                    Start: {times[day].start || 'Not set'} -
                    End: {times[day].end || 'Not set'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload Excel or CSV file</label>
            <input
              type="file"
              className="form-control"
              id="file"
              accept=".csv, .xlsx, .xls"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="espacio"></div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/inicio')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CargueCalendario;