import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import axios from "axios";
import config from '../../config';
import showMessage from "../../util/UtilMessage";

const CrearSede = () => {
  const location = useLocation();
  const { entidadId } = location.state || {};
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
    horarioAtencion: '',
    codigoHabilitacion: '',
    servicios: '',
    habilitado: true
  });

  // Función para configurar el token de autorización
  const setAuthToken = () => {
    let token = sessionStorage.getItem('jsonwebtoken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  // Verificar que se haya pasado el ID de la entidad
  useEffect(() => {
    if (!entidadId) {
      showMessage('error', 'No se ha especificado la entidad');
      navigate('/entidad');
    }
  }, [entidadId, navigate]);

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

      // Preparar datos para enviar
      const sedeData = {
        id: null,
        nombre: formData.nombre,
        direccion: formData.direccion,
        telefono: formData.telefono,
        correo: formData.correo,
        horarioAtencion: formData.horarioAtencion,
        idEntidadPrestadoraSalud: entidadId,
        codigoHabilitacion: formData.codigoHabilitacion,
        servicios: formData.servicios,
        habilitado: formData.habilitado
      };

      console.log('Datos a enviar:', sedeData); // Para debug

      const response = await axios.post(`${config.baseURL}/sedeempresa/guardar`, sedeData, {
        validateStatus: function (status) {
          return status;
        }
      });

      if (response.status === 201 || response.status === 200) {
        if (response.data.success) {
          showMessage('success', 'Sede creada correctamente');
          navigate('/editarentidad', { state: { id: entidadId } });
        } else {
          showMessage('error', response.data.message || 'Error al crear la sede');
        }
      } else {
        showMessage('error', response.data?.message || 'Error al crear la sede');
      }
    } catch (error) {
      showMessage('error', 'Error al guardar la sede: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/editarentidad', { state: { id: entidadId } });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', padding: '20px' }}>
      <div className="card p-4" style={{ width: '800px' }}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{ maxWidth: '140px' }} />
          <h1>Crear Nueva Sede</h1>
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
                  onChange={handleChange}
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
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Nombre de la sede"
                    />
                    <label>Nombre de la sede</label>
                    <div className="invalid-feedback">
                      Debe ingresar un nombre para la sede
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
                      name="codigoHabilitacion"
                      value={formData.codigoHabilitacion}
                      onChange={handleChange}
                      required
                      placeholder="Código de habilitación"
                    />
                    <label>Código de habilitación</label>
                    <div className="invalid-feedback">
                      Debe ingresar un código de habilitación
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
            </div>
          </section>

          <section className="mb-4">
            <h3>Información de Contacto y Servicios</h3>
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
              <div className="col-md-12">
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
                      name="horarioAtencion"
                      value={formData.horarioAtencion}
                      onChange={handleChange}
                      required
                      placeholder="Horario de atención"
                      style={{ height: '100px' }}
                    ></textarea>
                    <label>Horario de atención</label>
                    <div className="invalid-feedback">
                      Debe ingresar el horario de atención
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      name="servicios"
                      value={formData.servicios}
                      onChange={handleChange}
                      required
                      placeholder="Servicios que ofrece la sede"
                      style={{ height: '100px' }}
                    ></textarea>
                    <label>Servicios</label>
                    <div className="invalid-feedback">
                      Debe ingresar los servicios que ofrece la sede
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary me-3" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Guardando...
                </>
              ) : (
                'Guardar'
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearSede;