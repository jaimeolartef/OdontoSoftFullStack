import React, { useState } from 'react';
import './Odontograma.css';

const Segmento = ({ d, idsegmento, onClick, detalleOdonto }) => {
  // Determina el color basado en el estado seleccionado
  const fillColor = detalleOdonto?.idestado === 'CR' ? 'red' : (detalleOdonto?.idestado === 'OB' ? 'blue' : 'white');

  return (
    <g onClick={(event) => onClick(idsegmento, event)}>
      <path
        d={d}
        fill={fillColor}
        stroke="black"
        strokeWidth="2"
      />
      {detalleOdonto && (
        <text
          x="124" // Ajusta estas coordenadas según sea necesario
          y="76"  // Ajusta estas coordenadas según sea necesario
          fontSize="20"
          fill="black"
          textAnchor="middle"
          alignmentBaseline="central">
        </text>
      )}
    </g>
  );
};

const Diente = (toothNumber) => {
  const [selectedSegments, setSelectedSegments] = useState([false, false, false, false]);
  const [isCircleSelected, setIsCircleSelected] = useState(false);
  const [segmentos, setSegmentos] = useState({});
  const [currentSegment, setCurrentSegment] = useState(null);

  const handleSegmentClick = (event) => {
    const newSelectedSegments = [...selectedSegments];
    newSelectedSegments[event] = !newSelectedSegments[event];
    setSelectedSegments(newSelectedSegments);

    // Establece el segmento actual para mostrar la lista desplegable
    setCurrentSegment(event);

    setSegmentos((prev) => ({
      ...prev,
      [event]: {
        ...prev[event],
        iddiente: toothNumber.toothNumber,
        idsegmento: event,
      },
    }));
  };

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    console.log('Dropdown value:', value);

    if (currentSegment !== null) {
      // Actualiza el segmento actual con el valor seleccionado en la lista desplegable
      setSegmentos((prev) => ({
        ...prev,
        [currentSegment]: {
          ...prev[currentSegment],
          idestado: value, // Guardar el estado seleccionado
        },
      }));

      // Ocultar la lista desplegable después de seleccionar una opción
      setCurrentSegment(null);
    }
  };

  const handleCircleClick = () => {
    setIsCircleSelected(!isCircleSelected);
  };

  const segmentPaths = [
    'M 100 100 L 100 50 A 50 50 0 0 1 150 100 Z',
    'M 100 100 L 150 100 A 50 50 0 0 1 100 150 Z',
    'M 100 100 L 100 150 A 50 50 0 0 1 50 100 Z',
    'M 100 100 L 50 100 A 50 50 0 0 1 100 50 Z',
  ];

  return (
    <div style={{ position: 'relative' }}>
      <svg width="75" height="75" viewBox="0 0 200 200" style={{ transform: 'rotate(45deg)' }}>
        {segmentPaths.map((d, idsegmento) => (
          <Segmento
            key={idsegmento}
            d={d}
            idsegmento={idsegmento}
            detalleOdonto={segmentos[idsegmento]}
            onClick={(e) => handleSegmentClick(e)} // Capturar el evento click para obtener las coordenadas
          />
        ))}
        <circle
          cx="100"
          cy="100"
          r="20"
          fill={isCircleSelected ? 'orange' : 'white'}
          stroke="black"
          strokeWidth="2"
          onClick={handleCircleClick}
        />
      </svg>

      {/* Mostrar lista desplegable flotante si hay un segmento seleccionado */}
      {currentSegment !== null && (
        <div
          className="optionTooth">
          <label htmlFor="estado-select">Selecciona un estado:</label>
          <select id="estado-select" onChange={handleDropdownChange}>
            <option value="">Seleccionar</option>
            <option value="CR">Caries o recurrencia</option>
            <option value="OB">Obturado</option>
            <option value="CC">Corona completa</option>
            <option value="PE">Prótesis existente</option>
            <option value="EI">Extracción Indicada</option>
            <option value="EX">Extraído</option>
            <option value="NE">Necesita endodoncia</option>
            <option value="CT">Con tratamiento de conductos</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Diente;
