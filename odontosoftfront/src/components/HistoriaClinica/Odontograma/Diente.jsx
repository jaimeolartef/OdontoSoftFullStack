import React, { useState, useEffect, useRef } from 'react';
import SimbList from './ListaSimb'; // Asegúrate de que la ruta sea correcta

const Segmento = ({ d, idsegmento, isSelected, onClick, detalleOdonto }) => {
  return (
    <g onClick={() => onClick(idsegmento)}>
      <path
        d={d}
        fill={isSelected ? 'red' : 'white'}
        stroke="black"
        strokeWidth="2"
      />
      {isSelected && detalleOdonto && (
        <text
          x="124" // Ajusta estas coordenadas según sea necesario
          y="76" // Ajusta estas coordenadas según sea necesario
          fontSize="20"
          fill="black"
          textAnchor="middle" // Centra el texto en las coordenadas especificadas
          alignmentBaseline="central">
          {detalleOdonto.idestado}
        </text>
      )}
    </g>
  );
};

const Diente = (toothNumber) => {
  const [selectedSegments, setSelectedSegments] = useState([false, false, false, false]);
  const [isCircleSelected, setIsCircleSelected] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(false);
  const listaRef = useRef(null);

  /**const [detalleOdonto, setDetalleOdonto] = useState({
    iddiente: '',
    idestado: '',
    idsegmento: 0
  });*/

  const [segmentos, setSegmentos] = useState({
  });

  const handleSegmentClick = (idsegmento) => {
    // console.log(`Segment clicked`, idsegmento);
    // console.log(`Diente toothNumber clicked`, toothNumber.toothNumber);
    const newSelectedSegments = [...selectedSegments];
    newSelectedSegments[idsegmento] = !newSelectedSegments[idsegmento];
    setSelectedSegments(newSelectedSegments);
    setMostrarLista(true);

    /**setDetalleOdonto(prev => ({
      ...prev,
      idsegmento: idsegmento
    }));*/

    setSegmentos(prev => ({
      ...prev,
      [idsegmento]: {
        ...prev[idsegmento],
        iddiente: toothNumber.toothNumber,
        idsegmento: idsegmento
      }
    }));
  };

  const handleSymbolSelect = (idestado, idsegmento) => {
    console.log(`Selected symbol: `, idestado);
    console.log(`Selected idsegmento: `, idsegmento);
    setMostrarLista(false);

    /**Actualizar detalleOdonto
    setDetalleOdonto(prev => ({
      ...prev,
      iddiente: toothNumber.toothNumber,
      idsegmento: idsegmento,
      idestado: idestado
    }));*/

    setSegmentos(prev => ({
      ...prev,
      [idsegmento]: {
        ...prev[idsegmento],
      }
    }));
    console.log(`Detalle odonto: `, segmentos);
  };

  const handleClickOutside = (event) => {
    if (listaRef.current && !listaRef.current.contains(event.target)) {
      setMostrarLista(false);
    }
  };

  const handleCircleClick = () => {
    setIsCircleSelected(!isCircleSelected);
    setMostrarLista(true); // Mostrar la lista al hacer clic en el círculo
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const segmentPaths = [
    'M 100 100 L 100 50 A 50 50 0 0 1 150 100 Z',
    'M 100 100 L 150 100 A 50 50 0 0 1 100 150 Z',
    'M 100 100 L 100 150 A 50 50 0 0 1 50 100 Z',
    'M 100 100 L 50 100 A 50 50 0 0 1 100 50 Z',
  ];

  return (
    <div>
      <svg width="75" height="75" viewBox="0 0 200 200" style={{ transform: 'rotate(45deg)' }}>
        {segmentPaths.map((d, idsegmento) => (
          <Segmento
            key={idsegmento}
            d={d}
            idsegmento={idsegmento}
            isSelected={selectedSegments[idsegmento]}
            detalleOdonto={segmentos[idsegmento]}
            onClick={handleSegmentClick}
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
      {mostrarLista && (
        <div ref={listaRef}>
          <SimbList toggleLista={() => setMostrarLista(false)} onSymbolSelect={handleSymbolSelect}/>
        </div>
      )}
    </div>
  );
};

export default Diente;