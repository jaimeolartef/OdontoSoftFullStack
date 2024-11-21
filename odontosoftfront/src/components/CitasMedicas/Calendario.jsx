import './Calendario.css';
import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate] = useState(new Date());
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Obtener el último día del mes actual
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Crear array con los días del mes actual
  const days = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="calendar">
      <div className="header">
        <div className="month">{monthNames[currentMonth]} {currentYear}</div>
      </div>
      <div className="content-type">
      </div>
      <div className="days">
        {days.map(day => (
          <div className="day" key={day}>
            <div>{day}</div>
            {day === 1 && <div className="event">Redes Sociales</div>}
            {day === 1 && <div className="event">Podcast</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
