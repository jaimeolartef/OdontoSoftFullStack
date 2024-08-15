import React, { useState } from 'react';
import './registroPaciente.css';
import Logo from '../../resource/LogoNegro.png';
import axios from "axios";

const RegistroPaciente = () => {
  const [formData, setFormData] = useState({
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
    parentescoacompanante: ''
  });

  const initialFormData = {
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
    parentescoacompanante: ''
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const resetForm = () => {
    setFormData(initialFormData);
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
            alert('Paciente registrado con éxito');
            resetForm();
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
              <option value="C.E.">Cédula de Extranjería</option>
              <option value="T.I.">Tarjeta de Identidad</option>
              <option value="R.C.">Registro Civil</option>
              <option value="P.S.">Pasaporte</option>
            </select>
          </label>
          <label>
          Número de documento de identidad:
            <input type="text" name="documento" value={formData.documento} onChange={handleChange} required/>
          </label>
          <label>
            Primer nombre:
            <input type="text" name="primernombre" value={formData.primernombre} onChange={handleChange} required/>
          </label>
          <label>
            Segundo nombre:
            <input type="text" name="segundonombre" value={formData.segundonombre} onChange={handleChange}/>
          </label>
          <label>
            Primer apellido:
            <input type="text" name="primerapellido" value={formData.primerapellido} onChange={handleChange} required/>
          </label>
          <label>
            Segundo apellido:
            <input type="text" name="segundoapellido" value={formData.segundoapellido} onChange={handleChange}/>
          </label>
          <label>
            Fecha de nacimiento:
            <input type="date" name="fechanacimiento" value={formData.fechanacimiento} onChange={handleChange} required/>
          </label>
          <label>
            Ciudad de nacimiento:
            <select name="ciudadnacimiento" value={formData.ciudadnacimiento} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="Bucaramanga">Bucaramanga</option>
              <option value="Floridablanca">Floridablanca</option>
              <option value="Girón">Girón</option>
            </select>
          </label>
          <label>
            Genero:
            <select name="genero" value={formData.genero} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </label>
          <label>
            Dirección de residencia:
            <input type="text" name="direccionresidencia" value={formData.direccionresidencia} onChange={handleChange} required/>
          </label>
          <label>
            Ciudad de residencia:
            <select name="ciudadresidencia" value={formData.ciudadresidencia} onChange={handleChange} required>
              <option value="">Seleccionar...</option>
              <option value="Bucaramanga">Bucaramanga</option>
              <option value="Floridablanca">Floridablanca</option>
            </select>
          </label>
          <label>
            Número de teléfono:
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required/>
          </label>
          <label>
            Estado civil:
            <select name="estadocivil" value={formData.estadocivil} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="Soltero">Soltero</option>
              <option value="Casado">Casado</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Unión Libre">Unión Libre</option>
              <option value="Otro">Otro</option>
            </select>
          </label>
          <label>
            Correo electrónico:
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} required/>
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
                <input type="text" name="nombreacompanante" value={formData.nombreacompanante}
                       onChange={handleChange} required={formData.isRequiredCompanion}/>
              </label>
              <label>
                Número de teléfono del acompañante:
                <input type="text" name="telefonoacompanante" value={formData.telefonoacompanante} onChange={handleChange} required={formData.isRequiredCompanion}/>
              </label>
              <label>
                Parentesco del acompañante:
                <input type="text" name="parentescoacompanante" value={formData.parentescoacompanante} onChange={handleChange} required={formData.isRequiredCompanion}/>
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
