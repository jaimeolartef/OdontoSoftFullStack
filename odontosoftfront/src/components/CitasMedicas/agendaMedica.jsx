import React, {useEffect, useState} from 'react';
import Logo from "../../resource/LogoNegro.png";
import axios from "axios";
import config from "../../config";
import { useNavigate } from 'react-router-dom';

const AgendaMedica = () => {

  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedOdontologo, setSelectedOdontologo] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  let [totalCells, setTotalCells] = useState(0);
  let [offset, setOffset] = useState(0);
  let [dayLastMonth, setDayLastMonth] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [citaDia, setCitaDia] = useState([]);
  const monthFormated = (new Date().getMonth() + 1 < 10) ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
  // Add this state variable near your other state declarations
  const [showFromToday, setShowFromToday] = useState(false);

  // Add a function to check if a date is today or in the future
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
    const newDaysOfWeek = Array.from({length: daysMonth}, (_, index) => ({
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
    let token = localStorage.getItem('jsonwebtoken');
    const usuario = localStorage.getItem('username');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${config.baseURL}/doctor/consultar/documento/` + usuario);
      if (response.status === 200) {
        setOdontologo(response.data);
        const odontoSelec = response.data.idMedico;
        const year = selectedYear;

        // Número de días en el mes seleccionado
        const daysInMonth = new Date(year, monthFormated, 0).getDate();
        console.log('dias en el mes', daysInMonth);
        console.log('Odonto seleccionado ' + odontoSelec);

        // Recorrer todos los días del mes
        let allCitas = [];
        for (let day = 1; day <= daysInMonth; day++) {
          const dayFormated = (day < 10) ? '0' + day : '' + day;
          const date = `${year}-${monthFormated}-${dayFormated}`;
          try {
            const appointmentResponse = await axios.get(`${config.baseURL}/appointment/doctor?idOdontologo=${odontoSelec}&fechaDia=${date}`);
            if (appointmentResponse.status === 200) {
              allCitas = [...allCitas, ...appointmentResponse.data];
            }
          } catch (error) {
            console.error(`Error fetching appointments for day ${date}:`, error);
          }
        }
        setCitaDia(allCitas);
        console.log('Citas del día', allCitas);
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const handleCitaClick = async (cita) => {
    let token = localStorage.getItem('jsonwebtoken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${config.baseURL}/historiaClinica/consultar/paciente/` + cita.idpaciente);
      if (response.status === 200) {
        let paciente = await handlePatientClick(cita.idpaciente);
        if (response.data.codigoValidacion === '404') {
          handleMedicalRecordClick(paciente);
        } else {
          handleMedicalRecordClick(paciente);
        }
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  }

  const handlePatientClick = async (idpaciente) => {
    let token = localStorage.getItem('jsonwebtoken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${config.baseURL}/pacientes/consultar/` + idpaciente);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  }

  const handleMedicalRecordClick = (paciente) => {
    navigate('/historiaPac', { state: { patient: paciente } });
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card p-4" style={{width: '1500px'}}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{maxWidth: '140px'}}/>
          <h1>Agenda Medica</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="espacio"></div>
          <section className="mb-4">
            <div className="form-group">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <h3>{new Date(selectedYear, selectedMonth - 1).toLocaleString('es', {month: 'long'}).charAt(0).toUpperCase() + new Date(selectedYear, selectedMonth - 1).toLocaleString('es', {month: 'long'}).slice(1)} {selectedYear}</h3>
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
                      Array.from({length: totalCells / 7}, (_, weekIndex) => (
                        <tr key={weekIndex}>
                          {Array.from({length: 7}, (_, dayIndex) => {
                            const dayNumber = weekIndex * 7 + dayIndex + 1 - offset;
                            return (
                              <td key={dayIndex} className="table-cell">
                                {dayNumber > 0 && dayNumber <= dayLastMonth && (
                                  <div>
                                    {dayNumber}
                                    {citaDia.map((cita, index) => {
                                      const dayFormatted = dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;
                                      const formattedDate = `${selectedYear}-${monthFormated}-${dayFormatted}`;

                                      // Check if we should show this appointment based on the checkbox selection
                                      if (cita.fecha === formattedDate &&
                                          (!showFromToday || isDateFromTodayOrLater(selectedYear, selectedMonth, dayNumber))) {
                                        return (
                                          <div
                                            key={index}
                                            className={index % 2 === 0 ? "blue-block" : "silver-block"}
                                            style={{ marginBottom: '4px', cursor: 'pointer' }}
                                            onClick={() => handleCitaClick(cita)}
                                          >
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
        </form>
      </div>
    </div>
  );
}

export default AgendaMedica;