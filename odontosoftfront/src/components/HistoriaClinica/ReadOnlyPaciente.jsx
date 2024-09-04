import React, { useEffect, useState } from 'react';
import '../HistoriaClinica/ReadOnlyPaciente.css';
import '../../App.css';
import Logo from '../../resource/LogoNegro.png';
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
    habilitado: data.habilitado === 'true'
  });

  useEffect(() => {
    console.log('idPatient readonlypatient: ', idPatient);
    if (idPatient) {
      axios.get(`${config.baseURL}/pacientes/consultar/${idPatient}`)
        .then(response => {
          setFormPatient(mapPatientData(response.data));
        })
        .catch(error => {
          console.error('Error fetching patient data:', error);
        });
    }
  }, [idPatient]);


return (
  <div className="medical-form-container">
    <header>
      <img src={Logo} alt="Logo" className="logo"/>
      <h1>Historia Clínica Odontológica</h1>
    </header>
    <section className="personal-information">
      <h3>Información Personal</h3>
      <div className="espacio"/>
      <table className="patient-info-table">
        <tbody>
          <tr>
            <td><label className="bold-label">Tipo de documento</label></td>
            <td><label>{formData.idtipodocumento}</label></td>
            <td><label className="bold-label">Número de documento de identidad</label></td>
            <td><label>{formData.documento}</label></td>
          </tr>
          <tr>
            <td><label className="bold-label">Primer nombre</label></td>
            <td><label>{formData.primernombre}</label></td>
            <td><label className="bold-label">Segundo nombre</label></td>
            <td><label>{formData.segundonombre}</label></td>
          </tr>
          <tr>
            <td><label className="bold-label">Primer apellido</label></td>
            <td><label>{formData.primerapellido}</label></td>
            <td><label className="bold-label">Segundo apellido</label></td>
            <td><label>{formData.segundoapellido}</label></td>
          </tr>
          <tr>
            <td><label className="bold-label">Fecha de nacimiento</label></td>
            <td><label>{formData.fechanacimiento}</label></td>
            <td><label className="bold-label">Ciudad de nacimiento</label></td>
            <td><label>{formData.ciudadnacimiento}</label></td>
          </tr>
          <tr>
            <td><label className="bold-label">Genero</label></td>
            <td><label>{formData.genero}</label></td>
            <td><label className="bold-label">Dirección de residencia</label></td>
            <td><label>{formData.direccionresidencia}</label></td>
          </tr>
          <tr>
            <td><label className="bold-label">Ciudad de residencia</label></td>
            <td><label>{formData.ciudadresidencia}</label></td>
            <td><label className="bold-label">Número de teléfono</label></td>
            <td><label>{formData.telefono}</label></td>
          </tr>
          <tr>
            <td><label className="bold-label">Estado civil</label></td>
            <td><label>{formData.estadocivil}</label></td>
            <td><label className="bold-label">Correo electrónico</label></td>
            <td><label>{formData.correo}</label></td>
          </tr>
          <tr>
            <td><label className="bold-label">Nombre completo del acompañante</label></td>
            <td><label>{formData.nombreacompanante}</label></td>
            <td><label className="bold-label">Número de teléfono del acompañante</label></td>
            <td><label>{formData.telefonoacompanante}</label></td>
          </tr>
          <tr>
            <td><label className="bold-label">Parentesco</label></td>
            <td><label>{formData.parentescoacompanante}</label></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
);
};

export default ReadOnlyPaciente;