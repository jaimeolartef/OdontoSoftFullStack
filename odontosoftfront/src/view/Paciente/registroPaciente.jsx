import React, { useState } from 'react';
import './registroPaciente.css';
import '../../App.css';
import Logo from '../../resource/LogoNegro.png';
import axios from "axios";
import config from '../../config';

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
    parentescoacompanante: '',
    codigoValidacion: '',
    mensajeValidacion: ''
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
    parentescoacompanante: '',
    codigoValidacion: '',
    mensajeValidacion: ''
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
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.post(`${config.baseURL}/pacientes/crear`, formData,{
        validateStatus: function (status) {
          return status;
        }
      })
        .then(response => {
          console.log('Response: ', response.data);
          if (response.status === 201) {
            alert('Paciente registrado con éxito');
            resetForm();
          }  else if (response.status === 400 && response.data.codigoValidacion === '400') {
            alert(response.data.mensajeValidacion);
          }
        })
  };

  return (
    <div className="medical-form-container">
      <header>
        <img src={Logo} alt="Logo" className="logo"/>
        <h1>Registrar Paciente</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <section className="personal-information">
          <h3>Información Personal</h3>
          <div className="input-box">
            <div className="espacio"/>
            <select name="idtipodocumento" value={formData.idtipodocumento} onChange={handleChange} required>
              <option value="">Seleccionar...</option>
              <option value="C.C.">Cédula de ciudadanía</option>
              <option value="C.E.">Cédula de Extranjería</option>
              <option value="T.I.">Tarjeta de Identidad</option>
              <option value="R.C.">Registro Civil</option>
              <option value="P.S.">Pasaporte</option>
            </select>
            <label><span className="required-field">* </span>Tipo de documento</label>
          </div>
          <div className="input-box">
            <input type="text" name="documento" value={formData.documento} onChange={handleChange} required/>
            <label><span className="required-field">* </span>Número de documento de identidad</label>
          </div>
          <div className="input-box">
            <input type="text" name="primernombre" value={formData.primernombre} onChange={handleChange} required/>
            <label><span className="required-field">* </span>Primer nombre</label>
          </div>
          <div className="input-box">
            <input type="text" name="segundonombre" value={formData.segundonombre} onChange={handleChange} />
            <label><span className="required-field">  </span>Segundo nombre</label>
          </div>
          <div className="input-box">
            <input type="text" name="primerapellido" value={formData.primerapellido} onChange={handleChange} required/>
            <label><span className="required-field">* </span>Primer apellido</label>
          </div>
          <div className="input-box">
            <input type="text" name="segundoapellido" value={formData.segundoapellido} onChange={handleChange}/>
            <label><span className="required-field">  </span>Segundo apellido</label>
          </div>
          <div className="input-box">
            <input type="date" name="fechanacimiento" value={formData.fechanacimiento} onChange={handleChange}
                   required/>
            <label><span className="required-field">* </span>Fecha de nacimiento</label>
          </div>
          <div className="input-box">
            <select name="ciudadnacimiento" value={formData.ciudadnacimiento} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="Bucaramanga">Bucaramanga</option>
              <option value="Floridablanca">Floridablanca</option>
              <option value="Girón">Girón</option>
            </select>
            <label><span className="required-field">  </span>Ciudad de nacimiento</label>
          </div>
          <div className="input-box">
            <select name="genero" value={formData.genero} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
            <label><span className="required-field">  </span>Genero</label>
          </div>
          <div className="input-box">
            <input type="text" name="direccionresidencia" value={formData.direccionresidencia} onChange={handleChange} required/>
            <label><span className="required-field">* </span>Dirección de residencia</label>
          </div>
          <div className="input-box">
            <select name="ciudadresidencia" value={formData.ciudadresidencia} onChange={handleChange} required>
              <option value="">Seleccionar...</option>
              <option value="Bucaramanga">Bucaramanga</option>
              <option value="Floridablanca">Floridablanca</option>
            </select>
            <label><span className="required-field">  </span>Ciudad de residencia</label>
          </div>
          <div className="input-box">
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required/>
            <label><span className="required-field">* </span>Número de teléfono</label>
          </div>
          <div className="input-box">
            <select name="estadocivil" value={formData.estadocivil} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="Soltero">Soltero</option>
              <option value="Casado">Casado</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Unión Libre">Unión Libre</option>
              <option value="Otro">Otro</option>
            </select>
            <label><span className="required-field">  </span>Estado civil</label>
          </div>
          <div className="input-box">
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} required/>
            <label><span className="required-field">  </span>Correo electrónico</label>
          </div>
          <div>
            <label>¿Requiere Acompañante? </label>
            <input type="checkbox" name="isRequiredCompanion" checked={formData.isRequiredCompanion}
                   onChange={handleChange}/>
          </div>
        </section>
        <section className="emergency-contact-details">
          {formData.isRequiredCompanion && (
            <div>
              <h3>Datos del acompañante</h3>
              <div className="espacio"/>
              <div className="input-box">
                <input type="text" name="nombreacompanante" value={formData.nombreacompanante}
                       onChange={handleChange} required={formData.isRequiredCompanion}/>
                <label><span className="required-field">* </span>Nombre completo del acompañante</label>
              </div>
              <div className="input-box">
                <input type="text" name="telefonoacompanante" value={formData.telefonoacompanante}
                       onChange={handleChange} required={formData.isRequiredCompanion}/>
                <label><span className="required-field">* </span>Número de teléfono del acompañante</label>
              </div>
              <div className="input-box">
                <input type="text" name="parentescoacompanante" value={formData.parentescoacompanante}
                       onChange={handleChange} required={formData.isRequiredCompanion}/>
                <label><span className="required-field">* </span>Parentesco</label>
              </div>
            </div>
          )}
        </section>
        <button type="submit" className="btn">Guardar</button>
      </form>
    </div>
  );
};

export default RegistroPaciente;
