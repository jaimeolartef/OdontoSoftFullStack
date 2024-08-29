import React from 'react';

const HabilitadoIndicator = ({ habilitado, onToggle }) => {
  const style = {
    color: habilitado ? 'green' : 'red',
    fontWeight: 'bold'
  };

  return (
    <span style={style}>
      <input
        type="checkbox"
        checked={habilitado}
        onChange={onToggle}
        style={{ marginLeft: '10px' }}
      />
      {habilitado ? 'Habilitado' : 'Inhabilitado'}
    </span>
  );
};

export default HabilitadoIndicator;

