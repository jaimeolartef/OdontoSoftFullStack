import ReadOnlyPaciente from "../HistoriaClinica/ReadOnlyPaciente";
import TextArea from "./TextArea";
import React, {useEffect, useState, useMemo} from "react"; // Importa useMemo
import {useLocation} from "react-router-dom";
import axios from "axios";
import Logo from "../../resource/LogoNegro.png";
import config from "../../config";
import Antecedentes from "./Antecedentes";
import AntecedentesOdont from "./AntecedentesOdontol";
import Habitos from "./Habitos";

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
    antecedentepacientes: [],
    habitopacientes: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario:', formPatient, formMedicalHistory);
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
      habitopacientes: data.habitopacientes || []
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormMedicalHistory(prev => ({
      ...prev,
      [name]: value
    }));
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
      <div className="card p-4" style={{width: '1200px'}}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{maxWidth: '140px'}}/>
          <h1>Historia Clínica Odontológica</h1>
        </header>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <ReadOnlyPaciente idPatient={formPatient.idPaciente}/>
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
          <TextArea label="Observación antecedentes"
                    name="observacionantecodon"
                    value={formMedicalHistory.observacionantecodon}
                    onChange={handleInputChange}/>
          <div className="espacio"/>
          <Habitos formMedicalHistory={formMedicalHistory}/>
          <div className="espacio"/>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecord;