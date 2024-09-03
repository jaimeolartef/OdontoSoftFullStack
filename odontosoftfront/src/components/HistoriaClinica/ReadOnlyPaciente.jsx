import React, {useEffect, useState} from 'react';
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


  useEffect(() => {
    console.log('idPatient: ', idPatient);
    if (idPatient) {
      axios.get(`${config.baseURL}/pacientes/consultar/${idPatient}`)
        .then(response => {
          const data = response.data;
          setFormPatient({
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
            isRequiredCompanion: data.nombreacompanante !== null && data.nombreacompanante !== "",
            nombreacompanante: data.nombreacompanante || '',
            telefonoacompanante: data.telefonoacompanante || '',
            parentescoacompanante: data.parentescoacompanante || '',
            habilitado: data.habilitado === 'true' || false
          });
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
        <h1>Información del Paciente</h1>
      </header>
      <section className="personal-information">
        <h3>Información Personal</h3>
        <div className="espacio"/>
        <div>
          <span>
            <input
              name="habilitadopaciente"
              type="checkbox"
              checked={formData.habilitado}
              readOnly style={{marginLeft: '10px'}}/>
                {formData.habilitado && (<label style={{color: "green", fontWeight: 'bold'}}>Habilitado</label>)}
                {!formData.habilitado && (<label style={{color: "red", fontWeight: 'bold'}}>Inhabilitado</label>)}
          </span>
        </div>
        <div className="input-box">
          <select name="idtipodocumento" value={formData.idtipodocumento} readOnly>
            <option value="C.C.">Cédula de ciudadanía</option>
            <option value="C.E.">Cédula de Extranjería</option>
            <option value="T.I.">Tarjeta de Identidad</option>
            <option value="R.C.">Registro Civil</option>
            <option value="P.S.">Pasaporte</option>
          </select>
          <label><span className="required-field">* </span>Tipo de documento</label>
        </div>
        <div className="input-box">
          <input type="text" name="documento" value={formData.documento} readOnly/>
          <label><span className="required-field">* </span>Número de documento de identidad</label>
        </div>
        <div className="input-box">
          <input type="text" name="primernombre" value={formData.primernombre} readOnly/>
          <label><span className="required-field">* </span>Primer nombre</label>
        </div>
        <div className="input-box">
          <input type="text" name="segundonombre" value={formData.segundonombre} readOnly/>
          <label><span className="required-field">  </span>Segundo nombre</label>
        </div>
        <div className="input-box">
          <input type="text" name="primerapellido" value={formData.primerapellido} readOnly/>
          <label><span className="required-field">* </span>Primer apellido</label>
        </div>
        <div className="input-box">
          <input type="text" name="segundoapellido" value={formData.segundoapellido} readOnly/>
          <label><span className="required-field">  </span>Segundo apellido</label>
        </div>
        <div className="input-box">
          <input type="date" name="fechanacimiento" value={formData.fechanacimiento} readOnly/>
          <label><span className="required-field">* </span>Fecha de nacimiento</label>
        </div>
        <div className="input-box">
          <select name="ciudadnacimiento" value={formData.ciudadnacimiento} readOnly>
            <option value="Bucaramanga">Bucaramanga</option>
            <option value="Floridablanca">Floridablanca</option>
            <option value="Girón">Girón</option>
          </select>
          <label><span className="required-field">  </span>Ciudad de nacimiento</label>
        </div>
        <div className="input-box">
          <select name="genero" value={formData.genero} readOnly>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
          <label><span className="required-field">  </span>Genero</label>
        </div>
        <div className="input-box">
          <input type="text" name="direccionresidencia" value={formData.direccionresidencia} readOnly/>
          <label><span className="required-field">* </span>Dirección de residencia</label>
        </div>
        <div className="input-box">
          <select name="ciudadresidencia" value={formData.ciudadresidencia} readOnly>
            <option value="Bucaramanga">Bucaramanga</option>
            <option value="Floridablanca">Floridablanca</option>
          </select>
          <label><span className="required-field">  </span>Ciudad de residencia</label>
        </div>
        <div className="input-box">
          <input type="text" name="telefono" value={formData.telefono} readOnly/>
          <label><span className="required-field">* </span>Número de teléfono</label>
        </div>
        <div className="input-box">
          <select name="estadocivil" value={formData.estadocivil} readOnly>
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Unión Libre">Unión Libre</option>
            <option value="Otro">Otro</option>
          </select>
          <label><span className="required-field">  </span>Estado civil</label>
        </div>
        <div className="input-box">
          <input type="email" name="correo" value={formData.correo} readOnly/>
          <label><span className="required-field">  </span>Correo electrónico</label>
        </div>
        <div>
          <label>¿Requiere Acompañante? </label>
          <input type="checkbox" name="isRequiredCompanion" checked={formData.isRequiredCompanion} readOnly/>
        </div>
      </section>
      <section className="emergency-contact-details">
        {formData.isRequiredCompanion && (
          <div>
            <h3>Datos del acompañante</h3>
            <div className="espacio"/>
            <div className="input-box">
              <input type="text" name="nombreacompanante" value={formData.nombreacompanante} readOnly/>
              <label><span className="required-field">* </span>Nombre completo del acompañante</label>
            </div>
            <div className="input-box">
              <input type="text" name="telefonoacompanante" value={formData.telefonoacompanante} readOnly/>
              <label><span className="required-field">* </span>Número de teléfono del acompañante</label>
            </div>
            <div className="input-box">
              <input type="text" name="parentescoacompanante" value={formData.parentescoacompanante} readOnly/>
              <label><span className="required-field">* </span>Parentesco</label>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ReadOnlyPaciente;