import React, { useState } from 'react';

const Segment = ({ d, index, isSelected, onClick }) => {
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

  const handleSegmentClick = (index) => {
    const newSelectedSegments = [...selectedSegments];
    newSelectedSegments[index] = !newSelectedSegments[index];
    setSelectedSegments(newSelectedSegments);
  };

  const handleCircleClick = () => {
    setIsCircleSelected(!isCircleSelected);
  };

  const segmentPaths = [
    'M 100 100 L 100 50 A 50 50 0 0 1 150 100 Z', // Segment 1
    'M 100 100 L 150 100 A 50 50 0 0 1 100 150 Z', // Segment 2
    'M 100 100 L 100 150 A 50 50 0 0 1 50 100 Z',  // Segment 3
    'M 100 100 L 50 100 A 50 50 0 0 1 100 50 Z',   // Segment 4
  ];

  return (
    <svg width="100" height="100" viewBox="0 0 200 200" style={{ transform: 'rotate(45deg)' }}>
      {segmentPaths.map((d, index) => (
        <Segment
          key={index}
          d={d}
          index={index}
          isSelected={selectedSegments[index]}
          onClick={handleSegmentClick}
        />
      ))}
      <circle cx="100" cy="100" r="20"
        fill={isCircleSelected ? 'orange' : 'white'}
        stroke="black"
        strokeWidth="2"
        onClick={handleCircleClick}
      />
    </svg>
  );
};

export default CircleSegments;