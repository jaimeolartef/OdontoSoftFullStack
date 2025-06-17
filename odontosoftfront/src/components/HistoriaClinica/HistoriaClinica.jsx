import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from "../../resource/LogoNegro.png";
import ReadOnlyPaciente from "../HistoriaClinica/ReadOnlyPaciente";
import showMessage from "../../util/UtilMessage";
import { apiGet } from '../apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import MedicalIcon from "../../resource/MedicalIcon.png";
import Ver from "../../resource/ver.png";


const HistoriaClinica = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const patient = useMemo(() => {
    return location.state?.patient || {};
  }, [location.state]);

  const [historiaClinica, setHistoriaClinica] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroMedico, setFiltroMedico] = useState('');
  const [ordenamiento, setOrdenamiento] = useState('desc'); // desc = más reciente primero

  useEffect(() => {
    if (patient.id) {
      fetchHistoriaClinica();
    }
  }, [patient.id]);

  const fetchHistoriaClinica = async () => {
    try {
      setLoading(true);
      const response = await apiGet(`/historiaClinica/consultar/paciente/${patient.id}`);
      if (response.length > 0) {
        const registrosConOdontologo = await Promise.all(
          response.map(async (record) => {
            if (record.idusuariocreacion) {
              const odontologo = await fecthhOdontologo(record.idusuariocreacion);
              return { ...record, odontologo: odontologo || null };
            } else {
              return { ...record, odontologo: null };
            }
          })
        );
        setHistoriaClinica(registrosConOdontologo);
        console.log(response);
      }
    } catch (error) {
      showMessage('error', error?.message || 'Error al cargar la historia clínica');
      setHistoriaClinica([]);
    } finally {
      setLoading(false);
    }
  };

  const fecthhOdontologo = async (documentoOdontologoActual) => {
    try {
      return await apiGet(`/doctor/consultar/documento/${documentoOdontologoActual}`);
    } catch (error) {
      showMessage('error', error?.message || 'Error al cargar el odontólogo');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleViewOnlyRecord = (record) => {
    navigate('/historialCita', {
      state: {
        patient: { ...patient, idHistoriaClinica: record.id },
        readOnly: true
      }
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  const registrosFiltrados = useMemo(() => {
    let filtrados = [...historiaClinica];

    // Filtro por fecha
    if (filtroFecha) {
      filtrados = filtrados.filter(record => {
        const fechaRegistro = new Date(record.fechacreacion).toISOString().split('T')[0];
        return fechaRegistro === filtroFecha;
      });
    }

    // Filtro por médico
    if (filtroMedico) {
      filtrados = filtrados.filter(record =>
        record.odontologo?.nombre?.toLowerCase().includes(filtroMedico.toLowerCase())
      );
    }

    // Ordenamiento
    filtrados.sort((a, b) => {
      const fechaA = new Date(a.fechacreacion);
      const fechaB = new Date(b.fechacreacion);
      return ordenamiento === 'desc' ? fechaB - fechaA : fechaA - fechaB;
    });

    return filtrados;
  }, [historiaClinica, filtroFecha, filtroMedico, ordenamiento]);

  const getEstadoColor = (record) => {
    const fechaCreacion = new Date(record.fechacreacion);
    const hoy = new Date();
    const diasDiferencia = Math.ceil((hoy - fechaCreacion) / (1000 * 60 * 60 * 24));

    if (diasDiferencia <= 7) return 'success'; // Verde - Reciente
    if (diasDiferencia <= 30) return 'warning'; // Amarillo - Mes pasado
    return 'secondary'; // Gris - Más antigua
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ width: '1500px' }}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{ maxWidth: '140px' }} />
          <h1>Historia Clínica</h1>
        </header>

        <ReadOnlyPaciente idPatient={patient.id} />

        <div className="espacio"></div>

        {/* Filtros y controles */}
        <div className="row mb-4">
          <div className="col-md-3">
            <label className="form-label">Filtrar por fecha:</label>
            <input
              type="date"
              className="form-control"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Filtrar por médico:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del médico"
              value={filtroMedico}
              onChange={(e) => setFiltroMedico(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Ordenar por:</label>
            <select
              className="form-select"
              value={ordenamiento}
              onChange={(e) => setOrdenamiento(e.target.value)}
            >
              <option value="desc">Más reciente primero</option>
              <option value="asc">Más antigua primero</option>
            </select>
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setFiltroFecha('');
                setFiltroMedico('');
              }}
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        {/* Lista de registros */}
        <div className="row">
          <div className="col-12">
            <h3>Registros de Citas Médicas ({registrosFiltrados.length})</h3>

            {registrosFiltrados.length === 0 ? (
              <div className="alert alert-info text-center">
                <h5>No hay registros de citas médicas</h5>
                <p>Este paciente aún no tiene registros en su historia clínica.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                  <tr>
                    <th>Fecha</th>
                    <th>Motivo de Consulta</th>
                    <th>Médico</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>
                  {registrosFiltrados.map((record, index) => (
                    <tr key={record.id || index}>
                      <td>{formatDate(record.fechacreacion)}</td>
                      <td>
                        <div style={{ maxWidth: '300px' }}>
                          {record.motivoconsulta || 'Sin especificar'}
                        </div>
                      </td>
                      <td>{record.odontologo.nombre || 'N/A'}</td>
                      <td>
                          <span className={`badge bg-${getEstadoColor(record)}`}>
                            {getEstadoColor(record) === 'success' ? 'Reciente' :
                              getEstadoColor(record) === 'warning' ? 'Mes pasado' : 'Antigua'}
                          </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <img src={Ver} alt="Vista rápida"
                               style={{
                                 marginRight: '5px',
                                 width: '35px',
                                 height: '35px',
                                 cursor: 'pointer',
                                 filter: 'grayscale(100%)'
                               }}
                               onClick={(e) => {
                                 e.stopPropagation();
                                 handleViewRecord(record);
                               }}
                               data-tooltip-id="tooltip" data-tooltip-content="Ver completo"/>

                          <img src={MedicalIcon} alt="Ver completo"
                               style={{
                                 marginRight: '5px',
                                 width: '35px',
                                 height: '35px',
                                 cursor: 'pointer',
                                 filter: 'grayscale(100%)'
                               }}
                               onClick={(e) => {
                                 e.stopPropagation();
                                 handleViewOnlyRecord(record);
                               }}
                               data-tooltip-id="tooltip" data-tooltip-content="Ver completo"/>
                        </div>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
      </div>

      {/* Modal para vista rápida */}
      {showModal && selectedRecord && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Vista Rápida - Cita Médica</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Fecha:</strong> {formatDate(selectedRecord.fechacreacion)}
                  </div>
                  <div className="col-md-6">
                    <strong>Médico:</strong> {selectedRecord.odontologo.nombre || 'N/A'}
                  </div>
                </div>

                <div className="mb-3">
                  <strong>Motivo de Consulta:</strong>
                  <p className="mt-1">{selectedRecord.motivoconsulta || 'No especificado'}</p>
                </div>

                <div className="mb-3">
                  <strong>Enfermedad Actual:</strong>
                  <p className="mt-1">{selectedRecord.enfermedadactual || 'No especificado'}</p>
                </div>

                {selectedRecord.observacion && (
                  <div className="mb-3">
                    <strong>Observaciones:</strong>
                    <p className="mt-1">{selectedRecord.observacion}</p>
                  </div>
                )}

                <div className="row">
                  <div className="col-md-4">
                    <small className="text-muted">
                      <strong>Diagnósticos:</strong> {selectedRecord.diagnosticos?.length || 0}
                    </small>
                  </div>
                  <div className="col-md-4">
                    <small className="text-muted">
                      <strong>Exámenes:</strong> {selectedRecord.examenestomatologicos?.length || 0}
                    </small>
                  </div>
                  <div className="col-md-4">
                    <small className="text-muted">
                      <strong>Signos Vitales:</strong> {selectedRecord.signovitals?.length || 0}
                    </small>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    closeModal();
                    handleViewOnlyRecord(selectedRecord);
                  }}
                >
                  Ver Completo
                </button>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoriaClinica;