import ReadOnlyPaciente from "../HistoriaClinica/ReadOnlyPaciente";
import TextArea from "./TextArea";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../../resource/LogoNegro.png";
import config from "../../config";

//TODO 1: Agregar la auditoria al registro de pacientes usuario y fecha de creacion y modificacion
//TODO 2: Agregar un enumerado con las respuestas de los antecedentes medicos

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
    antecedentesMedicos: ''
  });

  const [formAntecedentesMedicos, setFormAntecedentesMedicos] = useState({
    id,
    descripcion,
    odontologico,
    habilitado
  });


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

  const mapAntecedentesMedicos = (data) => ({
    id: data.id || '',
    descripcion: data.descripcion || '',
    odontologico: data.odontologico || '',
    habilitado: data.habilitado || ''
  });

  useEffect(() => {
    console.log('Antecedentes: ', formAntecedentesMedicos);
    if (formAntecedentesMedicos) {
      axios.get(`${config.baseURL}/precedenthistory/get`+ formAntecedentesMedicos.id)
        .then(response => {
          console.log('medical history:', response.data);
          setFormAntecedentesMedicos(mapAntecedentesMedicos(response.data));
        })
        .catch(error => console.error('Error fetching medical history:', error));
    }

    if (patient) {
      setFormPatient(prev => ({
        ...prev,
        idHistoriaClinica: patient.idHistoriaClinica || '',
        idPatient: patient.id || ''
      }));

      console.log('id medical record:', patient.idHistoriaClinica);
      axios.get(`${config.baseURL}/historiaClinica/consultar/`+ patient.idHistoriaClinica)
        .then(response => {
          console.log('medical history:', response.data);
          setFormMedicalHistory(mapMedicalHistory(response.data));
        })
        .catch(error => console.error('Error fetching medical history:', error));
    }
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
        </form>
      </div>
    </div>
  );
};

export default MedicalRecord;