import React, { useEffect } from 'react';

const SignosVitales = ({ formMedicalHistory, setFormMedicalHistory, readOnly }) => {
  const usuario = localStorage.getItem('username');

    const handleChange = (e) => {
      const { name, value } = e.target;
      let fecha = new Date().toISOString();
      setFormMedicalHistory(prev => {
        const updatedSignovitals = prev.signovitals.map((item, index) => {
          if (index === 0) { // Assuming you want to update the first item in the list
            return {
              ...item,
              [name]: value,
              idusuariocreacion: item.idusuariocreacion || usuario,
              fechacreacion: item.fechacreacion || fecha,
              idusuariomodificacion: item.id ? usuario : '',
              fechamodificacion: item.id ? fecha : '',
              idHistoriaClinica: item.idHistoriaClinica ? formMedicalHistory.idHistoriaClinica : ''
            };
          }
          return item;
        });
        return {
          ...prev,
          signovitals: updatedSignovitals
        };
      });
    };

  useEffect(() => {
    const fetchSignosVitales = async () => {
      if (!formMedicalHistory.signovitals || formMedicalHistory.signovitals.length === 0) {
        let fecha = new Date().toISOString();
        setFormMedicalHistory(prev => ({
          ...prev,
          signovitals: [{
            pulso: '',
            temperatura: '',
            presionarterial: '',
            frecuenciarespiratoria: '',
            peso: '',
            talla: '',
            idusuariocreacion: usuario,
            fechacreacion: fecha
          }]
        }));
      }
    }

    fetchSignosVitales();
  }, [formMedicalHistory]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Signos Vitales</h2>
      </div>
      <div className="card-body">
        <div>
          <label>Peso (Kg):</label>
          <input disabled={readOnly}
            type="text"
            name="peso"
            value={formMedicalHistory.signovitals[0]?.peso || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Talla (m):</label>
          <input disabled={readOnly}
            type="text"
            name="talla"
            value={formMedicalHistory.signovitals[0]?.talla || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Pulso (Latidos por minuto):</label>
          <input disabled={readOnly}
            type="text"
            name="pulso"
            value={formMedicalHistory.signovitals[0]?.pulso || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Temperatura (°C):</label>
          <input disabled={readOnly}
            type="text"
            name="temperatura"
            value={formMedicalHistory.signovitals[0]?.temperatura || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Presión Arterial (mmHg):</label>
          <input disabled={readOnly}
            type="text"
            name="presionarterial"
            value={formMedicalHistory.signovitals[0]?.presionarterial || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Frecuencia Respiratoria (rpm):</label>
          <input disabled={readOnly}
            type="text"
            name="frecuenciarespiratoria"
            value={formMedicalHistory.signovitals[0]?.frecuenciarespiratoria || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SignosVitales;