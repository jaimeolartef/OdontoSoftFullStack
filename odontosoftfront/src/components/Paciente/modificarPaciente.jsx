import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modificarPaciente.css';
import '../../App.css';
import Logo from '../../resource/LogoNegro.png';
import axios from "axios";
import config from '../../config';
import showMessage from "../../util/UtilMessage";

const ModificarPaciente = () => {
  const location = useLocation();
  const usuario = localStorage.getItem('username');
  const navigate = useNavigate();
  const { id } = location.state || {};
  const [formData, setFormData] = useState({
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

  const updateHabilitado = () => {
    setFormData({
      ...formData,
      habilitado: !formData.habilitado
    });
  }

  useEffect(() => {
    if (id) {
      axios.get(`${config.baseURL}/pacientes/consultar/${id}`)
        .then(response => {
          const data = response.data;
          setFormData({
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
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    formData.idusuariocreacion = usuario;
    formData.fechacreacion = new Date().toISOString();
    e.preventDefault();
    let token = localStorage.getItem('jsonwebtoken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.put(`${config.baseURL}/pacientes/modificar`, formData, {
      validateStatus: function (status) {
        return status;
      }
    })
      .then(response => {
        if (response.status === 200) {
          showMessage('success', 'Paciente modificado con éxito');
          navigate('/consultarPac', { state: { redireccionadoModificar: true } });
        } else {
          showMessage('error', 'Error al modificar el paciente');
        }
      })
      .catch(error => {
        showMessage('error', 'Error al modificar el paciente');
      });
  };

  useEffect(() => {
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
      'use strict'

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
    })();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ width: '1500px' }}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{ maxWidth: '140px' }}/>
          <h1>Modificar Paciente</h1>
        </header>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <section className="mb-4">
            <h3>Información Personal</h3>
            <div className="espacio"/>
            <div>
            <span>
              <input
                name="habilitadopaciente"
                type="checkbox"
                checked={formData.habilitado}
                onChange={updateHabilitado} style={{marginLeft: '10px'}}/>
              {formData.habilitado && (<label style={{color: "green", fontWeight: 'bold'}}>Habilitado</label>)}
              {!formData.habilitado && (<label style={{color: "red", fontWeight: 'bold'}}>Inhabilitado</label>)}
            </span>
            </div>
            <div className="form-floating mb-3">
              <select className="form-select" name="idtipodocumento" value={formData.idtipodocumento}
                      onChange={handleChange} required>
                <option value="">Seleccionar...</option>
                <option value="C.C.">Cédula de ciudadanía</option>
                <option value="C.E.">Cédula de Extranjería</option>
                <option value="T.I.">Tarjeta de Identidad</option>
                <option value="R.C.">Registro Civil</option>
                <option value="P.S.">Pasaporte</option>
              </select>
              <label>Tipo de documento</label>
              <div className="invalid-feedback">
                Debe seleccionar un tipo de documento
              </div>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="documento" value={formData.documento}
                     onChange={handleChange} placeholder="Documento de Identidad" required/>
              <label>Número de documento de identidad</label>
              <div className="invalid-feedback">
                Debe ingresar un número de documento
              </div>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="primernombre" value={formData.primernombre}
                     onChange={handleChange} placeholder="Primer Nombre" required/>
              <label>Primer nombre</label>
              <div className="invalid-feedback">
                Debe ingresar un primer nombre
              </div>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="segundonombre" placeholder="Segundo Nombre"
                     value={formData.segundonombre} onChange={handleChange}/>
              <label>Segundo nombre</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="primerapellido" placeholder="Primer Apellido"
                     value={formData.primerapellido} onChange={handleChange} required/>
              <label>Primer apellido</label>
              <div className="invalid-feedback">
                Debe ingresar un primer apellido
              </div>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="segundoapellido" placeholder="Segundo Apellido"
                     value={formData.segundoapellido} onChange={handleChange}/>
              <label>Segundo apellido</label>
            </div>
            <div className="form-floating mb-3">
              <input type="date" className="form-control" name="fechanacimiento" placeholder="Fecha nacimiento"
                     value={formData.fechanacimiento} onChange={handleChange} required/>
              <label>Fecha de nacimiento</label>
              <div className="invalid-feedback">
                Debe ingresar una fecha de nacimiento
              </div>
            </div>
            <div className="form-floating mb-3">
              <select className="form-select" name="ciudadnacimiento" value={formData.ciudadnacimiento}
                      onChange={handleChange}>
                <option value="">Seleccionar...</option>
                <option value="Bucaramanga">Bucaramanga</option>
                <option value="Floridablanca">Floridablanca</option>
                <option value="Girón">Girón</option>
              </select>
              <label>Ciudad de nacimiento</label>
            </div>
            <div className="form-floating mb-3">
              <select className="form-select" name="genero" value={formData.genero} onChange={handleChange}>
                <option value="">Seleccionar...</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
              <label>Género</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="direccionresidencia"
                     value={formData.direccionresidencia} onChange={handleChange} placeholder="Directorio" required/>
              <label>Dirección de residencia</label>
              <div className="invalid-feedback">
                Debe ingresar una dirección de residencia
              </div>
            </div>
            <div className="form-floating mb-3">
              <select className="form-select" name="ciudadresidencia" value={formData.ciudadresidencia}
                      onChange={handleChange} required>
                <option value="">Seleccionar...</option>
                <option value="Bucaramanga">Bucaramanga</option>
                <option value="Floridablanca">Floridablanca</option>
              </select>
              <label>Ciudad de residencia</label>
              <div className="invalid-feedback">
                Debe seleccionar una ciudad de residencia
              </div>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="telefono" placeholder="Telefono"
                     value={formData.telefono} onChange={handleChange} required/>
              <label>Número de teléfono</label>
              <div className="invalid-feedback">
                Debe ingresar un número de teléfono
              </div>
            </div>
            <div className="form-floating mb-3">
              <select className="form-select" name="estadocivil" value={formData.estadocivil} onChange={handleChange}>
                <option value="">Seleccionar...</option>
                <option value="Soltero">Soltero</option>
                <option value="Casado">Casado</option>
                <option value="Divorciado">Divorciado</option>
                <option value="Unión Libre">Unión Libre</option>
                <option value="Otro">Otro</option>
              </select>
              <label>Estado civil</label>
            </div>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" name="correo" placeholder="Correo electronico"
                     value={formData.correo} onChange={handleChange} required/>
              <label>Correo electrónico</label>
              <div className="invalid-feedback">
                Debe ingresar un correo electrónico
              </div>
            </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" name="isRequiredCompanion"
                     checked={formData.isRequiredCompanion} onChange={handleChange}/>
              <label className="form-check-label">¿Requiere Acompañante?</label>
            </div>
          </section>
          {formData.isRequiredCompanion && (
            <section className="mb-4">
              <h3>Datos del acompañante</h3>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" name="nombreacompanante" placeholder="Nombre Acompañante"
                       value={formData.nombreacompanante} onChange={handleChange}
                       required={formData.isRequiredCompanion}/>
                <label>Nombre completo del acompañante</label>
                <div className="invalid-feedback">
                  Debe ingresar el nombre del acompañante
                </div>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" name="telefonoacompanante" value={formData.telefonoacompanante} onChange={handleChange} placeholder="Número Acompañante" required={formData.isRequiredCompanion}/>
                <label>Número de teléfono del acompañante</label>
                <div className="invalid-feedback">
                  Debe ingresar el número de teléfono del acompañante
                </div>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" name="parentescoacompanante" value={formData.parentescoacompanante} onChange={handleChange} placeholder="Parentesco Acompañante" required={formData.isRequiredCompanion}/>
                <label>Parentesco</label>
                <div className="invalid-feedback">
                  Debe ingresar el parentesco del acompañante
                </div>
              </div>
            </section>
          )}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModificarPaciente;