import React, { useEffect, useState } from 'react';
import { apiGet } from '../apiService';

const Antecedentes = ({ formMedicalHistory, readOnly }) => {
  const [antecedentesOdont, setAntecedentesOdont] = useState([]);
  const usuario = sessionStorage.getItem('username');

  const mapAntecedenteOdont = (data) => ({
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
          const antecedentes = antecedentsResponse.map(mapAntecedenteOdont);
          const antecedentesOdont = antecedentes.filter(item => item.odontologico);
          antecedentesOdont.forEach(antecedente => {
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
          setAntecedentesOdont(antecedentesOdont);
        }
      } catch (error) {
        console.error('Error fetching medical history:', error);
      }
    };
    fetchHistoria();
  }, [formMedicalHistory.enfermedadActual]);

  const handleAntecedenteOdontChange = (antecedenteOdont, value) => {
    setAntecedentesOdont(prevO => {
      return prevO.map(itemO =>
        itemO.id === antecedenteOdont.id ? { ...itemO, seleccionado: value } : itemO
      );
    });
    let fechacreacion = new Date().toISOString();
    formMedicalHistory.antecedentepacientes = formMedicalHistory.antecedentepacientes.map(item =>
      item.idantecedente == antecedenteOdont.id ? {
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
        <h2>Antecedentes Odontológicos</h2>
      </div>
      <div className="card-body">
        {antecedentesOdont.map((antecedente, index) => (
          <div key={antecedente.id} className="antecedente-item mb-3">
            <label className="form-label">{antecedente.descripcion}</label>
            <div className="options d-flex">
              {['SI', 'NO'].map(option => (
                <div key={option} className="form-check form-check-inline">
                  <div>
                    <input
                      disabled={readOnly}
                      className="form-check-input"
                      type="radio"
                      value={option}
                      onChange={() => handleAntecedenteOdontChange(antecedente, option)}
                      checked={antecedente.seleccionado === option}
                      style={{ width: '20px', height: '20px' }}
                    />
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