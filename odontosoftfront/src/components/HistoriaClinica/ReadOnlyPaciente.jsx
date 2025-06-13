import React, { useEffect, useState } from 'react';
import '../HistoriaClinica/ReadOnlyPaciente.css';
import '../../App.css';
import { apiGet } from '../apiService';

const ReadOnlyPaciente = ({ idPatient }) => {
  const [formData, setFormPatient] = useState({
    id: '',
    idtipodocumento: '',
    documento: '',
    primernombre: '',
    segundonombre: '',
    primerapellido: '',
    segundoapellido: '',
    fechanacimiento: '',
    ciudadnacimiento: '',
    genero: '',
    direccionresidencia: '',
    ciudadresidencia: '',
    telefono: '',
    estadocivil: '',
    correo: '',
    isRequiredCompanion: false,
    nombreacompanante: '',
    telefonoacompanante: '',
    parentescoacompanante: '',
    habilitado: true
  });

  const mapPatientData = (data) => ({
    id: data.id || '',
    idtipodocumento: data.idtipodocumento || '',
    documento: data.documento || '',
    primernombre: data.primernombre || '',
    segundonombre: data.segundonombre || '',
    primerapellido: data.primerapellido || '',
    segundoapellido: data.segundoapellido || '',
    fechanacimiento: data.fechanacimiento || '',
    ciudadnacimiento: data.ciudadnacimiento || '',
    genero: data.genero || '',
    direccionresidencia: data.direccionresidencia || '',
    ciudadresidencia: data.ciudadresidencia || '',
    telefono: data.telefono || '',
    estadocivil: data.estadocivil || '',
    correo: data.correo || '',
    nombreacompanante: data.nombreacompanante || '',
    telefonoacompanante: data.telefonoacompanante || '',
    parentescoacompanante: data.parentescoacompanante || '',
    idHistoriaClinica: data.idHistoriaClinica || '',
    habilitado: data.habilitado === 'true'
  });

  useEffect(() => {
    if (idPatient) {
      apiGet(`/pacientes/consultar/${idPatient}`)
        .then(response => {
          setFormPatient(mapPatientData(response));
        })
        .catch(error => {
          console.error('Error fetching patient data:', error);
        });
    }
  }, [idPatient]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Información paciente</h2>
      </div>
      <div className="card-body">
        <div className="espacio"/>
        <div className="espacio"/>
        <div className="row">
          <div className="col-md-6">
            <label className="bold-label">Tipo de documento</label>
            <div>{formData.idtipodocumento}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Número de documento de identidad</label>
            <div>{formData.documento}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Primer nombre</label>
            <div>{formData.primernombre}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Segundo nombre</label>
            <div>{formData.segundonombre}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Primer apellido</label>
            <div>{formData.primerapellido}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Segundo apellido</label>
            <div>{formData.segundoapellido}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Fecha de nacimiento</label>
            <div>{formData.fechanacimiento}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Ciudad de nacimiento</label>
            <div>{formData.ciudadnacimiento}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Genero</label>
            <div>{formData.genero}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Dirección de residencia</label>
            <div>{formData.direccionresidencia}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Ciudad de residencia</label>
            <div>{formData.ciudadresidencia}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Número de teléfono</label>
            <div>{formData.telefono}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Estado civil</label>
            <div>{formData.estadocivil}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Correo electrónico</label>
            <div>{formData.correo}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Nombre completo del acompañante</label>
            <div>{formData.nombreacompanante}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Número de teléfono del acompañante</label>
            <div>{formData.telefonoacompanante}</div>
          </div>
          <div className="col-md-6">
            <label className="bold-label">Parentesco</label>
            <div>{formData.parentescoacompanante}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOnlyPaciente;