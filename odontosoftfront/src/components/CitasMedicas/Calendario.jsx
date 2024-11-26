import './Calendario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';

const Calendar = ({availability}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date().getDate();

  const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({length: lastDayOfMonth}, (_, i) => i + 1);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

  const toggleDaySelection = (day) => {
    setSelectedDay(day);
  };


  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  useEffect(() => {
    toggleDaySelection(new Date().getDate());
  }, []);

  useEffect(() => {
    console.log('Availability:', availability.length);
    if (availability.length > 0) {
      console.log('Availability:', availability);
      availability.forEach(item => {
        console.log(`ID Disponibilidad: ${item.idDisponibilidad}`);
        console.log(`ID Medico: ${item.idMedico}`);
        console.log(`Día Semana: ${item.diaSemana}`);
        console.log(`Hora Inicio: ${item.horaInicio}`);
        console.log(`Hora Fin: ${item.horaFin}`);
        console.log(`ID Consultorio: ${item.idConsultorio}`);
      });
    }
  }, [availability]);

  const startHour = 8; // Hora de inicio
  const endHour = 16; // Hora de fin
  const hours = Array.from({length: (endHour - startHour) * 2}, (_, i) => `${String(Math.floor(i / 2) + startHour).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`);

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
          {Array.from({length: firstDayOfMonth}, (_, i) => (
            <div className="day empty" key={`empty-${i}`}></div>
          ))}
          {days.map(day => {
            const isToday = day === today && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
            return (
              <div
                className={`day ${isToday ? 'today' : ''}`}
                key={day}
                onClick={() => toggleDaySelection(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
      <div className="col">
        {(
          <div className="dialog">
            <div className="dialog-content">
              <h3>Horas del día {selectedDay}</h3>
              <table className="table">
                <tbody>
                {hours.map(hour => (
                  <tr key={hour}>
                    <td>{hour}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;