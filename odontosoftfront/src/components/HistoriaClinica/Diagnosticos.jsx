import React, { useEffect, useState } from 'react';
import axios from "axios";
import config from "../../config";
import showMessage from "../../util/UtilMessage";
import EliminarIcon from "../../resource/Eliminar.png";
import { Tooltip } from "react-tooltip";

const Diagnosticos = ({ formMedicalHistory, setFormMedicalHistory, readOnly }) => {
    const [TipoDiagnostico, setTipoDiagnostico] = useState([{
        id: 0,
        codigo: '',
        descripcion: '',
        habilitado: true
    }]);

    const [selectedDiagnostico, setSelectedDiagnostico] = useState('');
    const usuario = localStorage.getItem('username');

    useEffect(() => {
        const fetchTipoDiagnostico = async () => {
            let token = localStorage.getItem('jsonwebtoken');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const response = await axios.get(`${config.baseURL}/tipodiagnostico/consultar`);
                if (response.status === 200) {
                    setTipoDiagnostico(response.data);
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        }

        fetchTipoDiagnostico();
    }, [formMedicalHistory]);

    const handleCheckboxChange = (index) => {
        const newDiagnosticos = [...formMedicalHistory.diagnosticos];
        newDiagnosticos[index].definitivo = !newDiagnosticos[index].definitivo;
        setFormMedicalHistory(prev => ({
            ...prev,
            diagnosticos: newDiagnosticos
        }));
    };

    const handleDiagnosticoChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedDiagnostico(selectedValue);
        let diagnosSelec = selectedValue.split(' - ');
        const diagSelected = TipoDiagnostico.findIndex(diagnostico => diagnostico.codigo === diagnosSelec[0]);
        if (diagSelected > -1) {
            const existingItemIndex = formMedicalHistory.diagnosticos.findIndex(diagnostico => diagnostico.codtipodiagnostico === diagnosSelec[0]);
            if (existingItemIndex === -1) {
                const newDiagnosticos = [
                    ...formMedicalHistory.diagnosticos,
                    {
                        idhistoriaclinica: formMedicalHistory.idHistoriaClinica,
                        idtipodiagnostico: TipoDiagnostico[diagSelected].id,
                        codtipodiagnostico: TipoDiagnostico[diagSelected].codigo,
                        descripciontipodiagnostico: TipoDiagnostico[diagSelected].descripcion,
                        idusuariocreacion: usuario,
                        fechacreacion: new Date().toISOString(),
                        definitivo: false,
                        habilitado: true,
                    }
                ];
                setFormMedicalHistory(prev => ({
                    ...prev,
                    diagnosticos: newDiagnosticos
                }));
            } else {
                showMessage('warning', 'El diagnóstico ya existe en la lista.');
            }
        }
        setSelectedDiagnostico(''); // Limpia el valor del input
    };

    const handleSearchChange = (event) => {
        setSelectedDiagnostico(event.target.value);
    }

    const handleDelete = (index) => {
        const newDiagnosticos = [...formMedicalHistory.diagnosticos];
        newDiagnosticos.splice(index, 1);
        setFormMedicalHistory(prev => ({
            ...prev,
            diagnosticos: newDiagnosticos
        }));
    };

    return (
      <div className="card">
          <div className="card-header">
              <h2>Diagnósticos</h2>
          </div>
          <div className="card-body">
              <div className="form-group">
                  <label htmlFor="diagnostico">Diagnóstico</label>
                  <input disabled={readOnly}
                    className="form-control"
                    list="datalistOptions"
                    id="exampleDataList"
                    placeholder="Buscar diagnostico..."
                    value={selectedDiagnostico}
                    onBlur={handleSearchChange}
                    onInput={handleDiagnosticoChange} // Ejecuta el método al seleccionar una opción
                  />
                  <datalist id="datalistOptions">
                      {TipoDiagnostico.map((tipo) => (
                        <option key={tipo.id} value={`${tipo.codigo} - ${tipo.descripcion}`}/>
                      ))}
                  </datalist>
              </div>
              <div className="espacio"/>
              <div className="form-group">
                  <table className="table">
                      <thead>
                      <tr>
                          <th>Código</th>
                          <th>Diagnóstico</th>
                          <th>Confirmado</th>
                          <th>Acciones</th>
                      </tr>
                      </thead>
                      <tbody>
                      {formMedicalHistory.diagnosticos.length === 0 ? (
                        <tr>
                            <td colSpan="4"><p>No hay diagnósticos disponibles.</p></td>
                        </tr>
                      ) : (
                        formMedicalHistory.diagnosticos.map((diagnostico, index) => (
                          <tr key={index}>
                              <td><label>{diagnostico.codtipodiagnostico}</label></td>
                              <td style={{width: '50%'}}>{diagnostico.descripciontipodiagnostico}</td>
                              <td>
                                  <input disabled={readOnly}
                                    type="checkbox"
                                    checked={diagnostico.definitivo}
                                    onChange={() => handleCheckboxChange(index)}
                                  />
                              </td>
                              <td>
                                  {!readOnly && (
                                      <img src={EliminarIcon} alt="Eliminar"
                                           style={{marginRight: '5px', width: '35px', height: '35px', cursor: 'pointer'}}
                                           onClick={() => handleDelete(index)}
                                           data-tooltip-id="editTooltip" data-tooltip-content="Eliminar"/>
                                    )}
                                  <Tooltip id="editTooltip"/>
                              </td>
                          </tr>
                        ))
                      )}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    );
};

export default Diagnosticos;