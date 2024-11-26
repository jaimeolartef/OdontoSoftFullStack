import './Calendario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import showMessage from "../../util/UtilMessage";

const Calendar = ({availability}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date().getDate();
  const startHour = 8; // Hora de inicio
  const endHour = 16; // Hora de fin
  const [availableHours, setAvailableHours] = useState([]);
  const hours = Array.from({length: (endHour - startHour) * 2}, (_, i) => `${String(Math.floor(i / 2) + startHour).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`);

  const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({length: lastDayOfMonth}, (_, i) => i + 1);

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

    let date = new Date(year, month, day);
    let dayOfWeek = date.getDay();

    const availableHours = availability
      .filter(item => item.diaSemana === dayOfWeek)
      .map(item => {
        const start = parseInt(item.horaInicio.split(':')[0], 10);
        const end = parseInt(item.horaFin.split(':')[0], 10);
        return Array.from({ length: (end - start) * 2 }, (_, i) => `${String(start + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`);
      })
      .flat();

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
          {Array.from({length: firstDayOfMonth}, (_, i) => (
            <div className="day empty" key={`empty-${i}`}></div>
          ))}
          {days.map(day => {
            const isToday = day === today && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
            return (
              <div
                className={`day ${isToday ? 'today' : ''}`}
                key={day}
                onClick={() => toggleDaySelection(day, currentMonth, currentYear)}
              >
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
                  availableHours.map(hour => (
                    <tr key={hour}>
                      <td>
                        <button className="btn btn-outline-primary btn-sm">{hour}</button>
                      </td>
                    </tr>
                  ))
                )}
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