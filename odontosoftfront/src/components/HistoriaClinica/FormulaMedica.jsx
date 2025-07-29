import React, {useEffect, useState} from 'react';
import showMessage from "../../util/UtilMessage";
import {Tooltip} from "react-tooltip";
import EditIcon from '../../resource/EditIcon.png';
import VerIcon from "../../resource/ver.png";
import {apiGet, apiPost} from '../apiService';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import EliminarIcon from "../../resource/Eliminar.png";


const FormulaMedica = ({pacienteId, medicoId, readOnly, idhistoriaclinica}) => {
  const [estadosMedicamento, setEstadosMedicamento] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [formulasMedicasGuardadas, setFormulasMedicasGuardadas] = useState([]);
  const [formulasMedicasLocales, setFormulasMedicasLocales] = useState([]);
  const [selectedMedicamento, setSelectedMedicamento] = useState('');
  const [isGuardando, setIsGuardando] = useState(false);
  const [pacienteInfo, setPacienteInfo] = useState({});
  const [medicoInfo, setMedicoInfo] = useState({});
  const [tipoFrecuencia, setTipoFrecuencia] = useState('veces_dia'); // 'veces_dia', 'cada_horas', 'personalizada'
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
  const [showModal, setShowModal] = useState(false);
  const [modalFormula, setModalFormula] = useState(null);

  // Opciones predefinidas para frecuencias
  const frecuenciasPredefinidas = {
    veces_dia: [
      { value: '1 vez al día', numeric: 1 },
      { value: '2 veces al día', numeric: 2 },
      { value: '3 veces al día', numeric: 3 },
      { value: '4 veces al día', numeric: 4 },
      { value: '5 veces al día', numeric: 5 },
      { value: '6 veces al día', numeric: 6 }
    ],
    cada_horas: [
      { value: 'Cada 4 horas', numeric: 6 },
      { value: 'Cada 6 horas', numeric: 4 },
      { value: 'Cada 8 horas', numeric: 3 },
      { value: 'Cada 12 horas', numeric: 2 },
      { value: 'Cada 24 horas', numeric: 1 }
    ],
    personalizada: [
      { value: 'Antes de cada comida', numeric: 3 },
      { value: 'Después de cada comida', numeric: 3 },
      { value: 'Con el desayuno', numeric: 1 },
      { value: 'Con el almuerzo', numeric: 1 },
      { value: 'Con la cena', numeric: 1 },
      { value: 'Al acostarse', numeric: 1 },
      { value: 'Al levantarse', numeric: 1 },
      { value: 'Cuando sea necesario (PRN)', numeric: 1 },
      { value: 'Una vez por semana', numeric: 0.14 }
    ]
  };

  // Función mejorada para calcular la cantidad total
  const calcularCantidadTotal = (frecuencia, duracion) => {
    if (!frecuencia || !duracion) return '';

    // Buscar el valor numérico en las opciones predefinidas
    let frecuenciaNum = 0;

    // Buscar en todas las categorías de frecuencias predefinidas
    Object.values(frecuenciasPredefinidas).forEach(categoria => {
      const opcion = categoria.find(opt => opt.value === frecuencia);
      if (opcion) {
        frecuenciaNum = opcion.numeric;
      }
    });

    // Si no se encuentra en predefinidas, intentar extraer número del texto
    if (frecuenciaNum === 0) {
      frecuenciaNum = parseFloat(frecuencia.match(/\d+(\.\d+)?/)?.[0] || '0');
    }

    // Extraer números de duración y convertir a días
    let duracionDias = 0;
    const duracionNum = parseInt(duracion.match(/\d+/)?.[0] || '0');

    if (duracion.toLowerCase().includes('día') || duracion.toLowerCase().includes('dia')) {
      duracionDias = duracionNum;
    } else if (duracion.toLowerCase().includes('semana')) {
      duracionDias = duracionNum * 7;
    } else if (duracion.toLowerCase().includes('mes')) {
      duracionDias = duracionNum * 30;
    } else {
      // Por defecto asumir días
      duracionDias = duracionNum;
    }

    if (frecuenciaNum > 0 && duracionDias > 0) {
      const cantidadTotal = Math.ceil(frecuenciaNum * duracionDias);
      return cantidadTotal.toString();
    }

    return '';
  };

  // Función para generar reporte PDF en formato media carta
  const generatePDFReport = (numeroFormula, medicamentosLista, paciente, medico) => {
    // Crear PDF en formato media carta (5.5" x 8.5" = 139.7mm x 215.9mm)
    const doc = new jsPDF('p', 'mm', [139.7, 215.9]);

    // Configuración de fuentes
    doc.setFont('helvetica');

    // Encabezado más compacto
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text('FÓRMULA MÉDICA', 69.85, 15, {align: 'center'});

    // Línea separadora
    doc.setLineWidth(0.3);
    doc.line(10, 18, 129.7, 18);

    // Información del paciente y médico más compacta
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);

    // Información del paciente en dos columnas
    doc.setFont('helvetica', 'bold');
    doc.text('PACIENTE:', 10, 25);
    doc.setFont('helvetica', 'normal');
    doc.text(`${paciente.primernombre || ''} ${paciente.primerapellido || ''}`, 10, 30);
    doc.text(`Doc: ${paciente.documento || 'N/A'}`, 10, 34);
    doc.text(`Tel: ${paciente.telefono || 'N/A'}`, 10, 38);

    // Información del médico
    doc.setFont('helvetica', 'bold');
    doc.text('MÉDICO:', 75, 25);
    doc.setFont('helvetica', 'normal');
    doc.text(`${medico.nombre || 'N/A'}`, 75, 30);
    doc.text(`${medico.especialidad || 'N/A'}`, 75, 34);
    doc.text(`Mat: ${medico.matricula || 'N/A'}`, 75, 38);

    // Información de la fórmula
    doc.setFont('helvetica', 'bold');
    doc.text('FÓRMULA:', 10, 46);
    doc.setFont('helvetica', 'normal');
    doc.text(`No: ${numeroFormula}`, 10, 50);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 75, 50);

    // Tabla de medicamentos más compacta
    const tableData = medicamentosLista.map((med, index) => [
      index + 1,
      med.medicamentoInfo?.nombre || 'N/A',
      med.dosis,
      med.frecuencia,
      med.duracionTratamiento,
      med.cantidadTotal,
      (med.instruccionesEspeciales && med.instruccionesEspeciales.length > 30)
        ? med.instruccionesEspeciales.substring(0, 30) + '...'
        : med.instruccionesEspeciales || 'N/A'
    ]);

    doc.autoTable({
      startY: 55,
      head: [['#', 'Medicamento', 'Dosis', 'Frecuencia', 'Duración', 'Cant.', 'Instrucciones']],
      body: tableData,
      styles: {
        fontSize: 7,
        cellPadding: 1.5,
        lineColor: [128, 128, 128],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 7
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: {left: 10, right: 10},
      columnStyles: {
        0: {cellWidth: 8},  // #
        1: {cellWidth: 35}, // Medicamento
        2: {cellWidth: 15}, // Dosis
        3: {cellWidth: 20}, // Frecuencia
        4: {cellWidth: 15}, // Duración
        5: {cellWidth: 10}, // Cantidad
        6: {cellWidth: 26.7} // Instrucciones
      },
      didDrawPage: function (data) {
        // Si hay más de una página, agregar número de página
        if (data.pageNumber > 1) {
          doc.setFontSize(7);
          doc.text(`Página ${data.pageNumber}`, 10, 210);
        }
      }
    });

    // Pie de página más compacto
    const finalY = doc.lastAutoTable.finalY || 55;

    // Verificar si hay espacio suficiente para la firma
    if (finalY > 170) {
      // Si no hay espacio, agregar nueva página
      doc.addPage();
      var signatureY = 20;
    } else {
      var signatureY = finalY + 15;
    }

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('_____________________________', 10, signatureY);
    doc.text('Firma del Médico', 10, signatureY + 7);
    doc.text(`Dr. ${medico.nombre || 'N/A'}`, 10, signatureY + 12);
    doc.text(`Matrícula: ${medico.matricula || 'N/A'}`, 10, signatureY + 17);

    // Fecha y hora de generación en la parte inferior
    doc.setFontSize(6);
    doc.text(`Generado: ${new Date().toLocaleDateString('es-ES')} ${new Date().toLocaleTimeString('es-ES')}`, 10, 210);

    // Agregar número de página en todas las páginas
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      if (pageCount > 1) {
        doc.setFontSize(6);
        doc.text(`${i}/${pageCount}`, 125, 210);
      }
    }

    // Guardar el PDF
    doc.save(`Formula_Medica_${numeroFormula}.pdf`);
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

        // Obtener información del paciente
        const pacienteResponse = await apiGet(`/pacientes/consultar/${pacienteId}`, token);
        if (pacienteResponse) {
          setPacienteInfo(pacienteResponse);
        }

        // Obtener información del médico
        const medicoResponse = await apiGet(`/doctor/consultar/${medicoId}`, token);
        if (medicoResponse) {
          setMedicoInfo(medicoResponse);
        }

        // Obtener fórmulas médicas existentes guardadas
        const formulasResponse = await apiGet('/formulas-medicas/listar/' + idhistoriaclinica, token);
        if (formulasResponse) {
          setFormulasMedicasGuardadas(formulasResponse.map((formula, index) => ({...formula, index})));
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
    const {name, value} = event.target;

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

  const handleTipoFrecuenciaChange = (event) => {
    const nuevoTipo = event.target.value;
    setTipoFrecuencia(nuevoTipo);

    // Limpiar la frecuencia cuando cambie el tipo
    setFormulaData(prev => ({
      ...prev,
      frecuencia: '',
      cantidadTotal: ''
    }));
  };

  const generateNumeroFormula = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `FM-${timestamp}-${random}`;
  };

  const handleAgregarMedicamento = (event) => {
    event.preventDefault();

    // Validar campos obligatorios
    if (!formulaData.medicamentoId || !formulaData.dosis ||
      !formulaData.frecuencia || !formulaData.duracionTratamiento) {
      showMessage('warning', 'Por favor complete todos los campos obligatorios');
      return;
    }

    // Modo nuevo: verificar si el medicamento ya existe
    if (editingIndex < 0) {
      const existeMedicamento = formulasMedicasLocales.some(
        formula => formula.medicamentoId === formulaData.medicamentoId
      );

      if (existeMedicamento) {
        showMessage('warning', 'Este medicamento ya está en la lista. Puede editarlo si necesita cambiar la dosificación.');
        return;
      }

      // Crear nuevo medicamento
      const nuevoMedicamento = {
        ...formulaData,
        fechaFormulacion: new Date().toISOString(),
        estadoMedicamento: "ACTIVO",
        idhistoriaclinica: idhistoriaclinica,
        idUsuarioCreacion: usuario,
        fechaCreacion: new Date().toISOString().split('T')[0]
      };

      // Agregar a la lista
      setFormulasMedicasLocales(prev => [...prev, { ...nuevoMedicamento, index: prev.length }]);
    }
    // Modo edición: actualizar medicamento existente
    else {
      const formulasActualizadas = [...formulasMedicasLocales];
      formulasActualizadas[editingIndex] = {
        ...formulaData,
        fechaFormulacion: new Date().toISOString()
      };

      setFormulasMedicasLocales(formulasActualizadas.map((formula, i) => ({ ...formula, index: i })));
    }

    resetForm();
  };

  const handleGuardarTodas = async () => {
    if (formulasMedicasLocales.length === 0) {
      showMessage('warning', 'No hay medicamentos en la lista para guardar');
      return;
    }

    let isMedicamentoRepetido = false;
    let nombresMedicamentos = '';

    formulasMedicasLocales.forEach(medicamento => {
      // Verificar medicamentos repetidos antes de guardar
      const medicamentosRepetidos = formulasMedicasLocales.filter(medicamento => {
        return formulasMedicasGuardadas.some(guardado =>
          guardado.medicamento.id === medicamento.medicamentoInfo.id
        );
      });

      if (medicamentosRepetidos.length > 0) {
        isMedicamentoRepetido = true;
        nombresMedicamentos = medicamentosRepetidos.map(med => med.medicamentoInfo?.nombre).join(', ');
      }
    });

    setIsGuardando(true);

    try {
      if (isMedicamentoRepetido) {
        showMessage('warning', `Los siguientes medicamentos ya están guardados: ${nombresMedicamentos}`);
      } else {
        const numeroFormula = generateNumeroFormula();

        // Crear un objeto fórmula médica que contenga todos los medicamentos
        for (const medicamento of formulasMedicasLocales) {
          const idx = formulasMedicasLocales.indexOf(medicamento);
          // Guardar la fórmula completa con todos los medicamentos
          medicamento.numeroFormula = numeroFormula;
          const respuesta = await apiPost('/formulas-medicas/crear', medicamento, token);

          if (respuesta) {
            // Actualizar la lista de fórmulas guardadas
            setFormulasMedicasGuardadas(prev => [...prev, {...respuesta, index: prev.length}]);
          }

          // Aquí puedes acceder a cada medicamento y su índice
          console.log(`Medicamento ${idx}:`, medicamento);
        }

        // Generar el reporte PDF
        generatePDFReport(numeroFormula, formulasMedicasLocales, pacienteInfo, medicoInfo);

        // Limpiar la lista local
        showMessage('success', `Fórmula médica guardada exitosamente con ${formulasMedicasLocales.length} medicamento(s). Se ha generado el reporte PDF.`);
        setFormulasMedicasLocales([]);
      }

    } catch (error) {
      console.error('Error saving formula:', error);
      showMessage('error', 'Error al guardar la fórmula médica');
    } finally {
      setIsGuardando(false);
    }
  };

  const handleGenerarReporte = (formula) => {
    // Generar reporte para una fórmula específica ya guardada
    const medicamentosFormula = [formula]; // Convertir a array para reutilizar la función
    generatePDFReport(formula.numeroFormula, medicamentosFormula, pacienteInfo, medicoInfo);
    showMessage('success', 'Reporte PDF generado correctamente');
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
    setTipoFrecuencia('veces_dia');
  };

  const handleEditLocal = (index) => {
    const formula = formulasMedicasLocales[index];
    setFormulaData(formula);

    const medicamento = medicamentos.find(med => med.id === formula.medicamentoId);
    if (medicamento) {
      setSelectedMedicamento(`${medicamento.codigo} - ${medicamento.nombre}`);
    }

    // Determinar el tipo de frecuencia basado en el valor guardado
    let tipoDetectado = 'veces_dia';
    Object.entries(frecuenciasPredefinidas).forEach(([tipo, opciones]) => {
      if (opciones.some(op => op.value === formula.frecuencia)) {
        tipoDetectado = tipo;
      }
    });
    setTipoFrecuencia(tipoDetectado);

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
    setModalFormula(formula);
    setShowModal(true);
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
                      readOnly={editingIndex > 0}
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
                    <label htmlFor="tipoFrecuencia">Tipo de Frecuencia *</label>
                    <select
                      className="form-control"
                      id="tipoFrecuencia"
                      value={tipoFrecuencia}
                      onChange={handleTipoFrecuenciaChange}
                      required
                    >
                      <option value="veces_dia">Veces por día</option>
                      <option value="cada_horas">Cada ciertas horas</option>
                      <option value="personalizada">Horarios específicos</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="frecuencia">Frecuencia *</label>
                    <select
                      className="form-control"
                      id="frecuencia"
                      name="frecuencia"
                      value={formulaData.frecuencia}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccione frecuencia</option>
                      {frecuenciasPredefinidas[tipoFrecuencia].map((opcion, index) => (
                        <option key={index} value={opcion.value}>
                          {opcion.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="duracionTratamiento">Duración Tratamiento *</label>
                    <select
                      className="form-control"
                      id="duracionTratamiento"
                      name="duracionTratamiento"
                      value={formulaData.duracionTratamiento}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccione duración</option>
                      <optgroup label="Días">
                        <option value="1 día">1 día</option>
                        <option value="3 días">3 días</option>
                        <option value="5 días">5 días</option>
                        <option value="7 días">7 días</option>
                        <option value="10 días">10 días</option>
                        <option value="14 días">14 días</option>
                        <option value="15 días">15 días</option>
                        <option value="21 días">21 días</option>
                        <option value="30 días">30 días</option>
                      </optgroup>
                      <optgroup label="Semanas">
                        <option value="1 semana">1 semana</option>
                        <option value="2 semanas">2 semanas</option>
                        <option value="3 semanas">3 semanas</option>
                        <option value="4 semanas">4 semanas</option>
                        <option value="6 semanas">6 semanas</option>
                        <option value="8 semanas">8 semanas</option>
                      </optgroup>
                      <optgroup label="Meses">
                        <option value="1 mes">1 mes</option>
                        <option value="2 meses">2 meses</option>
                        <option value="3 meses">3 meses</option>
                        <option value="6 meses">6 meses</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
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
              </div>

              <div className="espacio"></div>
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
              <div className="d-flex justify-content-center mt-3">
                <button type="submit" className="btn btn-primary mx-2">
                  {editingIndex >= 0 ? 'Actualizar' : 'Agregar'} Medicamento
                </button>
                {editingIndex >= 0 && (
                  <button type="button" className="btn btn-secondary mx-2" onClick={resetForm}>
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
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Medicamentos en la Fórmula ({formulasMedicasLocales.length})</h2>
          {!readOnly && (
            <img src={EliminarIcon} alt="Limpiar toda la lista"
                 style={{marginRight: '5px', width: '35px', height: '35px', cursor: 'pointer'}}
                 onClick={handleLimpiarLista}
                 data-tooltip-id="editTooltip" data-tooltip-content="Eliminar"/>
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
                    <strong>{formula.medicamentoInfo?.nombre || 'N/A'}</strong>
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
                    Guardar y Generar Reporte
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
                           style={{width: '30px', height: '30px', cursor: 'pointer', marginRight: '5px'}}
                           onClick={() => handleView(formula)}
                           data-tooltip-id="viewTooltip" data-tooltip-content="Ver detalles de la fórmula"/>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleGenerarReporte(formula)}
                        title="Generar reporte PDF"
                      >
                        📄 PDF
                      </button>
                    </td>
                  </tr>
                ))
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && modalFormula && (
        <div className="modal fade show" style={{display: 'block'}} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Fórmula Médica</h5>
              </div>
              <div className="modal-body">
                <p><strong>Número:</strong> {modalFormula.numeroFormula || 'N/A'}</p>
                <p>
                  <strong>Medicamento:</strong> {modalFormula.medicamento?.nombre || modalFormula.medicamentoInfo?.nombre || 'N/A'}
                </p>
                <p><strong>Dosis:</strong> {modalFormula.dosis}</p>
                <p><strong>Frecuencia:</strong> {modalFormula.frecuencia}</p>
                <p><strong>Duración:</strong> {modalFormula.duracionTratamiento}</p>
                <p><strong>Cantidad Total:</strong> {modalFormula.cantidadTotal}</p>
                <p><strong>Instrucciones:</strong> {modalFormula.instruccionesEspeciales || 'No especificadas'}</p>
                <p><strong>Observaciones:</strong> {modalFormula.observaciones || 'N/A'}</p>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <div className="d-flex justify-content-center w-100">
                  <button
                    type="button"
                    className="btn btn-primary mx-2"
                    onClick={() => handleGenerarReporte(modalFormula)}
                    style={{minWidth: '140px'}}
                  >
                    📄 Generar PDF
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={() => setShowModal(false)}
                    style={{minWidth: '140px'}}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Tooltip id="viewTooltip"/>
      <Tooltip id="editLocalTooltip"/>
      <Tooltip id="deleteLocalTooltip"/>
    </>
  );
};

export default FormulaMedica;