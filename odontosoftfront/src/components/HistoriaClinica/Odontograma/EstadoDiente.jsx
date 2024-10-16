import React from 'react';

const EstadoDiente = ({ simbolo, color, segmentos, estado}) => {

  const estadoDiente = Object.values(segmentos).some(segmento => segmento.idestado === estado);
  if (!estadoDiente) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '60px',
        color: color,
        pointerEvents: 'none', // No interferir con otros elementos clicables
      }}
    >
      {simbolo}
    </div>
  );
};

export default EstadoDiente;