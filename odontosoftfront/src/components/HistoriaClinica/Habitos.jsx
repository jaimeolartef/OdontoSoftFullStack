import React, { useEffect, useState } from 'react';
import config from "../../config";
import axios from "axios";

const Habitos = ({ formMedicalHistory, setFormMedicalHistory }) => {
  const [habitos, setHabitos] = useState([]);
  const usuario = localStorage.getItem('username');

  const handleHabitosChange = (habito, value) => {
    let fechacreacion = new Date().toISOString();
    setFormMedicalHistory(prev => {
      const updatedHabitos = prev.habitopacientes.map(item =>
        item.idhabito === habito.id ? {
          ...item,
          opciones: value,
          idusuariocreacion: item.idusuariocreacion || usuario,
          fechacreacion: item.fechacreacion || fechacreacion,
          idusuariomodificacion: item.id ? usuario : '',
          fechamodificacion: item.id ? fechacreacion : ''
        } : item
      );
      return {
        ...prev,
        habitopacientes: updatedHabitos
      };
    });
  };

  useEffect(() => {
    const fetchHabitos = async () => {
      const habitosResponse = await axios.get(`${config.baseURL}/habitshistory/getall`);
      if (Array.isArray(habitosResponse.data)) {
        setHabitos(habitosResponse.data);
      }
    };
    fetchHabitos();
  }, []);

  // TODO: validar este metodo
  // TODO: la pantalla de registrar paciente no esta registrando
  useEffect(() => {
    let fecha = new Date().toISOString();
    habitos.forEach(habito => {
      let existItem = formMedicalHistory.habitopacientes.findIndex(item => item.idhabito === habito.id);
      if (existItem === -1) {
        formMedicalHistory.habitopacientes.push({
          idhabito: habito.id,
          idhistoriaclinica: formMedicalHistory.idHistoriaClinica,
          idusuariocreacion: usuario,
          fechacreacion: fecha,
          opciones: false
        });
      } else {
        habito.opciones = formMedicalHistory.habitopacientes.find(item => item.idhabito === habito.id)?.opciones || false;
      }
    });
    setFormMedicalHistory(prev => ({
      ...prev,
      habitopacientes: [...formMedicalHistory.habitopacientes]
    }));
  }, [habitos]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Hábitos</h2>
      </div>
      <div className="card-body">
        {formMedicalHistory.habitopacientes.map((habitoPac, index) => (
          <div key={habitoPac.idhabito} className="antecedente-item mb-3">
            <label className="form-label">{habitoPac.descripcion}</label>
            <div className="options d-flex">
              {[true, false].map(option => (
                <div key={option} className="form-check form-check-inline">
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      value={option}
                      onChange={() => handleHabitosChange(habitoPac, option)}
                      checked={habitoPac.opciones === option}
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