import React, { useEffect, useState } from 'react';
import axios from "axios";
import config from "../../config";
import showMessage from "../../util/UtilMessage";

const AyudaDiagnostica = ({ formMedicalHistory }) => {
  const [TipoAyudaDiagnostica, setTipoAyudaDiagnostica] = useState([{
    id: 0,
    codigo: '',
    descripcion: '',
    habilitado: true
  }]);

  const [ayudasDiagnostica, setAyudaDiagnostica] = useState(formMedicalHistory.ayudadiagnosticas);
  const [selectedAyudaDiagnostico, setSelectedAyudaDiagnostico] = useState('');
  const usuario = localStorage.getItem('username');

  useEffect(() => {
    const fetchTipoAyudaDiagnostico = async () => {
      let token = localStorage.getItem('jsonwebtoken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const response = await axios.get(`${config.baseURL}/tipoayudadiagnostico/consultar`);
        if (response.status === 200) {
          setTipoAyudaDiagnostica(response.data);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    }

    fetchTipoAyudaDiagnostico();
  }, [formMedicalHistory]);

  //TODO falta revisar de aqui para abajo

  const handleAyudaDiagnosticoChange = (event) => {
    console.log('Diagnósticos:', event);
    const selectedValue = event.target.value;
    setSelectedAyudaDiagnostico(selectedValue);
    let ayudaDiagnosSelec = selectedValue.split(' - ');
    const diagSelected = TipoAyudaDiagnostica.findIndex(ayudaDiag => ayudaDiag.codigo === ayudaDiagnosSelec[0]);
    if (diagSelected > -1) { //TODO falta traer desde el back el codigo y la descripcion del tipo de ayuda diagnostica
      const existingItemIndex = formMedicalHistory.ayudadiagnosticas.findIndex(ayudaDiag => ayudaDiag.codtipodiagnostico === ayudaDiagnosSelec[0]);
      if (existingItemIndex === -1) {
        formMedicalHistory.diagnosticos.push({
          idhistoriaclinica: formMedicalHistory.idHistoriaClinica,
          idtipodiagnostico: TipoDiagnostico[diagSelected].id,
          codtipodiagnostico: TipoDiagnostico[diagSelected].codigo,
          descripciontipodiagnostico: TipoDiagnostico[diagSelected].descripcion,
          idusuariocreacion: usuario,
          fechacreacion: new Date().toISOString(),
          definitivo: false,
          habilitado: true,
        });
        setDiagnosticos([...formMedicalHistory.diagnosticos]); // Actualiza el estado
      } else {
        showMessage('warning', 'El diagnóstico ya existe en la lista.');
      }
    }
    console.log('Diagnósticos:', formMedicalHistory);
    setSelectedDiagnostico(''); // Limpia el valor del input
  };

  const handleSearchChange = (event) => {
    setSelectedDiagnostico(event.target.value);
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Diagnósticos</h2>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="diagnostico">Diagnóstico</label>
          <input
            className="form-control"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Buscar diagnostico..."
            value={selectedAyudaDiagnostico}
            onBlur={handleSearchChange}
            onInput={handleAyudaDiagnosticoChange}
          />
          <datalist id="datalistOptions">
            {TipoAyudaDiagnostica.map((tipo) => (
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
                <tr key={diagnostico.codigo}>
                  <td><label>{diagnostico.codtipodiagnostico}</label></td>
                  <td>{diagnostico.descripciontipodiagnostico}</td>
                  <td>
                    <button className="btn btn-danger">Eliminar</button>
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