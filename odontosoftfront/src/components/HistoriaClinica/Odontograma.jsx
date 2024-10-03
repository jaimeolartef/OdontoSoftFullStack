import React, { useState } from 'react';
import './Odontograma.css'; // Ensure you have a CSS file for custom styles
import CondicionesDentales from './CondicionesDentale';

const Odontograma = () => {
  const initialTeethState = Array(32).fill({
    topLeft: 'healthy',
    topRight: 'healthy',
    bottomLeft: 'healthy',
    bottomRight: 'healthy'
  }); // Initial state of the teeth
  const [teeth, setTeeth] = useState(initialTeethState);

  const handleFragmentClick = (index, fragment) => {
    const newTeeth = [...teeth];
    newTeeth[index] = {
      ...newTeeth[index],
      [fragment]: newTeeth[index][fragment] === 'healthy' ? 'decayed' : 'healthy'
    };
    setTeeth(newTeeth);
  };

  const renderTooth = (index, label) => (
    <div key={index} className="tooth">
      <div className="tooth-label">{label}</div>
      <div
        className={`tooth-fragment top-left ${teeth[index].topLeft}`}
        onClick={() => handleFragmentClick(index, 'topLeft')}
      ></div>
      <div
        className={`tooth-fragment top-right ${teeth[index].topRight}`}
        onClick={() => handleFragmentClick(index, 'topRight')}
      ></div>
      <div
        className={`tooth-fragment bottom-left ${teeth[index].bottomLeft}`}
        onClick={() => handleFragmentClick(index, 'bottomLeft')}
      ></div>
      <div
        className={`tooth-fragment bottom-right ${teeth[index].bottomRight}`}
        onClick={() => handleFragmentClick(index, 'bottomRight')}
      ></div>
      <div className="central-circle"></div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2>Odontograma</h2>
      </div>
      <div className="card-body">
        <div className="odontograma-container">
          <CondicionesDentales />
          <div className="espacio" />
          <div className="odontograma">
            <div className="row">
              {Array.from({ length: 8 }, (_, i) => renderTooth(i, 18 - i))}
              {Array.from({ length: 8 }, (_, i) => renderTooth(i + 8, 21 + i))}
            </div>
            <div className="row">
              {Array.from({ length: 8 }, (_, i) => renderTooth(i + 16, 48 - i))}
              {Array.from({ length: 8 }, (_, i) => renderTooth(i + 24, 31 + i))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Odontograma;