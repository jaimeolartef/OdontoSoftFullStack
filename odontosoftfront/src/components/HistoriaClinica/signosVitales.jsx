import React, { useEffect, useState } from 'react';

const SignosVitales = ({ formMedicalHistory }) => {
  const [signos, setSignos] = useState({
    pulso: '',
    temperatura: '',
    presionarterial: '',
    frecuenciarespiratoria: '',
    peso: '',
    talla: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignos(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const mapSignos = (data) => ({
    id: data.id || '',
    pulso: data.pulso || '',
    temperatura: data.temperatura || '',
    presionarterial: data.presionarterial || '',
    frecuenciarespiratoria: data.frecuenciarespiratoria || '',
    peso: data.peso || '',
    talla: data.talla || ''
  });

  useEffect(() => {
    if (Array.isArray(formMedicalHistory.signovitals)) {
      const signosVitales = formMedicalHistory.signovitals.map(mapSignos);
      if (signosVitales.length) {
        setSignos(signosVitales[0]);
      }
    }
  }, [formMedicalHistory]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Signos Vitales</h2>
      </div>
      <div className="card-body">
        <div>
          <label>Peso (Kg):</label>
          <input
            type="text"
            name="peso"
            value={signos.peso}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Talla (m):</label>
          <input
            type="text"
            name="talla"
            value={signos.talla}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Pulso (Latidos por minuto):</label>
          <input
            type="text"
            name="pulso"
            value={signos.pulso}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Temperatura (°C):</label>
          <input
            type="text"
            name="temperatura"
            value={signos.temperatura}
            onChange={handleChange}/>
        </div>
        <div>
          <label>Presión Arterial (mmHg):</label>
          <input
            type="text"
            name="presionarterial"
            value={signos.presionarterial}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Frecuencia Respiratoria (rpm):</label>
          <input
            type="text"
            name="frecuenciarespiratoria"
            value={signos.frecuenciarespiratoria}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SignosVitales;