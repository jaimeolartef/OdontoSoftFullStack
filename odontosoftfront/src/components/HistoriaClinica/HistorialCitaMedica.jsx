import ReadOnlyPaciente from "../HistoriaClinica/ReadOnlyPaciente";
import TextArea from "./TextArea";
import React, {useEffect, useState, useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Logo from "../../resource/LogoNegro.png";
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
import showMessage from "../../util/UtilMessage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {apiGet, apiPost} from "../apiService";

const HistorialCitaMedica = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const patient = useMemo(() => {
    return location.state?.patient || {};
  }, [location.state]);

  // Modificación: Verificar si el acceso viene desde HistoriaClinica
  // Si viene de HistoriaClinica o si readOnly está establecido, siempre será true
  const readOnly = useMemo(() => {
    // Verificamos si el paciente tiene idHistoriaClinica, lo que indica
    // que viene de HistoriaClinica.jsx
    if (location.state?.patient?.idHistoriaClinica) {
      return true;
    }
    // De lo contrario, respetamos el valor de readOnly que se pasa
    return location.state?.readOnly || false;
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
    observacionanafunc: '',
    idusuariocreacion: '',
    fechacreacion: '',
    observacion: '',
    atmmusculatura: true,
    habilitado: true,
    antecedentepacientes: [],
    habitopacientes: [],
    signovitals: [],
    analisisfuncionals: [],
    examenestomatologicos: [],
    diagnosticos: [],
    ayudadiagnosticas: []
  });

  const handleSubmit = async (e) => {
    let usuario = sessionStorage.getItem('username');
    e.preventDefault();
    if (formMedicalHistory.idHistoriaClinica) {
      formMedicalHistory.idusuariomodificacion = usuario;
      formMedicalHistory.fechamodificacion = new Date().toISOString();
    } else {
      formMedicalHistory.idusuariocreacion = usuario;
      formMedicalHistory.fechacreacion = new Date().toISOString();
    }

    try {
      const response = await apiPost('/historiaClinica/crear', formMedicalHistory);
      showMessage('success', 'La cita médica se guardó con éxito');
      console.log("Datos actualizados:", response);

      // Obtener el ID de la Cita Médica del response si es nueva
      const idHistoriaClinica = formMedicalHistory.idHistoriaClinica || response.id;

      // Recargar la Cita Médica con los datos actualizados
      if (idHistoriaClinica) {
        LoadMedicalRecord(idHistoriaClinica);
        console.log("Recargando cita médica con ID:", idHistoriaClinica);
      }
    } catch (error) {
      showMessage('error', 'Error al guardar la cita médica');
    }
  }

  // Función para mapear los datos de la Cita Médica
  const LoadMedicalRecord = async (idHistoriaClinica) => {
    try {
      const response = await apiGet(`/historiaClinica/consultar/${idHistoriaClinica}`);
      console.log("Cita médica recargada:", response);

      // Actualizar el estado con los datos obtenidos
      setFormMedicalHistory(mapMedicalHistory(response));
    } catch (error) {
      console.error('Error al recargar la cita médica:', error);
      showMessage('error', 'Error al recargar los datos');
    }
  };

  const mapMedicalHistory = (data) => {
    const mappedData = {
      idHistoriaClinica: data.id || '',
      idPaciente: data.idpaciente || '',
      motivoConsulta: data.motivoconsulta || '',
      enfermedadActual: data.enfermedadactual || '',
      observacionAntec: data.observacionantec || '',
      observacionantecodon: data.observacionantecodon || '',
      observacion: data.observacion || '',
      observacionanafunc: data.observacionanafunc || '',
      idusuariocreacion: data.idusuariocreacion || '',
      fechacreacion: data.fechacreacion || '',
      atmmusculatura: data.atmmusculatura || true,
      habilitado: data.habilitado || true,
      antecedentepacientes: data.antecedentepacientes || [],
      habitopacientes: data.habitopacientes || [],
      signovitals: data.signovitals || [],
      analisisfuncionals: data.analisisfuncionals || [],
      examenestomatologicos: data.examenestomatologicos || [],
      odontogramas: data.odontogramas || [],
      diagnosticos: data.diagnosticos || [],
      ayudadiagnosticas: data.ayudadiagnosticas || []
    };
    return mappedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      setFormPatient(prev => ({
        ...prev,
        idHistoriaClinica: patient.idHistoriaClinica || '',
        idPaciente: patient.id || ''
      }));
    };
    fetchData();
  }, [patient]);

  useEffect(() => {
    const fetchData = async () => {
      if (formPatient.idPaciente && formPatient.idHistoriaClinica && readOnly) {
        try {
          const response = await apiGet(`/historiaClinica/consultar/${patient.idHistoriaClinica}`);
          console.log("Historia clínica inicia web:", response);
          setFormMedicalHistory(mapMedicalHistory(response));
        } catch (error) {
          showMessage('error', 'Error al cargar la historia clínica');
        }
      } else {
        setFormMedicalHistory(mapMedicalHistory({idpaciente: formPatient.idPaciente}));
      }
    };
    fetchData();
  }, [formPatient.idPaciente]);

  const handleMedicalRecordClick = (idHistoriaClinica) => {
    console.log('readOnly', readOnly);
    navigate('/odontograma', { state: { idHistoriaClinica: idHistoriaClinica, readOnly } });
  };

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
          <h1>Cita Médica Odontológica</h1>
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
                   if (!formMedicalHistory.idHistoriaClinica) {
                     showMessage('warning', 'Debe guardar la cita médica antes de ver el odontograma');
                     return;
                   }
                   e.stopPropagation();
                   handleMedicalRecordClick(formMedicalHistory.idHistoriaClinica);
                 }}
                 data-tooltip-id="tooltip" data-tooltip-content="Ver Odontograma"/>
          </div>
          <Tooltip id="tooltip"/>
          <div className="espacio"/>
          <TextArea label="Motivo consulta"
                    name="motivoConsulta"
                    value={formMedicalHistory.motivoConsulta || ''}
                    onChange={handleInputChange}
                    readOnly={readOnly}/>
          <TextArea label="Enfermedad actual"
                    name="enfermedadActual"
                    value={formMedicalHistory.enfermedadActual || ''}
                    onChange={handleInputChange}
                    readOnly={readOnly}/>
          <div className="espacio"/>
          <Antecedentes formMedicalHistory={formMedicalHistory} readOnly={readOnly}/>
          <div className="espacio"/>
          <TextArea label="Observación antecedentes"
                    name="observacionAntec"
                    value={formMedicalHistory.observacionAntec || ''}
                    onChange={handleInputChange}
                    readOnly={readOnly}/>
          <div className="espacio"/>
          <AntecedentesOdont formMedicalHistory={formMedicalHistory} readOnly={readOnly}/>
          <div className="espacio"/>
          <TextArea label="Observación antecedentes odontológicos"
                    name="observacionantecodon"
                    value={formMedicalHistory.observacionantecodon || ''}
                    onChange={handleInputChange}
                    readOnly={readOnly}/>
          <div className="espacio"/>
          <Habitos formMedicalHistory={formMedicalHistory} readOnly={readOnly}/>
          <div className="espacio"/>
          <TextArea label="Observación"
                    name="observacion"
                    value={formMedicalHistory.observacion || ''}
                    onChange={handleInputChange}
                    readOnly={readOnly}/>
          <div className="espacio"/>
          <SignosVitales formMedicalHistory={formMedicalHistory} setFormMedicalHistory={setFormMedicalHistory}
                         readOnly={readOnly}/>
          <div className="espacio"/>
          <AnalisisFuncional formMedicalHistory={formMedicalHistory} setFormMedicalHistory={setFormMedicalHistory}
                             readOnly={readOnly}/>
          <div className="espacio"/>
          <TextArea label="Observación"
                    name="observacionanafunc"
                    value={formMedicalHistory.observacionanafunc || ''}
                    onChange={handleInputChange}
                    readOnly={readOnly}/>
          <div className="espacio"/>
          <ExamenEstomatologico formMedicalHistory={formMedicalHistory} setFormMedicalHistory={setFormMedicalHistory}
                                readOnly={readOnly}/>
          <div className="espacio"/>
          <Diagnosticos formMedicalHistory={formMedicalHistory} setFormMedicalHistory={setFormMedicalHistory}
                        readOnly={readOnly}/>
          <div className="espacio"/>
          <AyudasDiagnostico formMedicalHistory={formMedicalHistory} setFormMedicalHistory={setFormMedicalHistory}
                             readOnly={readOnly}/>
          <div className="espacio"/>
          <div className="d-flex justify-content-between">
            {!readOnly && <button type="submit" className="btn btn-primary" disabled={readOnly}>Guardar</button>}
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1, { state: location.state })}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HistorialCitaMedica;