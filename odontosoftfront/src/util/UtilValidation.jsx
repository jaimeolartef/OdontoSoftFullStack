import showMessage from "./UtilMessage";

const validateHours = (hourStart, hourEnd, tomorrow, line) => {
  const noon = convertTimeToMinutes('12:00');
  const midnight = convertTimeToMinutes('00:00');
  const endOfDay = convertTimeToMinutes('23:59');


  if ((hourStart !== '' && hourStart !== null && hourStart !== undefined) || (hourEnd !== '' && hourEnd !== null && hourEnd !== undefined)) {
    const start = convertTimeToMinutes(hourStart);
    const end = convertTimeToMinutes(hourEnd);

    if (Number.isNaN(start)) {
      showMessage('warning', 'La hora de inicio debe estar en el formato HH:MM' + (line !== undefined ? ', línea ' + line : ''));
      return false;
    }

    if (Number.isNaN(end)) {
      showMessage('warning', 'La hora fin debe estar en el formato HH:MM' + (line !== undefined ? ', línea ' + line : ''));
      return false;
    }

    if (tomorrow) {
      if (!(start >= midnight && end <= noon)) {
        showMessage('warning', 'La hora de la mañana se comprende entre las 00:00 y 12:00' + (line !== undefined ? ', línea ' + line : ''));
        return false;
      }
    } else {
      if (!(start > noon && end <= endOfDay)) {
        showMessage('warning', 'La hora de la tarde se comprende entre las 12:01 y 23:59');
        return false;
      }
    }

    if (start > end) {
      showMessage('warning', 'La hora de inicio no puede ser mayor a la hora de fin' + (line !== undefined ? ', línea ' + line : ''));
      return false;
    }

    if ((end - start) < 60) {
      showMessage('warning', 'La hora fin debe ser al menos 1 hora mayor a la hora de inicio' + (line !== undefined ? ', línea ' + line : ''));
      return false;
    }
  }

  return true;
}

const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};


export default validateHours;