import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './registroPaciente.css';
import '../../App.css';
import Logo from '../../resource/LogoNegro.png';
import showMessage from "../../util/UtilMessage";
import {useNavigate} from "react-router-dom";
import {apiGet, apiPost} from '../apiService';

const RegistroPaciente = () => {
  const usuario = sessionStorage.getItem('username');
  const navigate = useNavigate();

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
    mensajeValidacion: '',
    idusuariocreacion: '',
    fechacreacion: '',
    habilitado: true
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
    mensajeValidacion: '',
    habilitado: true
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar documento único
    try {
      const pacientesPorDocumento = await apiGet('/pacientes/consultar', { queryParams: { documento: formData.documento } });
      if (pacientesPorDocumento && pacientesPorDocumento.length > 0) {
        showMessage('warning', 'Otro paciente ya se encuentra registrado con el número de documento ' + formData.documento);
        return;
      }
    } catch (error) {
      // Si el error es 404, significa que no existe, se puede continuar
      if (!error.message) {
        showMessage('error', 'Error validando documento');
        return;
      }
    }

    // Validar correo único
    try {
      const pacientesPorCorreo = await apiGet('/pacientes/consultar', { queryParams: { correo: formData.correo } });
      if (pacientesPorCorreo && pacientesPorCorreo.length > 0) {
        showMessage('warning', 'Otro paciente ya se encuentra registrado con correo electrónico ' + formData.correo);
        return;
      }
    } catch (error) {
      if (!error.message) {
        showMessage('error', 'Error validando correo');
        return;
      }
    }

    // Registrar paciente
    try {
      const dataToSend = {
        ...formData,
        idusuariocreacion: usuario,
        fechacreacion: new Date().toISOString()
      };
      const response = await apiPost('/pacientes/crear', dataToSend);

      let nombreCompleto = formData.primernombre + ' ' +
        (formData.segundonombre ? formData.segundonombre : '')
        + ' ' + formData.primerapellido + ' ' +
        (formData.segundoapellido ? formData.segundoapellido : '');

      const usuarioNuevo = {
        nombre: nombreCompleto,
        correo: formData.correo,
        clave: Math.random().toString(36).slice(-8),
        habilitado: true,
        codigo: formData.documento,
        idRol: 2
      };
      await registrarUsuario(usuarioNuevo);

      showMessage('success', 'Paciente registrado con éxito');
      navigate('/inicio'); // Regresa a la página anterior
    } catch (error) {
      if (error.message) {
        showMessage('error', error.message);
      } else {
        showMessage('error', 'Error al registrar paciente');
      }
    }
  };

  const registrarUsuario = async (usuarioNuevo) => {
    try {
      await apiPost('/user/signup', usuarioNuevo);
    } catch (error) {
      if (error.message) {
        showMessage('error', error.message);
      } else {
        showMessage('error', 'Error al registrar usuario');
      }
    }
  }

  useEffect(() => {
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
      'use strict'
      const forms = document.querySelectorAll('.needs-validation')
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
      <div className="card p-4" style={{width: '1200px'}}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{maxWidth: '140px'}}/>
          <h1>Registrar Paciente</h1>
        </header>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <section className="mb-4">
            <h3>Información Personal</h3>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <select className="form-select" name="idtipodocumento" value={formData.idtipodocumento}
                            onChange={handleChange} required>
                      <option value="">Seleccionar...</option>
                      //TODO: consumir API para obtener los tipos de documento
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
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input type="text" className="form-control" name="documento" value={formData.documento}
                           onChange={handleChange} placeholder="Documento de Identidad" required/>
                    <label>Número de documento de identidad</label>
                    <div className="invalid-feedback">
                      Debe ingresar un número de documento
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input type="text" className="form-control" name="primernombre" value={formData.primernombre}
                           onChange={handleChange} placeholder="Primer Nombre" required/>
                    <label>Primer nombre</label>
                    <div className="invalid-feedback">
                      Debe ingresar un primer nombre
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input type="text" className="form-control" name="segundonombre" placeholder="Segundo Nombre"
                           value={formData.segundonombre} onChange={handleChange}/>
                    <label>Segundo nombre</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input type="text" className="form-control" name="primerapellido" placeholder="Primer Apellido"
                           value={formData.primerapellido} onChange={handleChange} required/>
                    <label>Primer apellido</label>
                    <div className="invalid-feedback">
                      Debe ingresar un primer apellido
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input type="text" className="form-control" name="segundoapellido" placeholder="Segundo Apellido"
                           value={formData.segundoapellido} onChange={handleChange}/>
                    <label>Segundo apellido</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input type="date" className="form-control" name="fechanacimiento" placeholder="Fecha nacimiento"
                           value={formData.fechanacimiento} onChange={handleChange} required/>
                    <label>Fecha de nacimiento</label>
                    <div className="invalid-feedback">
                      Debe ingresar una fecha de nacimiento
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <select className="form-select" name="ciudadnacimiento" value={formData.ciudadnacimiento}
                            onChange={handleChange}>
                      <option value="">Seleccionar...</option>
                      <option value="Bucaramanga">Bucaramanga</option>
                      <option value="Floridablanca">Floridablanca</option>
                      <option value="Girón">Girón</option>
                    </select>
                    <label>Ciudad de nacimiento</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <select className="form-select" name="genero" value={formData.genero} onChange={handleChange}>
                      <option value="">Seleccionar...</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </select>
                    <label>Género</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
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
                </div>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <h3>Información de Contacto</h3>
            <div className="row g-3">
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input type="text" className="form-control" name="direccionresidencia"
                           value={formData.direccionresidencia} onChange={handleChange} placeholder="Directorio" required/>
                    <label>Dirección de residencia</label>
                    <div className="invalid-feedback">
                      Debe ingresar una dirección de residencia
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
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
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input type="text" className="form-control" name="telefono" placeholder="Telefono"
                           value={formData.telefono} onChange={handleChange} required/>
                    <label>Número de teléfono</label>
                    <div className="invalid-feedback">
                      Debe ingresar un número de teléfono
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input type="email" className="form-control" name="correo" placeholder="Correo electronico"
                           value={formData.correo} onChange={handleChange} required/>
                    <label>Correo electrónico</label>
                    <div className="invalid-feedback">
                      Debe ingresar un correo electrónico
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3 d-flex align-items-center h-100">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="isRequiredCompanion"
                           checked={formData.isRequiredCompanion} onChange={handleChange}/>
                    <label className="form-check-label">¿Requiere Acompañante?</label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {formData.isRequiredCompanion && (
            <section className="mb-4">
              <h3>Datos del acompañante</h3>
              <div className="row g-3">
                <div className="col-md-12">
                  <div className="form-group mb-3">
                    <div className="form-floating">
                      <input type="text" className="form-control" name="nombreacompanante" placeholder="Nombre Acompañante"
                             value={formData.nombreacompanante} onChange={handleChange} required={formData.isRequiredCompanion}/>
                      <label>Nombre completo del acompañante</label>
                      <div className="invalid-feedback">
                        Debe ingresar el nombre del acompañante
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <div className="form-floating">
                      <input type="text" className="form-control" name="telefonoacompanante"
                             value={formData.telefonoacompanante} onChange={handleChange}
                             placeholder="Número Acompañante" required={formData.isRequiredCompanion}/>
                      <label>Número de teléfono del acompañante</label>
                      <div className="invalid-feedback">
                        Debe ingresar el número de teléfono del acompañante
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <div className="form-floating">
                      <input type="text" className="form-control" name="parentescoacompanante"
                             value={formData.parentescoacompanante} onChange={handleChange}
                             placeholder="Parentesco Acompañante" required={formData.isRequiredCompanion}/>
                      <label>Parentesco</label>
                      <div className="invalid-feedback">
                        Debe ingresar el parentesco del acompañante
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary me-3">Guardar</button>
            <button type="button" className="btn btn-secondary"
                    onClick={() => navigate('/inicio')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroPaciente;