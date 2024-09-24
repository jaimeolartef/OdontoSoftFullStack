import ReadOnlyPaciente from "../HistoriaClinica/ReadOnlyPaciente";
import TextArea from "./TextArea";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../../resource/LogoNegro.png";
import config from "../../config";
import Antecedentes from "./Antecedentes";


const MedicalRecord = () => {
  const location = useLocation();
  const { patient } = location.state || {};
  const [formPatient, setFormPatient] = useState({
    idHistoriaClinica: '',
    idPaciente: '',
  });

  const [formMedicalHistory, setFormMedicalHistory] = useState({
    idHistoriaClinica: '',
    idPaciente: '',
    motivoConsulta: '',
    enfermedadActual: '',
    observacionAntec: ''
  });

  const [antecedentesMedicos, setAntecedentesMedicos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario:', formPatient, formMedicalHistory, antecedentesMedicos);
  }

  const mapMedicalHistory = (data) => ({
    idHistoriaClinica: data.id || '',
    idPatient: data.idpaciente || '',
    motivoConsulta: data.motivoconsulta || '',
    enfermedadActual: data.enfermedadactual || '',
    observacionAntec: data.observacionantec || ''
  });

  const mapAntecedentes = (data) => ({
    id: data.id || '',
    descripcion: data.descripcion || '',
    odontologico: data.odontologico || false,
    habilitado: data.habilitado || '',
    seleccionado: data.seleccionado || ''
  });

  useEffect(() => {
    axios.get(`${config.baseURL}/precedenthistory/get`)
      .then(response => {
        if (Array.isArray(response.data)) {
          const antecedentes = response.data.map(mapAntecedentes);
          setAntecedentesMedicos(antecedentes.filter(item => !item.odontologico));
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

  const handleObservacionAntec = (event) => {
    setFormPatient(prev => ({
      ...prev,
      observacionAntec: event.target.value
    }));
  };

  const handleAntecedenteChange = (antecedente, value) => {
    setAntecedentesMedicos(prev => {
      return prev.map(item =>
        item.id === antecedente.id ? {...item, seleccionado: value} : item
      );
    });
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
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecord;