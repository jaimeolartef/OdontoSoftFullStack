import React, { useState } from 'react';
import './registroPaciente.css';
import Logo from '../../resource/LogoNegro.png';
import sha256 from "crypto-js/sha256";
import axios from "axios";

const RegistroPaciente = () => {
  const [formData, setFormData] = useState({
    idtipodocumento: '',
    documentNumber: '',
    firstName: '',
    secondName: '',
    firstLastName: '',
    secondLastName: '',
    dateOfBirth: '',
    cityOfBirth: '',
    gender: '',
    residenceAddress: '',
    cityOfResidence: '',
    phoneNumber: '',
    maritalStatus: '',
    email: '',
    isRequiredCompanion: false,
    emergencyContactName: '',
    emergencyHomeNumber: '',
    emergencyRelationship: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    let token = localStorage.getItem('jsonwebtoken');
    console.log('Token: ', token);
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.post('http://localhost:8080/pacientes/crear', formData)
        .then(response => {
          if (response.data) {
            console.log('Paciente registrado con éxito. ' + response.data);
          }  else {
            alert('Error al registrar el paciente. Contacte al administrador del sistema');
          }
        }).catch(error => {
        alert('Error al registrar el paciente. Contacte al administrador del sistema');
      })
    } catch (error) {
      alert('Error ' + error);
    }
  };

  return (
    <div className="medical-form-container">
      <header>
        <img src={Logo} alt="Logo" />
        <h1>Registrar Paciente</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <section className="personal-information">
          <h3>Información Personal</h3>
          <label>
            Tipo de documento:
            <select name="idtipodocumento" value={formData.idtipodocumento} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="C.C.">Cédula de ciudadanía</option>
              <option value="P.S.">Pasaporte</option>
            </select>
          </label>
          <label>
            Número de documento de identidad:
            <input type="text" name="documentNumber" value={formData.documentNumber} onChange={handleChange} required/>
          </label>
          <label>
            Primer nombre:
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required/>
          </label>
          <label>
            Segundo nombre:
            <input type="text" name="secondName" value={formData.secondName} onChange={handleChange}/>
          </label>
          <label>
            Primer apellido:
            <input type="text" name="firstLastName" value={formData.firstLastName} onChange={handleChange} required/>
          </label>
          <label>
            Segundo apellido:
            <input type="text" name="secondLastName" value={formData.secondLastName} onChange={handleChange}/>
          </label>
          <label>
            Fecha de nacimiento:
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required/>
          </label>
          <label>
            Ciudad de nacimiento:
            <select name="cityOfBirth" value={formData.cityOfBirth} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="Bucaramanga">Bucaramanga</option>
              <option value="Floridablanca">Floridablanca</option>
            </select>
          </label>
          <label>
            Genero:
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </label>
          <label>
            Dirección de residencia:
            <input type="text" name="residenceAddress" value={formData.residenceAddress} onChange={handleChange} required/>
          </label>
          <label>
            Ciudad de residencia:
            <select name="cityOfResidence" value={formData.cityOfResidence} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="Bucaramanga">Bucaramanga</option>
              <option value="Floridablanca">Floridablanca</option>
            </select>
          </label>
          <label>
            Número de teléfono:
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required/>
          </label>
          <label>
            Estado civil:
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="single">Soltero</option>
              <option value="married">Casado</option>
              <option value="divorced">Divorciado</option>
              <option value="divorced">Unión Libre</option>
              <option value="other">Otro</option>
            </select>
          </label>
          <label>
            Correo electrónico:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
          </label>
          <label>
            ¿Requiere Acompañante?
            <input type="checkbox" name="isRequiredCompanion" checked={formData.isRequiredCompanion}
                   onChange={handleChange}/>
          </label>
        </section>
        <section className="emergency-contact-details">
          {formData.isRequiredCompanion && (
            <>
              <h3>Datos del acompañante</h3>
              <label>
                Nombre completo del acompañante:
                <input type="text" name="emergencyContactName" value={formData.emergencyContactName}
                       onChange={handleChange} />
              </label>
              <label>
                Número de teléfono del acompañante:
                <input type="text" name="emergencyHomeNumber" value={formData.emergencyHomeNumber} onChange={handleChange} />
              </label>
              <label>
                Parentesco del acompañante:
                <input type="text" name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange} />
              </label>
            </>
          )}
        </section>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default RegistroPaciente;
