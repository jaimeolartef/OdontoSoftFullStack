import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import showMessage from "../../util/UtilMessage";
import { apiGet, apiPost } from '../apiService';

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

  // Función helper para mapear descripciones a IDs
  const findIdByDescription = (options, description, keyField = 'descripcion') => {
    if (!description || !options.length) return '';
    const found = options.find(option =>
      (option[keyField] || '').toLowerCase() === (description || '').toLowerCase()
    );
    return found ? found.id.toString() : '';
  };

  // Cargar sedes de la entidad
  useEffect(() => {
    const fetchSedes = async () => {
      if (!id) return;
      try {
        setLoadingSedes(true);
        const response = await apiGet(`/sedeempresa/consultar/entidad/${id}`);
        setSedes(response || []);
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
        const [tiposDocResp, tiposEntResp, regimenesResp] = await Promise.all([
          apiGet('/tipodocumento/consultar'),
          apiGet('/tipoentidad/consultar'),
          apiGet('/regimen/consultar')
        ]);
        setTiposDocumento(tiposDocResp || []);
        setTiposEntidad((tiposEntResp || []).filter(tipo => tipo.habilitado));
        setRegimenes((regimenesResp || []).filter(regimen => regimen.habilitado));
      } catch (error) {
        console.error('Error al cargar datos de combos:', error);
        showMessage('warning', 'Error al cargar algunos datos de los formularios');
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
        const response = await apiGet(`/eps/consultar/${id}`);
        setFormData({
          id: response.id,
          tipodocumento: findIdByDescription(tiposDocumento, response.tipodocumento, 'nombre'),
          numerodocumento: response.numerodocumento,
          nombre: response.nombre,
          tipoentidad: findIdByDescription(tiposEntidad, response.tipoentidad),
          codigominsalud: response.codigominsalud,
          regimenadministra: findIdByDescription(regimenes, response.regimenadministra),
          direccion: response.direccion,
          telefono: response.telefono,
          sitioweb: response.sitioweb,
          correo: response.correo,
          canalesatencion: response.canalesatencion,
          habilitado: response.habilitado
        });
      } catch (error) {
        showMessage('error', 'Error al obtener datos de la entidad');
        navigate('/entidad');
      } finally {
        setLoading(false);
      }
    };
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
      const entidadData = {
        id: formData.id,
        tipodocumento: parseInt(formData.tipodocumento),
        numerodocumento: formData.numerodocumento,
        nombre: formData.nombre,
        tipoentidad: parseInt(formData.tipoentidad),
        codigominsalud: formData.codigominsalud,
        regimenadministra: parseInt(formData.regimenadministra),
        direccion: formData.direccion,
        telefono: formData.telefono,
        sitioWeb: formData.sitioweb,
        correo: formData.correo,
        canalesAtencion: formData.canalesatencion,
        habilitado: formData.habilitado
      };
      await apiPost('/eps/guardar', entidadData);
      showMessage('success', 'Entidad actualizada correctamente');
      navigate('/entidad');
    } catch (error) {
      showMessage('error', error.message || 'Error al guardar los cambios');
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
                      <option value="">Seleccione...</option>
                      {tiposDocumento.map(tipo => (
                        <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                      ))}
                    </select>
                    <label>Tipo de documento</label>
                    <div className="invalid-feedback">
                      Seleccione un tipo de documento
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
                      Ingrese el número de documento
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
                      Ingrese el nombre de la entidad
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
                      <option value="">Seleccione...</option>
                      {tiposEntidad.map(tipo => (
                        <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                      ))}
                    </select>
                    <label>Tipo de entidad</label>
                    <div className="invalid-feedback">
                      Seleccione un tipo de entidad
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
                      placeholder="Código habilitación Minsalud"
                    />
                    <label>Código habilitación Minsalud</label>
                    <div className="invalid-feedback">
                      Ingrese el código de habilitación
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
                      <option value="">Seleccione...</option>
                      {regimenes.map(regimen => (
                        <option key={regimen.id} value={regimen.id}>{regimen.nombre}</option>
                      ))}
                    </select>
                    <label>Régimen que administra</label>
                    <div className="invalid-feedback">
                      Seleccione un régimen
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
                      Ingrese la dirección
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
                      Ingrese el teléfono
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
                      placeholder="Sitio Web"
                    />
                    <label>Sitio Web</label>
                    <div className="invalid-feedback">
                      Ingrese el sitio web
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
                      Ingrese un correo electrónico válido
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
                className="btn btn-success"
                onClick={handleCrearSede}
              >
                Crear Sede
              </button>
            </div>
            <div className="table-responsive">
              {loadingSedes ? (
                <div className="text-center">
                  <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p>Cargando sedes...</p>
                </div>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Dirección</th>
                      <th>Teléfono</th>
                      <th>Correo</th>
                      <th>Habilitado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sedes.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">No hay sedes registradas</td>
                      </tr>
                    ) : (
                      sedes.map(sede => (
                        <tr key={sede.id}>
                          <td>{sede.nombre}</td>
                          <td>{sede.direccion}</td>
                          <td>{sede.telefono}</td>
                          <td>{sede.correo}</td>
                          <td>
                            <span className={sede.habilitado ? 'text-success' : 'text-danger'}>
                              {sede.habilitado ? 'Sí' : 'No'}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => handleEditSede(sede.id)}
                            >
                              Editar
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
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