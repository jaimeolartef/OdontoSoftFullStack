import React from 'react';

const Antecedentes = ({ antecedentes }) => {
  return (
    <div>
      {antecedentes.filter(antecedente => !antecedente.odontologico).map((antecedente, index) => (
        <div key={index} className="antecedente-item mb-3">
          <label className="form-label">{antecedente.descripcion}</label>
          <div className="options d-flex justify-content-between">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name={`antecedente-${index}`} value="SI" />
              <label className="form-check-label">SI</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name={`antecedente-${index}`} value="NO" />
              <label className="form-check-label">NO</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name={`antecedente-${index}`} value="NO SABE" />
              <label className="form-check-label">NO SABE</label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Antecedentes;