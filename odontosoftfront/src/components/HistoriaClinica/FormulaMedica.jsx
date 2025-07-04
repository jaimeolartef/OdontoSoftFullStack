import React, { useEffect, useState } from 'react';
import showMessage from "../../util/UtilMessage";
import { Tooltip } from "react-tooltip";
import EditIcon from '../../resource/EditIcon.png';
import VerIcon from "../../resource/ver.png";
import { apiGet, apiPost, apiPut } from '../apiService';
// TODO: Falta la relacion entre la formula médica y la historial cita médica

const FormulaMedica = ({ pacienteId, medicoId, readOnly }) => {
  const [estadosMedicamento, setEstadosMedicamento] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [formulasMedicas, setFormulasMedicas] = useState([]);
  const [selectedMedicamento, setSelectedMedicamento] = useState('');
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

        // Obtener fórmulas médicas existentes
        const formulasResponse = await apiGet('/formulas-medicas/listar', token);
        if (formulasResponse) {
          setFormulasMedicas(formulasResponse.filter(formula =>
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
          medicamentoId: medicamentoSeleccionado.id
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formulaData.medicamentoId || !formulaData.dosis ||
      !formulaData.frecuencia || !formulaData.duracionTratamiento) {
      showMessage('warning', 'Por favor complete todos los campos obligatorios');
      return;
    }

    try {
      const formulaToSend = {
        ...formulaData,
        fechaFormulacion: new Date().toISOString(),
        estadoMedicamento: "ACTIVO",
        numeroFormula: formulaData.numeroFormula || generateNumeroFormula(),
        idUsuarioCreacion: usuario,
        fechaCreacion: new Date().toISOString().split('T')[0]
      };
      console.log(formulaToSend);

      let response;
      if (editingIndex >= 0) {
        // Actualizar fórmula existente
        response = await apiPut('/formulas-medicas/modificar', formulaToSend, token);
      } else {
        // Crear nueva fórmula
        response = await apiPost('/formulas-medicas/crear', formulaToSend, token);
      }

      if (response) {
        if (editingIndex >= 0) {
          const updatedFormulas = [...formulasMedicas];
          updatedFormulas[editingIndex] = response;
          setFormulasMedicas(updatedFormulas);
          showMessage('success', 'Fórmula médica actualizada correctamente');
        } else {
          setFormulasMedicas(prev => [...prev, response]);
          showMessage('success', 'Fórmula médica creada correctamente');
        }

        resetForm();
      }
    } catch (error) {
      console.error('Error saving formula:', error);
      showMessage('error', 'Error al guardar la fórmula médica');
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

  const handleEdit = (index) => {
    const formula = formulasMedicas[index];
    setFormulaData(formula);

    const medicamento = medicamentos.find(med => med.id === formula.medicamentoId);
    if (medicamento) {
      setSelectedMedicamento(`${medicamento.codigo} - ${medicamento.nombre}`);
    }

    setEditingIndex(index);
  };

  const handleView = (index) => {
    const formula = formulasMedicas[index];
    // Implementar lógica para visualizar la fórmula en modo solo lectura
    console.log('Ver fórmula:', formula);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Fórmula Médica</h2>
      </div>
      <div className="card-body">
        {!readOnly && (
          <form onSubmit={handleSubmit}>
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
                    style={{backgroundColor: '#f8f9fa'}}
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

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                {editingIndex >= 0 ? 'Actualizar' : 'Agregar'} Fórmula
              </button>
              {editingIndex >= 0 && (
                <button type="button" className="btn btn-secondary ml-2" onClick={resetForm}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        )}

        <div className="espacio"/>

        <div className="form-group">
          <table className="table">
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
            {formulasMedicas.length === 0 ? (
              <tr>
                <td colSpan="7"><p>No hay fórmulas médicas disponibles.</p></td>
              </tr>
            ) : (
              formulasMedicas.map((formula, index) => (
                <tr key={index}>
                  <td>{formula.numeroFormula}</td>
                  <td>{formula.medicamento?.nombre || 'N/A'}</td>
                  <td>{formula.dosis}</td>
                  <td>{formula.frecuencia}</td>
                  <td>{formula.duracionTratamiento}</td>
                  <td>{formula.cantidadTotal}</td>
                  <td>
                    <img src={VerIcon} alt="Ver Fórmula"
                         style={{marginRight: '5px', width: '35px', height: '35px', cursor: 'pointer'}}
                         onClick={() => handleView(index)}
                         data-tooltip-id="viewTooltip" data-tooltip-content="Ver"/>
                    {!readOnly && (
                      <img src={EditIcon} alt="Editar Fórmula"
                           style={{marginRight: '5px', width: '35px', height: '35px', cursor: 'pointer'}}
                           onClick={() => handleEdit(index)}
                           data-tooltip-id="editTooltip" data-tooltip-content="Editar"/>
                    )}
                    <Tooltip id="viewTooltip"/>
                    <Tooltip id="editTooltip"/>
                    <Tooltip id="deleteTooltip"/>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormulaMedica;