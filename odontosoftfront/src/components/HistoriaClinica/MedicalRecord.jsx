import ReadOnlyPaciente from "../HistoriaClinica/ReadOnlyPaciente";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MedicalRecord = () => {
  const location = useLocation();
  const { idPatient } = location.state || {};
  const [formPatient, setFormPatient] = useState({
    idPatient: ''
  });

  useEffect(() => {
    console.log('idPatient: ', idPatient);
    if (idPatient) {
      setFormPatient({
        idPatient: idPatient || ''
      });
    }
  }, [idPatient]);

  return (
    <div className="parent-component">
      <h2>Información de la Persona</h2>
    </div>
  );
};

export default MedicalRecord;