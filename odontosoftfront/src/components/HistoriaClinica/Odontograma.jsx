import React, { useState } from 'react';
import './Odontograma.css'; // Asegúrate de crear un archivo CSS para estilos personalizados

const Odontograma = () => {
  const initialTeethState = Array(32).fill('healthy'); // Estado inicial de los dientes
  const [teeth, setTeeth] = useState(initialTeethState);

  const handleToothClick = (index) => {
    const newTeeth = [...teeth];
    newTeeth[index] = newTeeth[index] === 'healthy' ? 'decayed' : 'healthy';
    setTeeth(newTeeth);
  };

  return (
    <div className="odontograma">
      {teeth.map((tooth, index) => (
        <div
          key={index}
          className={`tooth ${tooth}`}
          onClick={() => handleToothClick(index)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Odontograma;