import React, { useEffect, useState } from 'react';
import { apiGet } from '../apiService';

const Habitos = ({ formMedicalHistory, setFormMedicalHistory, readOnly }) => {
  const [habitos, setHabitos] = useState([]);
  const usuario = sessionStorage.getItem('username');

  const mapHabito = (data) => ({
    id: data.id || '',
    descripcion: data.descripcion || '',
    opciones: data.opciones || false,
    habilitado: data.habilitado || false,
    seleccionado: data.seleccionado || false
  });

  useEffect(() => {
    const fetchHabitos = async () => {
      try {
        const habitosResponse = await apiGet('/habitshistory/getall');
        if (Array.isArray(habitosResponse)) {
          const habitos = habitosResponse.map(mapHabito);
          habitos.forEach(habito => {
            let existItem = formMedicalHistory.habitopacientes.findIndex(item => item.idhabito === habito.id);
            if (existItem === -1) {
              formMedicalHistory.habitopacientes.push({
                idhabito: habito.id,
                idhistoriaclinica: formMedicalHistory.idHistoriaClinica,
                opciones: false,
                idusuariocreacion: usuario,
                fechacreacion: new Date().toISOString()
              });
            } else {
              habito.seleccionado = formMedicalHistory.habitopacientes.find(item => item.idhabito === habito.id)?.opciones || false;
            }
          });
          setHabitos(habitos);
        }
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };
    fetchHabitos();
  }, [formMedicalHistory.idHistoriaClinica]);

  const handleHabitosChange = (habito, value) => {
    setHabitos(prevH => {
      return prevH.map(itemH =>
        itemH.id === habito.id ? { ...itemH, seleccionado: value } : itemH
      );
    });
    let fechacreacion = new Date().toISOString();
    formMedicalHistory.habitopacientes = formMedicalHistory.habitopacientes.map(item =>
      item.idhabito === habito.id ? {
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
        <h2>Hábitos</h2>
      </div>
      <div className="card-body">
        {habitos.map((habito, index) => (
          <div key={habito.id} className="antecedente-item mb-3">
            <label className="form-label">{habito.descripcion}</label>
            <div className="options d-flex">
              {[true, false].map(option => (
                <div key={option} className="form-check form-check-inline">
                  <div>
                    <input disabled={readOnly}
                      className="form-check-input"
                      type="radio"
                      value={option}
                      onChange={() => handleHabitosChange(habito, option)}
                      checked={habito.seleccionado === option}
                      style={{ width: '20px', height: '20px' }}
                    />
                  </div>
                  <div>
                    <label className="form-check-label" style={{ marginLeft: '10px' }}>{option ? 'SI' : 'NO'}</label>
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

export default Habitos;