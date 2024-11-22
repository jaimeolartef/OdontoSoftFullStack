import './Calendario.css';
import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date().getDate();

  const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

  const toggleDaySelection = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="calendar">
      <div className="header">
        <button className="button" onClick={goToCurrentMonth}>Mes Actual</button>
        <div className="month">{monthNames[currentMonth]} {currentYear}</div>
        <button className="button" onClick={goToNextMonth}>Siguiente Mes</button>
      </div>
      <div className="weekdays">
        {dayNames.map((dayName, index) => (
          <div className="weekday" key={index}>
            {dayName}
          </div>
        ))}
      </div>
      <div className="days">
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div className="day empty" key={`empty-${i}`}></div>
        ))}
        {days.map(day => {
          const isSelected = selectedDays.includes(day);
          const isToday = day === today && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
          return (
            <div
              className={`day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
              key={day}
              onClick={() => toggleDaySelection(day)}
            >
              <div>{day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;