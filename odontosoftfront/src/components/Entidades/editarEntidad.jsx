import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import axios from "axios";
import config from '../../config';
import showMessage from "../../util/UtilMessage";

const EditarEntidad = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();
  const usuario = sessionStorage.getItem('username');

  const [loading, setLoading] = useState(true);
  const [loadingCombos, setLoadingCombos] = useState(true);
  const [loadingSedes, setLoadingSedes] = useState(true);

  // Estados para los datos de los combos
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [tiposEntidad, setTiposEntidad] = useState([]);
  const [regimenes, setRegimenes] = useState([]);

  // Estado para las sedes
  const [sedes, setSedes] = useState([]);

  const [formData, setFormData] = useState({
    id: '',
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

  // Función para encontrar el valor correcto basado en la descripción/nombre
  const findOptionValue = (options, currentValue, keyField = 'descripcion') => {
    if (!currentValue || !options.length) return '';
    const found = options.find(option =>
      option[keyField].toLowerCase() === currentValue.toLowerCase()
    );
    return found ? found.id : '';
  };

  // Función helper para mapear descripciones a IDs
  const findIdByDescription = (options, description, keyField = 'descripcion') => {
    if (!description || !options.length) return '';
    const found = options.find(option =>
      option[keyField].toLowerCase() === description.toLowerCase()
    );
    return found ? found.id.toString() : '';
  };

  // Cargar sedes de la entidad
  useEffect(() => {
    const fetchSedes = async () => {
      if (!id) return;

      try {
        setLoadingSedes(true);
        setAuthToken();

        const response = await axios.get(`${config.baseURL}/sedeempresa/consultar/entidad/${id}`, {
          validateStatus: (status) => status
        });

        if (response.status === 200 && response.data.success) {
          // La respuesta tiene los datos en response.data.data
          setSedes(response.data.data || []);
        } else {
          console.error('Error al cargar sedes:', response.status);
          setSedes([]);
        }
      } catch (error) {
        console.error('Error al cargar sedes:', error);
        setSedes([]);
      } finally {
        setLoadingSedes(false);
      }
    };

    fetchSedes();
  }, [id]);

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

  // Cargar datos de la entidad
  useEffect(() => {
    const fetchEntidad = async () => {
      if (!id) {
        navigate('/entidad');
        return;
      }

      try {
        setLoading(true);
        setAuthToken();

        const response = await axios.get(`${config.baseURL}/eps/consultar/${id}`, {
          validateStatus: function (status) {
            return status;
          }
        });

        if (response.status === 200) {
          setFormData({
            id: response.data.id,
            tipodocumento: findIdByDescription(tiposDocumento, response.data.tipodocumento, 'nombre'),
            numerodocumento: response.data.numerodocumento,
            nombre: response.data.nombre,
            tipoentidad: findIdByDescription(tiposEntidad, response.data.tipoentidad),
            codigominsalud: response.data.codigominsalud,
            regimenadministra: findIdByDescription(regimenes, response.data.regimenadministra),
            direccion: response.data.direccion,
            telefono: response.data.telefono,
            sitioweb: response.data.sitioweb,
            correo: response.data.correo,
            canalesatencion: response.data.canalesatencion,
            habilitado: response.data.habilitado
          });
        } else {
          showMessage('error', 'Error al obtener datos de la entidad');
          navigate('/entidad');
        }
      } catch (error) {
        showMessage('error', 'Error de conexión: ' + error.message);
        navigate('/entidad');
      } finally {
        setLoading(false);
      }
    };

    // Solo ejecutar cuando los combos estén cargados
    if (!loadingCombos && tiposDocumento.length && tiposEntidad.length && regimenes.length) {
      fetchEntidad();
    }
  }, [id, navigate, loadingCombos, tiposDocumento, tiposEntidad, regimenes]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
        id: formData.id,
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
        showMessage('success', 'Entidad actualizada correctamente');
        navigate('/entidad');
      } else {
        showMessage('error', response.data?.mensajeValidacion || 'Error al actualizar la entidad');
      }
    } catch (error) {
      showMessage('error', 'Error al guardar los cambios: ' + error.message);
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

  // Función para navegar a la página de edición de sede
  const handleEditSede = (sedeId) => {
    navigate('/editarSede', { state: { id: sedeId, entidadId: id } });
  };

  // Función para navegar a la página de creación de sede
  const handleCrearSede = () => {
    navigate('/crearSede', { state: { entidadId: id } });
  };

  if (loading || loadingCombos) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p>{loadingCombos ? 'Cargando formularios...' : 'Cargando datos de la entidad...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ width: '1200px' }}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{ maxWidth: '140px' }} />
          <h1>Editar Entidad Prestadora de Salud</h1>
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
                      type="text"
                      className="form-control"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder="Teléfono"
                    />
                    <label>Teléfono</label>
                    <div className="invalid-feedback">
                      Debe ingresar un número de teléfono
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
                      name="sitioweb"
                      value={formData.sitioweb}
                      onChange={handleChange}
                      placeholder="Sitio web"
                    />
                    <label>Sitio Web</label>
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

          <section className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Sedes</h3>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={handleCrearSede}
              >
                <i className="bi bi-plus-circle me-1"></i> Agregar Sede
              </button>
            </div>
            <div className="table-responsive">
              {loadingSedes ? (
                <div className="text-center py-3">
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Cargando sedes...</span>
                  </div>
                  <p className="mt-2 mb-0">Cargando sedes...</p>
                </div>
              ) : sedes.length === 0 ? (
                <div className="alert alert-info text-center">
                  <i className="bi bi-info-circle me-2"></i>
                  No hay sedes registradas para esta entidad.
                </div>
              ) : (
                <table className="table table-bordered table-hover">
                  <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Estado</th>
                    <th style={{ width: '100px' }}>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>
                  {sedes.map(sede => (
                    <tr key={sede.id}>
                      <td>{sede.nombre}</td>
                      <td>{sede.direccion}</td>
                      <td>{sede.telefono}</td>
                      <td>{sede.correo}</td>
                      <td>
                          <span className={`badge ${sede.habilitado ? 'bg-success' : 'bg-danger'}`}>
                            {sede.habilitado ? 'Activa' : 'Inactiva'}
                          </span>
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEditSede(sede.id)}
                          title="Editar sede"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary me-3" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
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

export default EditarEntidad;