import React from 'react';

const Antecedentes = ({antecedentes, onChange}) => {
  return (
    <div>
      {antecedentes.map((antecedente, index) => (
        <div className="antecedente-item mb-3">
          <label className="form-label">{antecedente.descripcion}</label>
          <div className="options d-flex">
            {['SI', 'NO', 'NO SABE'].map(option => (
              <div key={option} className="form-check form-check-inline">
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    value={option}
                    onChange={() => onChange(antecedente, option)}
                    checked={antecedente.seleccionado === option}
                    style={{width: '20px', height: '20px'}}/>
                </div>
                <div>
                  <label className="form-check-label" style={{marginLeft: '10px'}}>{option}</label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Antecedentes;