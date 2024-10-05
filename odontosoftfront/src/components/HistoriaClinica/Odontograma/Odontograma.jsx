import React, { useState } from 'react';
import './Odontograma.css'; // Ensure you have a CSS file for custom styles
import CondicionesDentales from './CondicionesDentale';
import Diente from './Diente';  // Ensure the path is correct

const Odontograma = () => {
  const renderTooth = (index, toothNumber) => {
    return (
      <div key={index} className="tooth">
        <div style={{ textAlign: 'center' }}>{toothNumber}</div>
        <Diente />
      </div>
    );
  };

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
            <div className="rowOdonto">
              {Array.from({length: 8}, (_, i) => renderTooth(i, 18 - i))}
            </div>
            <div className="rowOdonto">
              {Array.from({length: 8}, (_, i) => renderTooth(i + 8, 21 + i))}
            </div>
            <div className="rowOdonto">
              {Array.from({length: 8}, (_, i) => renderTooth(i + 16, 48 - i))}
            </div>
            <div className="rowOdonto">
              {Array.from({length: 8}, (_, i) => renderTooth(i + 24, 31 + i))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Odontograma;