import React, {useEffect, useState} from 'react';
import axios from "axios";
import config from "../../config";
import showMessage from "../../util/UtilMessage";
import {Tooltip} from "react-tooltip";
import EliminarIcon from "../../resource/Eliminar.png";
import EditIcon from '../../resource/EditIcon.png';
import VerIcon from "../../resource/ver.png";

const AyudaDiagnostica = ({formMedicalHistory, setFormMedicalHistory, readOnly}) => {
  const [TipoAyudaDiagnostica, setTipoAyudaDiagnostica] = useState([{
    id: 0,
    codigo: '',
    descripcion: '',
    habilitado: true
  }]);

  const [ayudasDiagnostica, setAyudaDiagnostica] = useState(formMedicalHistory.ayudadiagnosticas);
  const [selectedAyudaDiagnostico, setSelectedAyudaDiagnostico] = useState('');
  const usuario = sessionStorage.getItem('username');
  const token = sessionStorage.getItem('jsonwebtoken');

  useEffect(() => {
    const fetchTipoAyudaDiagnostico = async () => {
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


  const handleAyudaDiagnosticoChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedAyudaDiagnostico(selectedValue);
    let ayudaDiagnosSelec = selectedValue.split(' - ');
    const diagSelected = TipoAyudaDiagnostica.findIndex(ayudaDiag => ayudaDiag.codigo === ayudaDiagnosSelec[0]);
    if (diagSelected > -1) {
      const existingItemIndex = formMedicalHistory.ayudadiagnosticas.findIndex(ayudaDiag => ayudaDiag.codtipoayudadiag === ayudaDiagnosSelec[0]);
      if (existingItemIndex === -1) {
        formMedicalHistory.ayudadiagnosticas.push({
          idhistoriaclinica: formMedicalHistory.idHistoriaClinica,
          idtipoayudadiag: TipoAyudaDiagnostica[diagSelected].id,
          codtipoayudadiag: TipoAyudaDiagnostica[diagSelected].codigo,
          descripciontipoayudadiag: TipoAyudaDiagnostica[diagSelected].descripcion,
          idusuariocreacion: usuario,
          fechacreacion: new Date().toISOString(),
          definitivo: false,
          habilitado: true,
        });
        setAyudaDiagnostica([...formMedicalHistory.ayudadiagnosticas]); // Actualiza el estado
      } else {
        showMessage('warning', 'El tipo diagnóstico ya existe en la lista.');
      }
    }
    console.log('Diagnósticos:', formMedicalHistory);
  };

  const handleSearchChange = (event) => {
    setSelectedAyudaDiagnostico(event.target.value);
  }

  const handleDelete = (index) => {
    const newAyudaDiagnostica = [...formMedicalHistory.ayudadiagnosticas];
    newAyudaDiagnostica.splice(index, 1);
    setFormMedicalHistory(prev => ({
      ...prev,
      ayudadiagnosticas: newAyudaDiagnostica
    }));
  };

  const handleAgregar = (idtipoayudadiag) => {
    // Crear un elemento input type file y simular clic
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.jpg,.png';
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('Archivo seleccionado:', file.name);

        try {
          // Crear FormData para enviar el archivo
          const formData = new FormData();
          formData.append('file', file);
          formData.append('idHistoriaClinica', formMedicalHistory.idHistoriaClinica);
          formData.append('idTipoAyudaDiag', idtipoayudadiag);

          // Obtener token de autenticación
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Enviar petición al servidor
          const response = await axios.post(
            `${config.baseURL}/tipoayudadiagnostico/subirArchivo`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );

          if (response.status === 200) {
            showMessage('success', 'Archivo subido correctamente');
            // Actualizar datos si es necesario
            handleUploadSuccess(response.data);
          }
        } catch (error) {
          console.error('Error al subir el archivo:', error);
          showMessage('error', 'Error al subir el archivo');
        }
      } else {
        showMessage('error', 'No se seleccionó ningún archivo.');
      }
    };
    fileInput.click();
  };

  const handleVer = (idtipoayudadiag) => {
    alert(idtipoayudadiag);
  };

  const handleUploadSuccess = (data) => {
    showMessage('success', 'Archivo subido con éxito.');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Ayudas Diagnósticos</h2>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="Ayudadiagnostico">Ayuda Diagnóstico</label>
          <input disabled={readOnly}
            className="form-control"
            list="ayudaDiaglistOptions"
            id="ayudaDiagList"
            placeholder="Buscar diagnostico..."
            value={selectedAyudaDiagnostico}
            onBlur={handleSearchChange}
            onInput={handleAyudaDiagnosticoChange}
          />
          <datalist id="ayudaDiaglistOptions">
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
              <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {formMedicalHistory.ayudadiagnosticas.length === 0 ? (
              <tr>
                <td colSpan="4"><p>No hay ayudas diagnósticos disponibles.</p></td>
              </tr>
            ) : (
              formMedicalHistory.ayudadiagnosticas.map((diagnostico, index) => (
                <tr key={index}>
                  <td><label>{diagnostico.codtipoayudadiag}</label></td>
                  <td style={{width: '50%'}}>{diagnostico.descripciontipoayudadiag}</td>
                  <td>
                    {!readOnly && (
                      <img src={EditIcon} alt="Agregar Ayuda Diagnostica"
                           style={{marginRight: '5px', width: '35px', height: '35px', cursor: 'pointer'}}
                           onClick={() => handleAgregar(diagnostico.idtipoayudadiag)}
                           data-tooltip-id="editTooltip" data-tooltip-content="Subir"/>
                    )}
                    {!readOnly && (
                      <img src={VerIcon} alt="Ver Ayuda Diagnóstica"
                           style={{marginRight: '5px', width: '35px', height: '35px', cursor: 'pointer'}}
                           onClick={() => handleVer(diagnostico.idtipoayudadiag)}
                           data-tooltip-id="editTooltip" data-tooltip-content="Ver"/>
                    )}
                    {!readOnly && (
                    <img src={EliminarIcon} alt="Eliminar Ayuda Diagnóstica"
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

export default AyudaDiagnostica;