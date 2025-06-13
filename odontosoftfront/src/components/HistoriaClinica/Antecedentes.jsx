import React, { useEffect, useState } from 'react';
import { apiGet } from '../apiService';

const Antecedentes = ({ formMedicalHistory, readOnly }) => {
  const usuario = sessionStorage.getItem('username');
  const [antecedentesMedicos, setAntecedentesMedicos] = useState([]);

  const mapAntecedentes = (data) => ({
    id: data.id || '',
    descripcion: data.descripcion || '',
    odontologico: data.odontologico || false,
    habilitado: data.habilitado || false,
    seleccionado: data.seleccionado || ''
  });

  useEffect(() => {
    const fetchHistoria = async () => {
      try {
        const antecedentsResponse = await apiGet('/precedenthistory/get');
        if (Array.isArray(antecedentsResponse)) {
          const antecedentes = antecedentsResponse.map(mapAntecedentes);
          const antecedentesMed = antecedentes.filter(item => !item.odontologico);
          antecedentesMed.forEach(antecedente => {
            let existItem = formMedicalHistory.antecedentepacientes.findIndex(item => item.idantecedente == antecedente.id);
            if (existItem === -1) {
              formMedicalHistory.antecedentepacientes.push({
                idantecedente: antecedente.id,
                idhistoriaclinica: formMedicalHistory.idHistoriaClinica,
                opciones: ''
              });
            } else {
              antecedente.seleccionado = formMedicalHistory.antecedentepacientes.find(item => item.idantecedente == antecedente.id)?.opciones || '';
            }
          });
          setAntecedentesMedicos(antecedentesMed);
        }
      } catch (error) {
        console.error('Error fetching medical history:', error);
      }
    };
    fetchHistoria();
  }, [formMedicalHistory.enfermedadActual]);

  const handleAntecedenteChange = (antecedente, value) => {
    setAntecedentesMedicos(prev => {
      return prev.map(item =>
        item.id === antecedente.id ? { ...item, seleccionado: value } : item
      );
    });
    let fechacreacion = new Date().toISOString();
    formMedicalHistory.antecedentepacientes = formMedicalHistory.antecedentepacientes.map(item =>
      item.idantecedente == antecedente.id ? {
        ...item,
        opciones: value,
        idusuariocreacion: usuario,
        fechacreacion: fechacreacion,
        idusuariomodificacion: item.id ? usuario : '',
        fechamodificacion: item.id ? fechacreacion : ''
      } : item
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Antecedentes Médicos</h2>
      </div>
      <div className="card-body">
        {antecedentesMedicos.map((antecedente, index) => (
          <div key={antecedente.id} className="antecedente-item mb-3">
            <label className="form-label">{antecedente.descripcion}</label>
            <div className="options d-flex">
              {['SI', 'NO', 'NO SABE'].map(option => (
                <div key={option} className="form-check form-check-inline">
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      value={option}
                      onChange={() => handleAntecedenteChange(antecedente, option)}
                      checked={antecedente.seleccionado === option}
                      style={{ width: '20px', height: '20px' }}
                      disabled={readOnly} />
                  </div>
                  <div>
                    <label className="form-check-label" style={{ marginLeft: '10px' }}>{option}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Antecedentes;