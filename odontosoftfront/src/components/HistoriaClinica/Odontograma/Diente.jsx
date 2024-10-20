import React, { useState, useEffect, useRef } from 'react';
import './Odontograma.css';
import EstadoDiente from "./EstadoDiente";

const Segmento = ({ d, idsegmento, onClick, detalleOdonto }) => {
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
          x="124"
          y="76"
          fontSize="20"
          fill="black"
          textAnchor="middle"
          alignmentBaseline="central">
        </text>
      )}
    </g>
  );
};

const Circle = ({ idsegmento, detalleOdonto, onClick }) => {
  const fillColor = detalleOdonto?.idestado === 'CR' ? 'red' : (detalleOdonto?.idestado === 'OB' ? 'blue' : 'white');

  return (
    <circle
      cx="100"
      cy="100"
      r="20"
      fill={fillColor}
      stroke="black"
      strokeWidth="2"
      onClick={() => onClick(idsegmento)}
    />
  );
};

const Diente = ({ toothNumber, onClick, odontograma }) => {
  const [selectedSegments, setSelectedSegments] = useState([false, false, false, false]);
  const [isCircleSelected, setIsCircleSelected] = useState(false);
  const [segmentos, setSegmentos] = useState({});
  const [currentSegment, setCurrentSegment] = useState(null);
  const dropdownRef = useRef(null);


  const handleDropdownChange = (event) => {
    const value = event.target.value;
    let segmento = currentSegment;


    console.log('paso 2:  por handleDropdownChange');
    if (segmento !== null) {

      setSegmentos((prev) => ({
        ...prev,
        [segmento]: {
          ...prev[segmento],
          idestado: value,
        },
      }));
      // Llama al callback onClick con el número de diente y los segmentos actualizados
      onClick(toothNumber, {
        ...segmentos,
        [segmento]: {
          ...segmentos[segmento],
          idestado: value,
        },
      });
      setCurrentSegment(null);
    }
  };

  const closeDropdown = () => {
    setCurrentSegment(null);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    if (odontograma !== null && odontograma.length > 0) {
      odontograma.forEach((item) => {
        if (item.iddiente !== toothNumber) return;
        handleSegmentClick(item.idsegmento);
        handleDropdownChange({ target: { value: item.idestado } });
      });
    }
  }, [odontograma]);

  const handleSegmentClick = (idsegmento) => {
    console.log('paso 1:  por handleSegmentClick');
    const newSelectedSegments = [...selectedSegments];
    newSelectedSegments[idsegmento] = !newSelectedSegments[idsegmento];
    setSelectedSegments(newSelectedSegments);

    setCurrentSegment(idsegmento);

    setSegmentos((prev) => ({
      ...prev,
      [idsegmento]: {
        ...prev[idsegmento],
        iddiente: toothNumber,
        idsegmento: idsegmento,
      },
    }));
  };

  const handleCircleClick = (idsegmento) => {
    setIsCircleSelected(!isCircleSelected);
    handleSegmentClick(idsegmento);
    console.log('Círculo seleccionado:', idsegmento);
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
            onClick={handleSegmentClick}
          />
        ))}
        <Circle
          idsegmento={4} // Assuming the circle is a separate segment with id 4
          detalleOdonto={segmentos[4]}
          onClick={handleCircleClick}
        />
      </svg>

      {currentSegment !== null && (
        <div className="optionTooth" ref={dropdownRef}>
          <label htmlFor="estado-select">Selecciona un estado:</label>
          <select id="estado-select" onChange={handleDropdownChange}>
            <option value="">Seleccionar</option>
            <option value="DS">Diente sano</option>
            <option value="CR">Caries o recurrencia</option>
            <option value="OB">Obturado</option>
            <option value="CC">Corona completa</option>
            <option value="PE">Prótesis existente</option>
            <option value="EI">Extracción Indicada</option>
            <option value="SE">Sin erupcionar</option>
            <option value="EX">Extraído</option>
            <option value="NE">Necesita endodoncia</option>
            <option value="CT">Con tratamiento de conductos</option>
          </select>
        </div>
      )}

      <EstadoDiente simbolo="Δ" color="red" segmentos={segmentos} estado="NE"/>
      <EstadoDiente simbolo="Δ" color="blue" segmentos={segmentos} estado="CT"/>
      <EstadoDiente simbolo="I" color="blue" segmentos={segmentos} estado="EX"/>
      <EstadoDiente simbolo="‒" color="blue" segmentos={segmentos} estado="SE"/>
      <EstadoDiente simbolo="X" color="red" segmentos={segmentos} estado="EI"/>
      <EstadoDiente simbolo="=" color="blue" segmentos={segmentos} estado="PE"/>
      <EstadoDiente simbolo="□" color="blue" segmentos={segmentos} estado="CC"/>
      <EstadoDiente simbolo="" color="white" segmentos={segmentos} estado="DS"/>
    </div>
  );
};

export default Diente;