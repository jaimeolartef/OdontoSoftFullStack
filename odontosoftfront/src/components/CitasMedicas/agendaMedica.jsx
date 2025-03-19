import React, {useEffect, useState} from 'react';
import Logo from "../../resource/LogoNegro.png";
import axios from "axios";
import config from "../../config";

const AgendaMedica = () => {

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedOdontologo, setSelectedOdontologo] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  let [totalCells, setTotalCells] = useState(0);
  let [offset, setOffset] = useState(0);
  let [dayLastMonth, setDayLastMonth] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [hours , setHours] = useState({
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
    fetchOdontologo();
    fetchLoadCalendar();
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
    let token = localStorage.getItem('jsonwebtoken');
    const usuario = localStorage.getItem('username');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${config.baseURL}/doctor/consultar/documento/` + usuario);
      if (response.status === 200) {
        setOdontologo(response.data);
        const odontoSelec = response.data.idMedico;
        const year = selectedYear;
        const monthFormated = (selectedMonth) < 10 ? '0' + (selectedMonth) : selectedMonth;

        const promises = Array.from({ length: dayLastMonth }, async (_, day) => {
          const dayFormated = (day + 1) < 10 ? '0' + (day + 1) : (day + 1);
          const date = `${year}-${monthFormated}-${dayFormated}`;
          const appointmentResponse = await axios.get(`${config.baseURL}/appointment/doctor?idOdontologo=${odontoSelec}&fechaDia=${date}`);
          if (appointmentResponse.status === 200) {
            const appointmentData = appointmentResponse.data;
            setDaysOfWeek(prevDays => prevDays.map(d =>
              d.dayInMonth === day + 1 ? { ...d, ...appointmentData } : d
            ));
          }
        });

        await Promise.all(promises);
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  // const fetchAgendaMedica = async () => {
  //   try {
  //     const promises = daysOfWeek.map(async (day) => {
  //       let monthFormated = (selectedMonth + 1) < 10 ? '0' + (selectedMonth + 1) : selectedMonth + 1;
  //
  //       let dayFormated = (day < 10 ? '0' + day : day);
  //       const response = await axios.get(`${config.baseURL}/appointment/doctor?idOdontologo=${odontologo.idMedico}&fechaDia=${selectedYear + "-" + monthFormated + "-" + dayFormated}`);
  //       if (response.status === 200) {
  //         return {
  //           ...day,
  //           horainicioam: response.data.horainicioam,
  //           horafinam: response.data.horafinam,
  //           horainiciopm: response.data.horainiciopm,
  //           horafinpm: response.data.horafinpm
  //         };
  //       }
  //       return day;
  //     });
  //     const updatedDaysOfWeek = await Promise.all(promises);
  //     setDaysOfWeek(updatedDaysOfWeek);
  //   } catch (error) {
  //     console.error('Error fetching agenda data:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const handleDayClick = (dayNumber) => {
    if (dayNumber > 0 && dayNumber <= dayLastMonth) {
      let day = daysOfWeek[dayNumber - 1];
        setHours({
          horainicioam: day.horainicioam,
          horafinam: day.horafinam,
          horainiciopm: day.horainiciopm,
          horafinpm: day.horafinpm
        });
        setSelectedDay(dayNumber);
        //setShowPopup(true);
      }
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
                                      <div className="red-block">Tarde: {daysOfWeek[dayNumber - 1]?.horainiciopm} - {daysOfWeek[dayNumber - 1]?.horafinpm}</div>
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
        </form>
      </div>
    </div>
  );
}

export default AgendaMedica;