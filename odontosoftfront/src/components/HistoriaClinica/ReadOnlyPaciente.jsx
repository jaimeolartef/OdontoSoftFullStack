import React, { useEffect, useState } from 'react';
import '../HistoriaClinica/ReadOnlyPaciente.css';
import '../../App.css';
import axios from "axios";
import config from "../../config";

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
    console.log('idPatient readonlypatient: ', idPatient);
    if (idPatient) {
      axios.get(`${config.baseURL}/pacientes/consultar/${idPatient}`)
        .then(response => {
          console.log('patient data:', response.data);
          setFormPatient(mapPatientData(response.data));
        })
        .catch(error => {
          console.error('Error fetching patient data:', error);
        });
    }
  }, [idPatient]);

  return (
    <section className="personal-information">
      <div className="espacio"/>
      <table className="patient-info-table">
        <thead>
        </thead>
        <tbody>
          <tr>
            <td className="col-3" data-label="Tipo de documento"><label className="bold-label">Tipo de documento</label></td>
            <td className="col-3" data-label="Tipo de documento"><label>{formData.idtipodocumento}</label></td>
            <td className="col-3" data-label="Número de documento de identidad"><label className="bold-label">Número de documento de identidad</label></td>
            <td className="col-3" data-label="Número de documento de identidad"><label>{formData.documento}</label></td>
          </tr>
          <tr>
            <td className="col-3" data-label="Primer nombre"><label className="bold-label">Primer nombre</label></td>
            <td className="col-3" data-label="Primer nombre"><label>{formData.primernombre}</label></td>
            <td className="col-3" data-label="Segundo nombre"><label className="bold-label">Segundo nombre</label></td>
            <td className="col-3" data-label="Segundo nombre"><label>{formData.segundonombre}</label></td>
          </tr>
          <tr>
            <td className="col-3" data-label="Primer apellido"><label className="bold-label">Primer apellido</label></td>
            <td className="col-3" data-label="Primer apellido"><label>{formData.primerapellido}</label></td>
            <td className="col-3" data-label="Segundo apellido"><label className="bold-label">Segundo apellido</label></td>
            <td className="col-3" data-label="Segundo apellido"><label>{formData.segundoapellido}</label></td>
          </tr>
          <tr>
            <td className="col-3" data-label="Fecha de nacimiento"><label className="bold-label">Fecha de nacimiento</label></td>
            <td className="col-3" data-label="Fecha de nacimiento"><label>{formData.fechanacimiento}</label></td>
            <td className="col-3" data-label="Ciudad de nacimiento"><label className="bold-label">Ciudad de nacimiento</label></td>
            <td className="col-3" data-label="Ciudad de nacimiento"><label>{formData.ciudadnacimiento}</label></td>
          </tr>
          <tr>
            <td className="col-3" data-label="Genero"><label className="bold-label">Genero</label></td>
            <td className="col-3" data-label="Genero"><label>{formData.genero}</label></td>
            <td className="col-3" data-label="Dirección de residencia"><label className="bold-label">Dirección de residencia</label></td>
            <td className="col-3" data-label="Dirección de residencia"><label>{formData.direccionresidencia}</label></td>
          </tr>
          <tr>
            <td className="col-3" data-label="Ciudad de residencia"><label className="bold-label">Ciudad de residencia</label></td>
            <td className="col-3" data-label="Ciudad de residencia"><label>{formData.ciudadresidencia}</label></td>
            <td className="col-3" data-label="Número de teléfono"><label className="bold-label">Número de teléfono</label></td>
            <td className="col-3" data-label="Número de teléfono"><label>{formData.telefono}</label></td>
          </tr>
          <tr>
            <td className="col-3" data-label="Estado civil"><label className="bold-label">Estado civil</label></td>
            <td className="col-3" data-label="Estado civil"><label>{formData.estadocivil}</label></td>
            <td className="col-3" data-label="Correo electrónico"><label className="bold-label">Correo electrónico</label></td>
            <td className="col-3" data-label="Correo electrónico"><label>{formData.correo}</label></td>
          </tr>
          <tr>
            <td className="col-3" data-label="Nombre completo del acompañante"><label className="bold-label">Nombre completo del acompañante</label></td>
            <td className="col-3" data-label="Nombre completo del acompañante"><label>{formData.nombreacompanante}</label></td>
            <td className="col-3" data-label="Número de teléfono del acompañante"><label className="bold-label">Número de teléfono del acompañante</label></td>
            <td className="col-3" data-label="Número de teléfono del acompañante"><label>{formData.telefonoacompanante}</label></td>
          </tr>
          <tr>
            <td className="col-3" data-label="Parentesco"><label className="bold-label">Parentesco</label></td>
            <td className="col-3" data-label="Parentesco"><label>{formData.parentescoacompanante}</label></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default ReadOnlyPaciente;