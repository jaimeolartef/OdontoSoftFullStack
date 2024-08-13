import React, { useState } from 'react';
import './registroPaciente.css';
import Logo from '../../resource/LogoNegro.png';

const RegistroPaciente = () => {
  const [formData, setFormData] = useState({
    documentType: '',
    documentNumber: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
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
            <select name="documentType" value={formData.documentType} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="id">Cédula de ciudadanía</option>
              <option value="passport">Pasaporte</option>
              <option value="other">Otro</option>
            </select>
          </label>
          <label>
            Número de documento de identidad:
            <input type="text" name="documentNumber" value={formData.documentNumber} onChange={handleChange} required/>
          </label>
          <label>
            Nombre completo:
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required/>
          </label>
          <label>
            Fecha de nacimiento:
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required/>
          </label>
          <label>
            Genero:
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label>
            Dirección:
            <input type="text" name="address" value={formData.address} onChange={handleChange} required/>
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
            <input type="checkbox" name="isRequiredCompanion" checked={formData.isRequiredCompanion} onChange={handleChange}/>
          </label>
        </section>
        <section className="emergency-contact-details">
          {formData.isRequiredCompanion && (
            <>
              <h3>Datos del acompañante</h3>
              <label>
                Nombre completo del acompañante:
                <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} />
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
