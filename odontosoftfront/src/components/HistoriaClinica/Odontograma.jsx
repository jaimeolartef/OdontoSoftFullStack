import React, {useState} from 'react';
import './Odontograma.css'; // Asegúrate de crear un archivo CSS para estilos personalizados
import CondicionesDentales from './CondicionesDentale';

const Odontograma = () => {
  const initialTeethState = Array(32).fill('healthy'); // Estado inicial de los dientes
  const [teeth, setTeeth] = useState(initialTeethState);

  const handleToothClick = (index) => {
    const newTeeth = [...teeth];
    newTeeth[index] = newTeeth[index] === 'healthy' ? 'decayed' : 'healthy';
    setTeeth(newTeeth);
  };

  const renderTooth = (index, label) => (
    <div
      key={index}
      className={`tooth ${teeth[index]}`}
      onClick={() => handleToothClick(index)}
    >
      <div className="x-line x-line1"></div>
      <div className="x-line x-line2"></div>
      <div className="inner-circle"></div>
      <div className="tooth-label">{label}</div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2>Análisis Funcional</h2>
      </div>
      <div className="card-body">
        <div className="odontograma-container">
          <CondicionesDentales/>
          <div className="espacio"/>
          <div className="odontograma">
            <div className="row">
              {Array.from({length: 8}, (_, i) => renderTooth(i, 18 - i))}
              {Array.from({length: 8}, (_, i) => renderTooth(i + 8, 21 + i))}
            </div>
            <div className="row">
              {Array.from({length: 8}, (_, i) => renderTooth(i + 16, 48 - i))}
              {Array.from({length: 8}, (_, i) => renderTooth(i + 24, 31 + i))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Odontograma;