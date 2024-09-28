import React, {useEffect, useState} from 'react';
import axios from "axios";
import config from "../../config";

const Antecedentes = ({formMedicalHistory}) => {

  const [antecedentesOdont, setAntecedentesOdont] = useState([]);

  const mapAntecedenteOdont = (data) => ({
    id: data.id || '',
    descripcion: data.descripcion || '',
    odontologico: data.odontologico || false,
    habilitado: data.habilitado || false,
    seleccionado: data.seleccionado || ''
  });

  useEffect(() => {
    // Este useEffect se ejecutará después del primer useEffect
    const fetchHistoria = async () => {
      try {
        const antecedentsResponse = await axios.get(`${config.baseURL}/precedenthistory/get`);
        if (Array.isArray(antecedentsResponse.data)) {
          const antecedentes = antecedentsResponse.data.map(mapAntecedenteOdont);
          const antecedentesOdont = antecedentes.filter(item => item.odontologico);
          antecedentesOdont.forEach(antecedente => {
            antecedente.seleccionado = formMedicalHistory.antecedentepacientes.find(item => item.idantecedente == antecedente.id)?.opciones || '';
          });
          setAntecedentesOdont(antecedentesOdont);
        }
      } catch (error) {
        console.error('Error fetching medical history:', error);
      }
    };
    fetchHistoria();
  }, [formMedicalHistory.enfermedadActual]);

  /**
   * Handles the change event for an odontological antecedent.
   * Updates the `seleccionado` property of the matching antecedent in the `antecedentesOdont` state.
   *
   * @param {Object} antecedenteOdont - The odontological antecedent object.
   * @param {string} value - The new value to set for the `seleccionado` property.
   */
  const handleAntecedenteOdontChange = (antecedenteOdont, value) => {
    setAntecedentesOdont(prevO => {
      return prevO.map(itemO =>
        itemO.id === antecedenteOdont.id ? {...itemO, seleccionado: value} : itemO
      );
    });
  };

  return (
    <div>
      {antecedentesOdont.map((antecedente, index) => (
        <div key={antecedente.id} className="antecedente-item mb-3">
          <label className="form-label">{antecedente.descripcion}</label>
          <div className="options d-flex">
            {['SI', 'NO'].map(option => (
              <div key={option} className="form-check form-check-inline">
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    value={option}
                    onChange={() => handleAntecedenteOdontChange(antecedente, option)}
                    checked={antecedente.seleccionado === option}
                    style={{width: '20px', height: '20px'}}/>
                </div>
                <div>
                  <label className="form-check-label" style={{marginLeft: '10px'}}>{option}</label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Antecedentes;