import React, { useEffect } from 'react';

const AnalisisFuncional = ({ formMedicalHistory, setFormMedicalHistory, readOnly }) => {
  const usuario = sessionStorage.getItem('username');

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    let fecha = new Date().toISOString();
    setFormMedicalHistory(prev => {
      const updatedAnalisisFunc = prev.analisisfuncionals.map((item, index) => {
        if (index === 0) { // Assuming you want to update the first item in the list
          return {
            ...item,
            [name]: newValue,
            idusuariocreacion: item.idusuariocreacion || usuario,
            fechacreacion: item.fechacreacion || fecha,
            idusuariomodificacion: item.id ? usuario : '',
            fechamodificacion: item.id ? fecha : ''
          };
        }
        return item;
      });
      return {
        ...prev,
        analisisfuncionals: updatedAnalisisFunc
      };
    });
  };

  useEffect(() => {
    let fecha = new Date().toISOString();
    if (!formMedicalHistory.analisisfuncionals || formMedicalHistory.analisisfuncionals.length === 0) {
      setFormMedicalHistory(prev => ({
        ...prev,
        analisisfuncionals: [{
          id: '',
          masticacion: false,
          deglucion: false,
          fonacion: false,
          respiracion: false,
          habilitado: false,
          idusuariocreacion: usuario,
          fechacreacion: fecha
        }]
      }));
    }
  }, [formMedicalHistory]);

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
                 checked={formMedicalHistory.analisisfuncionals[0]?.masticacion || false}
                 onChange={handleChange}
                  disabled={readOnly}/>
          <label className="form-check-label" htmlFor="masticacion">Masticación</label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="deglucion"
            id="deglucion"
            checked={formMedicalHistory.analisisfuncionals[0]?.deglucion || false}
            disabled={readOnly}
            onChange={handleChange}/>
          <label className="form-check-label" htmlFor="deglucion">Deglución</label>
        </div>
        <div className="form-check">
          <input className="form-check-input"
            type="checkbox"
            name="fonacion"
            id="fonacion"
            checked={formMedicalHistory.analisisfuncionals[0]?.fonacion || false}
            disabled={readOnly}
            onChange={handleChange}/>
          <label className="form-check-label" htmlFor="fonacion">Fonación</label>
        </div>
        <div className="form-check">
          <input className="form-check-input"
            type="checkbox"
            name="respiracion"
            id="respiracion"
            checked={formMedicalHistory.analisisfuncionals[0]?.respiracion || false}
             disabled={readOnly}
            onChange={handleChange}/>
          <label className="form-check-label" htmlFor="respiracion">Respiración</label>
        </div>
      </div>
    </div>
  );
};

export default AnalisisFuncional;