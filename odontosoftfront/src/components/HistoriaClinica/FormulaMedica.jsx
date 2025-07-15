import React, { useEffect, useState } from 'react';
import showMessage from "../../util/UtilMessage";
import { Tooltip } from "react-tooltip";
import EditIcon from '../../resource/EditIcon.png';
import VerIcon from "../../resource/ver.png";
import EliminarIcon from "../../resource/Eliminar.png";
import { apiGet, apiPost, apiPut } from '../apiService';

const FormulaMedica = ({ pacienteId, medicoId, readOnly, idhistoriaclinica }) => {
  const [estadosMedicamento, setEstadosMedicamento] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [formulasMedicasGuardadas, setFormulasMedicasGuardadas] = useState([]);
  const [formulasMedicasLocales, setFormulasMedicasLocales] = useState([]);
  const [selectedMedicamento, setSelectedMedicamento] = useState('');
  const [isGuardando, setIsGuardando] = useState(false);
  const [formulaData, setFormulaData] = useState({
    numeroFormula: '',
    pacienteId: pacienteId,
    medicoId: medicoId,
    diagnosticosSecundarios: '',
    dosis: '',
    frecuencia: '',
    duracionTratamiento: '',
    cantidadTotal: '',
    instruccionesEspeciales: '',
    observaciones: '',
    estadoMedicamentoId: '',
    medicamentoId: '',
    entidadPrestadoraId: '',
    habilitado: true
  });
  const [editingIndex, setEditingIndex] = useState(-1);
  const usuario = sessionStorage.getItem('username');
  const token = sessionStorage.getItem('jsonwebtoken');

  // Función para calcular la cantidad total
  const calcularCantidadTotal = (frecuencia, duracion) => {
    if (!frecuencia || !duracion) return '';

    // Extraer números de frecuencia (ej: "3 veces al día" -> 3)
    const frecuenciaNum = parseInt(frecuencia.match(/\d+/)?.[0] || '0');

    // Extraer números de duración (ej: "7 días" -> 7)
    const duracionNum = parseInt(duracion.match(/\d+/)?.[0] || '0');

    if (frecuenciaNum > 0 && duracionNum > 0) {
      return (frecuenciaNum * duracionNum).toString();
    }

    return '';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener estados de medicamento
        const estadosResponse = await apiGet('/estados-medicamento/listar', token);
        if (estadosResponse) {
          setEstadosMedicamento(estadosResponse);
        }

        // Obtener medicamentos
        const medicamentosResponse = await apiGet('/medicamentos/listar', token);
        if (medicamentosResponse) {
          setMedicamentos(medicamentosResponse);
        }

        // Obtener fórmulas médicas existentes guardadas
        const formulasResponse = await apiGet('/formulas-medicas/listar', token);
        if (formulasResponse) {
          setFormulasMedicasGuardadas(formulasResponse.filter(formula =>
            formula.pacienteId === pacienteId && formula.medicoId === medicoId
          ));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        showMessage('error', 'Error al cargar los datos');
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [pacienteId, medicoId]);

  const handleMedicamentoChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedMedicamento(selectedValue);

    if (selectedValue) {
      const medicamentoSeleccionado = medicamentos.find(med =>
        `${med.codigo} - ${med.nombre}` === selectedValue
      );

      if (medicamentoSeleccionado) {
        setFormulaData(prev => ({
          ...prev,
          medicamentoId: medicamentoSeleccionado.id,
          medicamentoInfo: medicamentoSeleccionado
        }));
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const updatedData = {
      ...formulaData,
      [name]: value
    };

    // Calcular cantidad total automáticamente cuando cambie frecuencia o duración
    if (name === 'frecuencia' || name === 'duracionTratamiento') {
      const nuevaFrecuencia = name === 'frecuencia' ? value : formulaData.frecuencia;
      const nuevaDuracion = name === 'duracionTratamiento' ? value : formulaData.duracionTratamiento;
      updatedData.cantidadTotal = calcularCantidadTotal(nuevaFrecuencia, nuevaDuracion);
    }

    setFormulaData(updatedData);
  };

  const generateNumeroFormula = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `FM-${timestamp}-${random}`;
  };

  const handleAgregarMedicamento = (event) => {
    event.preventDefault();

    if (!formulaData.medicamentoId || !formulaData.dosis ||
      !formulaData.frecuencia || !formulaData.duracionTratamiento) {
      showMessage('warning', 'Por favor complete todos los campos obligatorios');
      return;
    }

    // Verificar si el medicamento ya está en la lista (solo para nuevos, no para ediciones)
    if (editingIndex < 0) {
      const medicamentoExistente = formulasMedicasLocales.find(
        formula => formula.medicamentoId === formulaData.medicamentoId
      );
      if (medicamentoExistente) {
        showMessage('warning', 'Este medicamento ya está en la lista. Puede editarlo si necesita cambiar la dosificación.');
        return;
      }
    }

    const nuevoMedicamento = {
      ...formulaData,
      fechaFormulacion: new Date().toISOString(),
      estadoMedicamento: "ACTIVO",
      idhistoriaclinica: idhistoriaclinica,
      idUsuarioCreacion: usuario,
      fechaCreacion: new Date().toISOString().split('T')[0]
    };
    console.log(selectedMedicamento);
    // Agregar nuevo medicamento a la lista local
    setFormulasMedicasLocales(prev => [...prev, nuevoMedicamento]);
    console.log("formulas locales ", formulasMedicasLocales);

    resetForm();
  };

  const handleGuardarTodas = async () => {
    if (formulasMedicasLocales.length === 0) {
      showMessage('warning', 'No hay medicamentos en la lista para guardar');
      return;
    }

    setIsGuardando(true);

    try {
      const numeroFormula = generateNumeroFormula();
      // Crear un objeto fórmula médica que contenga todos los medicamentos
      for (const medicamento of formulasMedicasLocales) {
        const idx = formulasMedicasLocales.indexOf(medicamento);
        // Guardar la fórmula completa con todos los medicamentos
        medicamento.numeroFormula = numeroFormula;
        const respuesta = await apiPost('/formulas-medicas/crear', medicamento, token);

        if (respuesta) {
          // Actualizar la lista de fórmulas guardadas
          setFormulasMedicasGuardadas(prev => [...prev, respuesta]);
        }

        // Aquí puedes acceder a cada medicamento y su índice
        console.log(`Medicamento ${idx}:`, medicamento);
      }

      // Limpiar la lista local
      showMessage('success', `Fórmula médica guardada exitosamente con ${formulasMedicasLocales.length} medicamento(s)`);
      setFormulasMedicasLocales([]);

    } catch (error) {
      console.error('Error saving formula:', error);
      showMessage('error', 'Error al guardar la fórmula médica');
    } finally {
      setIsGuardando(false);
    }
  };

  const handleLimpiarLista = () => {
    if (formulasMedicasLocales.length === 0) {
      showMessage('info', 'No hay medicamentos en la lista para limpiar');
      return;
    }

    if (window.confirm('¿Está seguro que desea limpiar todos los medicamentos de la lista?')) {
      setFormulasMedicasLocales([]);
      resetForm();
      showMessage('info', 'Lista de medicamentos limpiada');
    }
  };

  const resetForm = () => {
    setFormulaData({
      numeroFormula: '',
      pacienteId: pacienteId,
      medicoId: medicoId,
      diagnosticosSecundarios: '',
      dosis: '',
      frecuencia: '',
      duracionTratamiento: '',
      cantidadTotal: '',
      instruccionesEspeciales: '',
      observaciones: '',
      estadoMedicamentoId: '',
      medicamentoId: '',
      entidadPrestadoraId: '',
      habilitado: true
    });
    setSelectedMedicamento('');
    setEditingIndex(-1);
  };

  const handleEditLocal = (index) => {
    const formula = formulasMedicasLocales[index];
    setFormulaData(formula);

    const medicamento = medicamentos.find(med => med.id === formula.medicamentoId);
    if (medicamento) {
      setSelectedMedicamento(`${medicamento.codigo} - ${medicamento.nombre}`);
    }

    setEditingIndex(index);
  };

  const handleDeleteLocal = (index) => {
    if (window.confirm('¿Está seguro que desea eliminar este medicamento de la lista?')) {
      const updatedFormulas = formulasMedicasLocales.filter((_, i) => i !== index);
      setFormulasMedicasLocales(updatedFormulas);

      // Si estamos editando el medicamento que se va a eliminar, resetear el formulario
      if (editingIndex === index) {
        resetForm();
      } else if (editingIndex > index) {
        // Ajustar el índice de edición si es necesario
        setEditingIndex(editingIndex - 1);
      }

      showMessage('success', 'Medicamento eliminado de la lista');
    }
  };

  const handleView = (formula) => {
    // Implementar lógica para visualizar la fórmula en modo solo lectura
    console.log('Ver fórmula:', formula);
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2>Fórmula Médica</h2>
        </div>
        <div className="card-body">
          {!readOnly && (
            <form onSubmit={handleAgregarMedicamento}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="medicamento">Medicamento *</label>
                    <input
                      className="form-control"
                      list="medicamentoOptions"
                      id="medicamentoList"
                      placeholder="Buscar medicamento..."
                      value={selectedMedicamento}
                      onChange={handleMedicamentoChange}
                      required
                    />
                    <datalist id="medicamentoOptions">
                      {medicamentos.map((medicamento) => (
                        <option key={medicamento.id} value={`${medicamento.codigo} - ${medicamento.nombre}`}/>
                      ))}
                    </datalist>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="dosis">Dosis *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="dosis"
                      name="dosis"
                      placeholder="Ej: 500mg, 1 tableta"
                      value={formulaData.dosis}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="frecuencia">Frecuencia * (veces por día)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="frecuencia"
                      name="frecuencia"
                      placeholder="Ej: 3 veces al día, cada 8 horas"
                      value={formulaData.frecuencia}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="duracionTratamiento">Duración Tratamiento *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="duracionTratamiento"
                      name="duracionTratamiento"
                      placeholder="Ej: 7 días, 2 semanas"
                      value={formulaData.duracionTratamiento}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cantidadTotal">Cantidad Total (calculada automáticamente)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cantidadTotal"
                      name="cantidadTotal"
                      value={formulaData.cantidadTotal}
                      readOnly
                    />
                    <small className="form-text text-muted">
                      Se calcula automáticamente basado en frecuencia y duración
                    </small>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="diagnosticosSecundarios">Diagnósticos Secundarios</label>
                    <input
                      type="text"
                      className="form-control"
                      id="diagnosticosSecundarios"
                      name="diagnosticosSecundarios"
                      placeholder="Diagnósticos adicionales (opcional)"
                      value={formulaData.diagnosticosSecundarios}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="instruccionesEspeciales">Instrucciones Especiales</label>
                    <textarea
                      className="form-control"
                      id="instruccionesEspeciales"
                      name="instruccionesEspeciales"
                      rows="3"
                      placeholder="Ej: Tomar con alimentos, evitar alcohol, etc."
                      value={formulaData.instruccionesEspeciales}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="espacio"/>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  {editingIndex >= 0 ? 'Actualizar' : 'Agregar'} Medicamento
                </button>
                {editingIndex >= 0 && (
                  <button type="button" className="btn btn-secondary ml-2" onClick={resetForm}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Lista de medicamentos agregados localmente */}
      <div className="espacio"/>
      <div className="card">
        <div className="card-header">
          <h2>Medicamentos en la Fórmula ({formulasMedicasLocales.length})</h2>
          {!readOnly && (
            <button
              className="btn btn-outline-primary ml-2"
              onClick={handleLimpiarLista}
              title="Limpiar toda la lista">
              Limpiar Lista
            </button>
          )}
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-sm table-hover">
              <thead>
              <tr>
                <th>Medicamento</th>
                <th>Dosis</th>
                <th>Frecuencia</th>
                <th>Duración</th>
                <th>Cantidad</th>
                <th>Instrucciones</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              {formulasMedicasLocales.map((formula, index) => (
                <tr key={formula.tempId} className={editingIndex === index ? 'table-warning' : ''}>
                  <td>
                    <strong>{formula.medicamentoInfo.nombre || 'N/A'}</strong>
                    <br/>
                    <small className="text-muted">{formula.medicamentoInfo.codigo}</small>
                  </td>
                  <td>{formula.dosis}</td>
                  <td>{formula.frecuencia}</td>
                  <td>{formula.duracionTratamiento}</td>
                  <td><span>{formula.cantidadTotal}</span></td>
                  <td>
                    <small>{formula.instruccionesEspeciales || 'No especificadas'}</small>
                  </td>
                  <td>
                    {!readOnly && (
                      <div className="btn-group" role="group">
                        <img src={EditIcon} alt="Editar"
                             className="btn-icon"
                             style={{marginRight: '5px', width: '25px', height: '25px', cursor: 'pointer'}}
                             onClick={() => handleEditLocal(index)}
                             data-tooltip-id="editLocalTooltip" data-tooltip-content="Editar medicamento"/>
                        <img src={EliminarIcon} alt="Eliminar"
                             className="btn-icon"
                             style={{width: '25px', height: '25px', cursor: 'pointer'}}
                             onClick={() => handleDeleteLocal(index)}
                             data-tooltip-id="deleteLocalTooltip" data-tooltip-content="Eliminar medicamento"/>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          {!readOnly && (
            <div className="text-center mt-3">
              <button
                className="btn btn-success btn-lg"
                onClick={handleGuardarTodas}
                disabled={isGuardando}
              >
                {isGuardando ? (
                  <>
                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-2"></i>
                    Guardar Fórmula Médica
                    ({formulasMedicasLocales.length} medicamento{formulasMedicasLocales.length !== 1 ? 's' : ''})
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="espacio"/>

      {/* Lista de medicamentos ya guardados */}
      <div className="card">
        <div className="card-header">
          <h2>Fórmulas Médicas Guardadas</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Número Fórmula</th>
                <th>Medicamento</th>
                <th>Dosis</th>
                <th>Frecuencia</th>
                <th>Duración</th>
                <th>Cantidad Total</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              {formulasMedicasGuardadas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    <em>No hay fórmulas médicas guardadas para este paciente.</em>
                  </td>
                </tr>
              ) : (
                formulasMedicasGuardadas.map((formula, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{formula.numeroFormula}</strong>
                      <br/>
                      <small className="text-muted">
                        {formula.fechaCreacion ? new Date(formula.fechaCreacion).toLocaleDateString() : 'N/A'}
                      </small>
                    </td>
                    <td>{formula.medicamento?.nombre || 'N/A'}</td>
                    <td>{formula.dosis}</td>
                    <td>{formula.frecuencia}</td>
                    <td>{formula.duracionTratamiento}</td>
                    <td><span>{formula.cantidadTotal}</span></td>
                    <td>
                      <img src={VerIcon} alt="Ver Fórmula"
                           style={{width: '30px', height: '30px', cursor: 'pointer'}}
                           onClick={() => handleView(formula)}
                           data-tooltip-id="viewTooltip" data-tooltip-content="Ver detalles de la fórmula"/>
                    </td>
                  </tr>
                ))
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Tooltip id="viewTooltip"/>
      <Tooltip id="editLocalTooltip"/>
      <Tooltip id="deleteLocalTooltip"/>
    </>
  );
};

export default FormulaMedica;