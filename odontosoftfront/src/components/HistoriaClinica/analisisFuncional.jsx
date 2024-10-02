import React, { useEffect, useState } from 'react';

const AnalisisFuncional = ({ formMedicalHistory }) => {
  const [analisisFunc, setAnalisisFunc] = useState({
    id: '',
    masticacion: false,
    deglucion: false,
    fonacion: false,
    respiracion: false,
    habilitado: false
  });

  useEffect(() => {
    if (Array.isArray(formMedicalHistory.analisisfuncionals)) {
      const analisisFunc = formMedicalHistory.analisisfuncionals.map(mapAnalisisFunc);
      if (analisisFunc.length) {
        setAnalisisFunc(analisisFunc[0]);
      }
    }
  }, [formMedicalHistory]);

  const mapAnalisisFunc = (data) => ({
    id: data.id || '',
    masticacion: data.masticacion || false,
    deglucion: data.deglucion || false,
    fonacion: data.fonacion || false,
    respiracion: data.respiracion || false,
    habilitado: data.habilitado || false
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setAnalisisFunc(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Análisis Funcional</h2>
      </div>
      <div className="card-body">
        <div className="form-check">
          <input id="masticacion"
                 className="form-check-input"
                 type="checkbox"
                 name="masticacion"
                 checked={analisisFunc.masticacion}
                 onChange={handleChange}/>
          <label className="form-check-label" htmlFor="masticacion">Masticación</label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="deglucion"
            id="deglucion"
            checked={analisisFunc.deglucion}
            onChange={handleChange}/>
          <label className="form-check-label" htmlFor="deglucion">Deglución</label>
        </div>
        <div className="form-check">
          <input className="form-check-input"
            type="checkbox"
            name="fonacion"
            id="fonacion"
            checked={analisisFunc.fonacion}
            onChange={handleChange}/>
          <label className="form-check-label" htmlFor="fonacion">Fonación:</label>
        </div>
        <div className="form-check">
          <input className="form-check-input"
            type="checkbox"
            name="respiracion"
            id="respiracion"
            checked={analisisFunc.respiracion}
            onChange={handleChange}/>
          <label className="form-check-label" htmlFor="respiracion">Respiración:</label>
        </div>
      </div>
    </div>
  );
};

export default AnalisisFuncional;