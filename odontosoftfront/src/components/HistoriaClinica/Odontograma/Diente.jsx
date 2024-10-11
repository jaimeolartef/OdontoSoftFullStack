import React, { useState, useEffect, useRef } from 'react';
import SimbList from './ListaSimb'; // Asegúrate de que la ruta sea correcta

const Segmento = ({ d, index, isSelected, onClick, symbol }) => {
  return (
    <g onClick={() => onClick(index)}>
      <path
        d={d}
        fill={isSelected ? 'none' : 'white'}
        stroke="black"
        strokeWidth="2"
      />
      {isSelected && symbol && (
        <text
          x="124" // Ajusta estas coordenadas según sea necesario
          y="76" // Ajusta estas coordenadas según sea necesario
          fontSize="20"
          fill="black"
          textAnchor="middle" // Centra el texto en las coordenadas especificadas
          alignmentBaseline="central" // Centra verticalmente el texto en las coordenadas especificadas
        >
          {symbol}
        </text>
      )}
    </g>
  );
};

const Diente = (toothNumber) => {
  const [selectedSegments, setSelectedSegments] = useState([false, false, false, false]);
  const [isCircleSelected, setIsCircleSelected] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const listaRef = useRef(null);
  console.log(`Diente ${toothNumber} rendered`);

  const handleSegmentClick = (index) => {
    console.log(`Segment ${index} clicked`);
    console.log(`Diente ${toothNumber} clicked`);
    const newSelectedSegments = [...selectedSegments];
    newSelectedSegments[index] = !newSelectedSegments[index];
    setSelectedSegments(newSelectedSegments);
    setMostrarLista(true); // Mostrar la lista al hacer clic en un segmento
  };

  const handleSymbolSelect = (symbol) => {
    setSelectedSymbol(symbol);
    console.log(`Selected symbol: ${symbol}`);
    setMostrarLista(false);
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
        {segmentPaths.map((d, index) => (
          <Segmento
            key={index}
            d={d}
            index={index}
            isSelected={selectedSegments[index]}
            symbol={selectedSymbol}
            toothNumber={toothNumber}
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
          <SimbList toggleLista={() => setMostrarLista(false)} onSymbolSelect={handleSymbolSelect} />
        </div>
      )}
    </div>
  );
};

export default Diente;