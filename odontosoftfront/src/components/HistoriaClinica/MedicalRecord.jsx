import ReadOnlyPaciente from "../HistoriaClinica/ReadOnlyPaciente";
import TextArea from "./TextArea";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import Logo from "../../resource/LogoNegro.png";
import config from "../../config";
import Antecedentes from "./Antecedentes";

const MedicalRecord = () => {
  const location = useLocation();
  const {patient} = location.state || {};
  const [formPatient, setFormPatient] = useState({
    idHistoriaClinica: '',
    idPaciente: '',
  });

  const [formMedicalHistory, setFormMedicalHistory] = useState({
    idHistoriaClinica: '',
    idPaciente: '',
    motivoConsulta: '',
    enfermedadActual: ''
  });

  const [antecedentesMedicos, setAntecedentesMedicos] = useState([]); // Initialize as an empty array

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
  }

  const mapMedicalHistory = (data) => ({
    idHistoriaClinica: data.id || '',
    idPatient: data.idpaciente || '',
    motivoConsulta: data.motivoconsulta || '',
    enfermedadActual: data.enfermedadactual || ''
  });

  const mapAntecedentes = (data) => ({
    id: data.id || '',
    descripcion: data.descripcion || '',
    odontologico: data.odontologico || false,
    habilitado: data.habilitado || ''
  });

  useEffect(() => {
    axios.get(`${config.baseURL}/precedenthistory/get`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setAntecedentesMedicos(response.data.map(mapAntecedentes));
          console.log('Antecedentes médicos:', antecedentesMedicos);
        }
      })
      .catch(error => console.error('Error fetching medical history:', error));

    setFormPatient(prev => ({
      ...prev,
      idHistoriaClinica: patient.idHistoriaClinica || '',
      idPatient: patient.id || ''
    }));

    axios.get(`${config.baseURL}/historiaClinica/consultar/` + patient.idHistoriaClinica)
      .then(response => {
        setFormMedicalHistory(mapMedicalHistory(response.data));
      })
      .catch(error => console.error('Error fetching medical history:', error));
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

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{width: '1200px'}}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{maxWidth: '140px'}}/>
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
          <button type="submit" className="btn btn-primary">Guardar</button>
          <Antecedentes antecedentes={antecedentesMedicos}/>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecord;