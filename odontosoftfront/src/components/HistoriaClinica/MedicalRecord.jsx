import ReadOnlyPaciente from "../HistoriaClinica/ReadOnlyPaciente";
import TextArea from "./TextArea";
import React, {useEffect, useState, useMemo} from "react"; // Importa useMemo
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import Logo from "../../resource/LogoNegro.png";
import config from "../../config";
import Antecedentes from "./Antecedentes";
import AntecedentesOdont from "./AntecedentesOdontol";
import Habitos from "./Habitos";
import SignosVitales from "./SignosVitales";
import AnalisisFuncional from "./AnalisisFuncional";
import ExamenEstomatologico from "./ExamenEstomatologico";
import Diagnosticos from "./Diagnosticos";
import Diente from "../../resource/diente.png";
import AyudasDiagnostico from "./AyudaDiagnostica";
import {Tooltip} from "react-tooltip";

const MedicalRecord = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    antecedentepacientes: [],
    habitopacientes: [],
    observacion: '',
    signovitals: [],
    analisisfuncionals: [],
    observacionanafunc: '',
    examenestomatologicos: [],
    odontogramas: [],
    diagnosticos: [],
    ayudadiagnosticas: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const mapMedicalHistory = (data) => {
    const mappedData = {
      idHistoriaClinica: data.id || '',
      idPaciente: data.idpaciente || '',
      motivoConsulta: data.motivoconsulta || '',
      enfermedadActual: data.enfermedadactual || '',
      observacionAntec: data.observacionantec || '',
      observacionantecodon: data.observacionantecodon || '',
      antecedentepacientes: data.antecedentepacientes || [],
      habitopacientes: data.habitopacientes || [],
      observacion: data.observacion || '',
      signovitals: data.signovitals || [],
      analisisfuncionals: data.analisisfuncionals || [],
      observacionanafunc: data.observacionanafunc || '',
      examenestomatologicos: data.examenestomatologicos || [],
      odontogramas: data.odontogramas || [],
      diagnosticos: data.diagnosticos || [],
      ayudadiagnosticas: data.ayudadiagnosticas || []
    };
    return mappedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      // Sets the form patient data using the patient information from the location state
      setFormPatient(prev => ({
        ...prev,
        idHistoriaClinica: patient.idHistoriaClinica || '',
        idPaciente: patient.id || ''
      }));
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Formulario paciente:', formPatient);
    const fetchData = async () => {
      // Fetches the medical history data for the specific patient
      const response = await axios.get(`${config.baseURL}/historiaClinica/consultar/` + patient.idHistoriaClinica);
      // Maps and sets the medical history data
      setFormMedicalHistory(mapMedicalHistory(response.data));
    };
    fetchData();
  }, [formPatient.idPaciente]);



  const handleMedicalRecordClick = (idHistoriaClinica) => {
    navigate('/odontograma', { state: { idHistoriaClinica: idHistoriaClinica } });
  };


  /**
 * Handles input changes for form fields.
 *
 * This function updates the `formMedicalHistory` state with the new value
 * of the input field that triggered the event. It uses the `name` attribute
 * of the input field to determine which property of the state to update.
 *
 * @param {Object} event - The event object from the input field.
 * @param {Object} event.target - The target element of the event.
 * @param {string} event.target.name - The name of the input field.
 * @param {string} event.target.value - The new value of the input field.
 */
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormMedicalHistory(prev => ({
    ...prev,
    [name]: value
  }));
};

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{width: '1500px'}}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{maxWidth: '140px'}}/>
          <h1>Historia Clínica Odontológica</h1>
        </header>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <ReadOnlyPaciente idPatient={formPatient.idPaciente}/>
          <div className="espacio"/>
          <div style={{
            position: 'fixed',
            left: '90vw',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            zIndex: 1000,
          }}>
            <img src={Diente} alt="Odontograma"
                 style={{width: '100%', height: '100%'}}
                 onClick={(e) => {
                   e.stopPropagation();
                   handleMedicalRecordClick(formMedicalHistory.idHistoriaClinica);
                 }}
                 data-tooltip-id="tooltip" data-tooltip-content="Ver Odontograma"/>
          </div>
          <Tooltip id="tooltip"/>
          <div className="espacio"/>
          <TextArea label="Motivo consulta"
                    name="motivoConsulta"
                    value={formMedicalHistory.motivoConsulta}
                    onChange={handleInputChange}/>
          <TextArea label="Enfermedad actual"
                    name="enfermedadActual"
                    value={formMedicalHistory.enfermedadActual}
                    onChange={handleInputChange}/>
          <div className="espacio"/>
          <Antecedentes formMedicalHistory={formMedicalHistory}/>
          <div className="espacio"/>
          <TextArea label="Observación antecedentes"
                    name="observacionAntec"
                    value={formMedicalHistory.observacionAntec}
                    onChange={handleInputChange}/>
          <div className="espacio"/>
          <AntecedentesOdont formMedicalHistory={formMedicalHistory}/>
          <div className="espacio"/>
          <TextArea label="Observación antecedentes odontológicos"
                    name="observacionantecodon"
                    value={formMedicalHistory.observacionantecodon}
                    onChange={handleInputChange}/>
          <div className="espacio"/>
          <Habitos formMedicalHistory={formMedicalHistory}/>
          <div className="espacio"/>
          <TextArea label="Observación"
                    name="observacion"
                    value={formMedicalHistory.observacion}
                    onChange={handleInputChange}/>
          <div className="espacio"/>
          <SignosVitales formMedicalHistory={formMedicalHistory}/>
          <div className="espacio"/>
          <AnalisisFuncional formMedicalHistory={formMedicalHistory}/>
          <div className="espacio"/>
          <TextArea label="Observación"
                    name="observacionanafunc"
                    value={formMedicalHistory.observacionanafunc}
                    onChange={handleInputChange}/>
          <div className="espacio"/>
          <ExamenEstomatologico formMedicalHistory={formMedicalHistory}/>
          <div className="espacio"/>
          <Diagnosticos formMedicalHistory={formMedicalHistory}/>
          <div className="espacio"/>
          <AyudasDiagnostico formMedicalHistory={formMedicalHistory}/>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecord;