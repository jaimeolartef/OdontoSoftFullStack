import React, { useState } from 'react';
import SimbList from './ListaSimb'; // Ensure the path is correct

const Segmento = ({ d, index, isSelected, onClick }) => {
  return (
    <path
      d={d}
      fill={isSelected ? 'orange' : 'white'}
      stroke="black"
      strokeWidth="2"
      onClick={() => onClick(index)}
    />
  );
};

const CircleSegments = () => {
  const [selectedSegments, setSelectedSegments] = useState([false, false, false, false]);
  const [isCircleSelected, setIsCircleSelected] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(false);

  const handleSegmentClick = (index) => {
    const newSelectedSegments = [...selectedSegments];
    newSelectedSegments[index] = !newSelectedSegments[index];
    setSelectedSegments(newSelectedSegments);
    toggleLista();
  };

  const toggleLista = () => {
    setMostrarLista(!mostrarLista);
  };

  const handleCircleClick = () => {
    setIsCircleSelected(!isCircleSelected);
    toggleLista();
  };

  const segmentPaths = [
    'M 100 100 L 100 50 A 50 50 0 0 1 150 100 Z',
    'M 100 100 L 150 100 A 50 50 0 0 1 100 150 Z',
    'M 100 100 L 100 150 A 50 50 0 0 1 50 100 Z',
    'M 100 100 L 50 100 A 50 50 0 0 1 100 50 Z',
  ];

  return (
    <div>
      <svg width="100" height="100" viewBox="0 0 200 200" style={{ transform: 'rotate(45deg)' }}>
        {segmentPaths.map((d, index) => (
          <Segmento
            key={index}
            d={d}
            index={index}
            isSelected={selectedSegments[index]}
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
        <SimbList toggleLista={toggleLista} />
      )}
    </div>
  );
};

export default CircleSegments;