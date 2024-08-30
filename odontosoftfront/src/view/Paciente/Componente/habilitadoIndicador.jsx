import React, { useEffect } from 'react';

const HabilitadoIndicator = ({habilitado, onToggle}) => {
  useEffect(() => {
    console.log('Habilitado state updated:', habilitado);
  }, [habilitado]);

  const style = {
    color: habilitado ? 'green' : 'red',
    fontWeight: 'bold'
  };

  return (
    <span style={style}>
      <input
        name="habilitadopaciente"
        type="checkbox"
        checked={habilitado}
        onChange={(e) => onToggle({ target: { name: 'habilitado', value: e.target.checked, type: 'checkbox' } })}
        style={{ marginLeft: '10px' }}
      />
      {habilitado && (<label style={{color: "green", fontWeight: 'bold'}} >Habilitado</label>)}
      {!habilitado && (<label style={{color: "red", fontWeight: 'bold'}} >Inhabilitado</label>)}
    </span>
  );
};

export default HabilitadoIndicator;