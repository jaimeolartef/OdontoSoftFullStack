import React from 'react';

const AntecedentesMedicos = ({ antecedentes }) => {
  return (
    <div>
      {antecedentes.map((antecedente, index) => (
        <div key={index} className="antecedente-item">
          <label>{antecedente.descripcion}</label>
          <div className="options">
            <label>
              <input type="radio" name={`antecedente-${index}`} value="SI" /> SI
            </label>
            <label>
              <input type="radio" name={`antecedente-${index}`} value="NO" /> NO
            </label>
            <label>
              <input type="radio" name={`antecedente-${index}`} value="NO SABE" /> NO SABE
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AntecedentesMedicos;