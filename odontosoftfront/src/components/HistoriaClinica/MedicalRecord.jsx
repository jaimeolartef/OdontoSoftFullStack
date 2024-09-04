import ReadOnlyPaciente from "../HistoriaClinica/ReadOnlyPaciente";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//TODO 1: Agregar la auditoria al registro de pacientes usuario y fecha de creacion y modificacion
//TODO 2: Agregar un enumerado con las respuestas de los antecedentes medicos

const MedicalRecord = () => {
  const location = useLocation();
  const { idPatient } = location.state || {};
  const [formPatient, setFormPatient] = useState({
    idPatient: ''
  });

  useEffect(() => {
    console.log('idPatient medical record:', idPatient);
    if (idPatient) {
      setFormPatient({
        idPatient: idPatient || ''
      });
    }
  }, [idPatient]);

  return (
    <div className="parent-component">
      <h2>Información de la Persona</h2>
      <ReadOnlyPaciente idPatient={formPatient.idPatient} />
    </div>
  );
};

export default MedicalRecord;