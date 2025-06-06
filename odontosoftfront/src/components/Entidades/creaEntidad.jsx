import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import axios from "axios";
import config from '../../config';
import showMessage from "../../util/UtilMessage";

const CrearEntidad = () => {
  const navigate = useNavigate();
  const usuario = sessionStorage.getItem('username');

  const [loading, setLoading] = useState(false);
  const [loadingCombos, setLoadingCombos] = useState(true);

  // Estados para los datos de los combos
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [tiposEntidad, setTiposEntidad] = useState([]);
  const [regimenes, setRegimenes] = useState([]);

  const [formData, setFormData] = useState({
    tipodocumento: '',
    numerodocumento: '',
    nombre: '',
    tipoentidad: '',
    codigominsalud: '',
    regimenadministra: '',
    direccion: '',
    telefono: '',
    sitioweb: '',
    correo: '',
    canalesatencion: '',
    habilitado: true
  });

  // Función para configurar el token de autorización
  const setAuthToken = () => {
    let token = sessionStorage.getItem('jsonwebtoken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  // Cargar datos de los combos
  useEffect(() => {
    const fetchCombosData = async () => {
      try {
        setLoadingCombos(true);
        setAuthToken();

        // Llamadas simultáneas a las tres APIs
        const [tiposDocResp, tiposEntResp, regimenesResp] = await Promise.all([
          axios.get(`${config.baseURL}/tipodocumento/consultar`, {
            validateStatus: (status) => status
          }),
          axios.get(`${config.baseURL}/tipoentidad/consultar`, {
            validateStatus: (status) => status
          }),
          axios.get(`${config.baseURL}/regimen/consultar`, {
            validateStatus: (status) => status
          })
        ]);

        // Procesar respuestas de tipos de documento
        if (tiposDocResp.status === 200) {
          setTiposDocumento(tiposDocResp.data);
        } else {
          console.error('Error al cargar tipos de documento:', tiposDocResp.status);
          setTiposDocumento([]);
        }

        // Procesar respuestas de tipos de entidad
        if (tiposEntResp.status === 200) {
          setTiposEntidad(tiposEntResp.data.filter(tipo => tipo.habilitado));
        } else {
          console.error('Error al cargar tipos de entidad:', tiposEntResp.status);
          setTiposEntidad([]);
        }

        // Procesar respuestas de regímenes
        if (regimenesResp.status === 200) {
          setRegimenes(regimenesResp.data.filter(regimen => regimen.habilitado));
        } else {
          console.error('Error al cargar regímenes:', regimenesResp.status);
          setRegimenes([]);
        }

      } catch (error) {
        console.error('Error al cargar datos de combos:', error);
        showMessage('warning', 'Error al cargar algunos datos de los formularios');
        // Establecer valores por defecto en caso de error
        setTiposDocumento([]);
        setTiposEntidad([]);
        setRegimenes([]);
      } finally {
        setLoadingCombos(false);
      }
    };

    fetchCombosData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Validación especial para el campo teléfono - solo números, espacios, guiones y paréntesis
    if (name === 'telefono') {
      const phoneRegex = /^[0-9\s\-\(\)\+]*$/;
      if (!phoneRegex.test(value)) {
        return; // No actualizar si contiene caracteres no válidos
      }
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.stopPropagation();
      e.target.classList.add('was-validated');
      return;
    }

    try {
      setLoading(true);
      setAuthToken();

      // Preparar datos para enviar con IDs como números
      const entidadData = {
        tipodocumento: parseInt(formData.tipodocumento), // Convertir a número
        numerodocumento: formData.numerodocumento,
        nombre: formData.nombre,
        tipoentidad: parseInt(formData.tipoentidad), // Convertir a número
        codigominsalud: formData.codigominsalud,
        regimenadministra: parseInt(formData.regimenadministra), // Convertir a número
        direccion: formData.direccion,
        telefono: formData.telefono,
        sitioWeb: formData.sitioweb,
        correo: formData.correo,
        canalesAtencion: formData.canalesatencion,
        habilitado: formData.habilitado
      };

      console.log('Datos a enviar:', entidadData); // Para debug

      const response = await axios.post(`${config.baseURL}/eps/guardar`, entidadData, {
        validateStatus: function (status) {
          return status;
        }
      });

      if (response.status === 201 || response.status === 200) {
        showMessage('success', 'Entidad creada correctamente');
        navigate('/entidad');
      } else {
        showMessage('error', response.data?.mensajeValidacion || 'Error al crear la entidad');
      }
    } catch (error) {
      showMessage('error', 'Error al guardar los datos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateHabilitado = () => {
    setFormData({
      ...formData,
      habilitado: !formData.habilitado
    });
  };

  if (loadingCombos) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p>Cargando formularios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ width: '1200px' }}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{ maxWidth: '140px' }} />
          <h1>Crear Entidad Prestadora de Salud</h1>
        </header>

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <section className="mb-4">
            <h3>Información General</h3>
            <div className="mb-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="switchHabilitado"
                  name="habilitado"
                  checked={formData.habilitado}
                  onChange={updateHabilitado}
                />
                <label
                  className="form-check-label"
                  htmlFor="switchHabilitado"
                  style={{
                    color: formData.habilitado ? "green" : "red",
                    fontWeight: 'bold'
                  }}
                >
                  {formData.habilitado ? 'Habilitado' : 'Inhabilitado'}
                </label>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      name="tipodocumento"
                      value={formData.tipodocumento}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {tiposDocumento.map(tipo => (
                        <option key={tipo.id} value={tipo.id}>
                          {tipo.nombre}
                        </option>
                      ))}
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
                    <input
                      type="text"
                      className="form-control"
                      name="numerodocumento"
                      value={formData.numerodocumento}
                      onChange={handleChange}
                      required
                      placeholder="Número de documento"
                    />
                    <label>Número de documento</label>
                    <div className="invalid-feedback">
                      Debe ingresar un número de documento
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Nombre de la entidad"
                    />
                    <label>Nombre de la entidad</label>
                    <div className="invalid-feedback">
                      Debe ingresar un nombre
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      name="tipoentidad"
                      value={formData.tipoentidad}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {tiposEntidad.map(tipo => (
                        <option key={tipo.id} value={tipo.id}>
                          {tipo.descripcion}
                        </option>
                      ))}
                    </select>
                    <label>Tipo de entidad</label>
                    <div className="invalid-feedback">
                      Debe seleccionar un tipo de entidad
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="codigominsalud"
                      value={formData.codigominsalud}
                      onChange={handleChange}
                      required
                      placeholder="Código Minsalud"
                    />
                    <label>Código habilitación Minsalud</label>
                    <div className="invalid-feedback">
                      Debe ingresar un código de habilitación
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      name="regimenadministra"
                      value={formData.regimenadministra}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {regimenes.map(regimen => (
                        <option key={regimen.id} value={regimen.id}>
                          {regimen.descripcion}
                        </option>
                      ))}
                    </select>
                    <label>Régimen que administra</label>
                    <div className="invalid-feedback">
                      Debe seleccionar un régimen
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <h3>Datos de Contacto</h3>
            <div className="row g-3">
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      required
                      placeholder="Dirección"
                    />
                    <label>Dirección</label>
                    <div className="invalid-feedback">
                      Debe ingresar una dirección
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input
                      type="tel"
                      className="form-control"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder="Teléfono"
                      pattern="[0-9\s\-\(\)\+]*"
                      title="Solo se permiten números, espacios, guiones, paréntesis y el símbolo +"
                    />
                    <label>Teléfono</label>
                    <div className="invalid-feedback">
                      Debe ingresar un número de teléfono válido (solo números, espacios, guiones, paréntesis y +)
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input
                      type="url"
                      className="form-control"
                      name="sitioweb"
                      value={formData.sitioweb}
                      onChange={handleChange}
                      placeholder="https://ejemplo.com"
                      pattern="https?://.+"
                      title="Debe ingresar una URL válida que comience con http:// o https://"
                    />
                    <label>Sitio Web</label>
                    <div className="invalid-feedback">
                      Debe ingresar una URL válida (ej: https://ejemplo.com)
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      required
                      placeholder="Correo electrónico"
                    />
                    <label>Correo electrónico</label>
                    <div className="invalid-feedback">
                      Debe ingresar un correo electrónico válido
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      name="canalesatencion"
                      value={formData.canalesatencion}
                      onChange={handleChange}
                      placeholder="Canales de atención"
                      style={{ height: '100px' }}
                    ></textarea>
                    <label>Canales de atención</label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary me-3" disabled={loading}>
              {loading ? 'Creando...' : 'Crear'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/entidad')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearEntidad;