import React, {useEffect, useState} from 'react';
import config from "../../config";
import axios from "axios";

const Habitos = ({formMedicalHistory}) => {

  const [habitosPaciente, setHabitosPaciente] = useState([]);
  const usuario = localStorage.getItem('username');

  const mapHabitos = (data) => ({
    id: data.id || '',
    descripcion: data.descripcion || '',
    opciones: data.opciones || false,
    habilitado: data.habilitado || false,
  });

  const handleHabitosChange = (habito, value) => {
    console.log('habito:', habito);
    console.log('value:', value);
    setHabitosPaciente(prev => {
      return prev.map(item =>
        item.id === habito.id ? {...item, opciones: value} : item
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
    console.log('formMedicalHistory.habitopacientes:', formMedicalHistory.habitopacientes);
    console.log('habitosPaciente:', habitosPaciente);
  };

  useEffect(() => {
    const fetchHabitos = async () => {
      const habitosResponse = await axios.get(`${config.baseURL}/habitshistory/getall`);
      let fecha = new Date().toISOString();
      if (Array.isArray(habitosResponse.data)) {
        const habitos = habitosResponse.data.map(mapHabitos);
        habitos.forEach(habito => {
          console.log('habitos:', formMedicalHistory.habitopacientes);
          let existItem = formMedicalHistory.habitopacientes.findIndex(item => item.idhabito == habito.id);
          if (existItem === -1) {
            formMedicalHistory.habitopacientes.push({
              idhabito: habito.id,
              idhistoriaclinica: formMedicalHistory.idHistoriaClinica,
              idusuariocreacion: usuario,
              fechacreacion: fecha,
              opciones: false
            });
          } else {
            console.log('habito:', habito);
            habito.opciones = formMedicalHistory.habitopacientes.find(item => item.id == habito.id)?.opciones || false;
          }
        });
        setHabitosPaciente(habitos);
      }
    };
    fetchHabitos();
  }, [formMedicalHistory]);


  return (
    <div className="card">
      <div className="card-header">
        <h2>Hábitos</h2>
      </div>
      <div className="card-body">
        {habitosPaciente.map((habitoPac, index) => (
          <div key={habitoPac.id} className="antecedente-item mb-3">
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
                      style={{width: '20px', height: '20px'}}/>
                  </div>
                  <div>
                    <label className="form-check-label" style={{marginLeft: '10px'}}>{option ? 'SI' : 'NO'}</label>
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