import ReadOnlyPaciente from "../HistoriaClinica/ReadOnlyPaciente";
import TextArea from "./TextArea";
import React, { useEffect, useState, useMemo } from "react"; // Importa useMemo
import { useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../../resource/LogoNegro.png";
import config from "../../config";
import Antecedentes from "./Antecedentes";
import AntecedentesOdont from "./Antecedentes";


const MedicalRecord = () => {
  const location = useLocation();

  // Utiliza useMemo para memorizar el objeto patient
  const patient = useMemo(() => {
    return location.state?.patient || {};
  }, [location.state]);

  const [formPatient, setFormPatient] = useState({
    idHistoriaClinica: '',
    idPaciente: ''
  });

  const [formMedicalHistory, setFormMedicalHistory] = useState({
    idHistoriaClinica: '',
    idPaciente: '',
    motivoConsulta: '',
    enfermedadActual: '',
    observacionAntec: '',
    observacionantecodon: '',
    antecedentepacientes: []
  });

  const [antecedentesMedicos, setAntecedentesMedicos] = useState([]);
  const [antecedentesOdont, setAntecedentesOdont] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario:', formPatient, formMedicalHistory, antecedentesMedicos, antecedentesOdont);
  }

  const mapMedicalHistory = (data) => ({
    idHistoriaClinica: data.id || '',
    idPatient: data.idpaciente || '',
    motivoConsulta: data.motivoconsulta || '',
    enfermedadActual: data.enfermedadactual || '',
    observacionAntec: data.observacionantec || '',
    observacionantecodon: data.observacionantecodon || '',
    antecedentepacientes: data.antecedentepacientes || []
  });

  const mapAntecedentes = (data) => ({
    id: data.id || '',
    descripcion: data.descripcion || '',
    odontologico: data.odontologico || false,
    habilitado: data.habilitado || false,
    seleccionado: data.seleccionado || ''
  });

 useEffect(() => {
  const fetchData = async () => {
    console.log('Patient:', patient);
      // Sets the form patient data using the patient information from the location state
      setFormPatient(prev => ({
        ...prev,
        idHistoriaClinica: patient.idHistoriaClinica || '',
        idPatient: patient.id || ''
      }));

      try {
        // Fetches the medical history data for the specific patient
        const response = await axios.get(`${config.baseURL}/historiaClinica/consultar/` + patient.idHistoriaClinica);
        console.log('Historia clinica:', response.data); // Logs the fetched medical history data
        // Maps and sets the medical history data
        setFormMedicalHistory(mapMedicalHistory(response.data));
        console.log('Formulario: ', formMedicalHistory);

        // Fetches the antecedent history data from the server
        const antecedentsResponse = await axios.get(`${config.baseURL}/precedenthistory/get`);
        if (Array.isArray(antecedentsResponse.data)) {
          const antecedentes = antecedentsResponse.data.map(mapAntecedentes);

          const antecedentesMed = antecedentes.filter(item => !item.odontologico);
          antecedentesMed.forEach(antecedente => {
            antecedente.seleccionado = response.data.antecedentepacientes.find(item => item.idantecedente == antecedente.id)?.opciones || '';
          });
          setAntecedentesMedicos(antecedentesMed);

          const antecedentesOdont = antecedentes.filter(item => item.odontologico);
          antecedentesOdont.forEach(antecedente => {
            antecedente.seleccionado = response.data.antecedentepacientes.find(item => item.idantecedente == antecedente.id)?.opciones || '';
          });
          setAntecedentesOdont(antecedentesOdont);
        }
      } catch (error) {
        console.error('Error fetching medical history:', error);
      }

  };

  fetchData();
}, [patient]);

  const handleMotivoConsultaChange = (event) => {
    setFormPatient(prev => ({
      ...prev,
      motivoConsulta: event.target.value
    }));
  };

  const handleEnfermedadActual = (event) => {
    setFormPatient(prev => ({
      ...prev,
      enfermedadActual: event.target.value
    }));
  };

  const handleObservacionAntec = (event) => {
    setFormPatient(prev => ({
      ...prev,
      observacionAntec: event.target.value
    }));
  };

  const handleAntecedenteChange = (antecedente, value) => {
    console.log('Antecedentes change: ', value);
    setAntecedentesMedicos(prev => {
      return prev.map(item =>
        item.id === antecedente.id ? {...item, seleccionado: value} : item
      );
    });
  };

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

/**
 * Handles the change event for the "Observación antecedentes odontológicos" field.
 * Updates the `observacionAntecOdon` property in the `formPatient` state.
 *
 * @param {Object} event - The event object from the input field.
 */
const handleObservacionAntecOdon = (event) => {
  setFormPatient(prev => ({
    ...prev,
    observacionAntecOdon: event.target.value
  }));
};

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ width: '1200px' }}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{ maxWidth: '140px' }} />
          <h1>Historia Clínica Odontológica</h1>
        </header>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <ReadOnlyPaciente idPatient={formPatient.idPatient}/>
          <div className="espacio"/>
          <TextArea label="Motivo consulta"
                    value={formMedicalHistory.motivoConsulta}
                    onChange={handleMotivoConsultaChange}/>
          <TextArea label="Enfermedad actual"
                    value={formMedicalHistory.enfermedadActual}
                    onChange={handleEnfermedadActual}/>
          <div className="espacio"/>
          <Antecedentes antecedentes={antecedentesMedicos} onChange={handleAntecedenteChange}/>
          <div className="espacio"/>
          <TextArea label="Observación antecedentes"
                    value={formMedicalHistory.observacionAntec}
                    onChange={handleObservacionAntec}/>
          <div className="espacio"/>
          <AntecedentesOdont antecedentes={antecedentesOdont} onChange={handleAntecedenteOdontChange}/>
          <label className="form-label">aqui {formMedicalHistory.antecedentepacientes.length}</label>
          <TextArea label="Observación antecedentes"
                    value={formMedicalHistory.observacionantecodon}
                    onChange={handleObservacionAntecOdon}/>
          <div className="espacio"/>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecord;