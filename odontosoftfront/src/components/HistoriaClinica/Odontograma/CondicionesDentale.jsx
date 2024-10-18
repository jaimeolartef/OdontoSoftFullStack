import React from 'react';
import './CondicionesDentales.css';

const CondicionesDentales = () => {
  return (
    <div className="condiciones-dentales">
      <table>
  <thead>
  <tr>
    <th>CONDICIONES</th>
    <th>SIMB</th>
    <th>CONDICIONES</th>
    <th>SIMB</th>
    <th>CONDICIONES</th>
    <th>SIMB</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Caries o recurrencia</td>
    <td className="red-figure">■</td>
    <td>Obturado</td>
    <td className="blue-figure">■</td>
    <td>Corona completa</td>
    <td className="blue-figure" style={{transform: 'scale(1.4)' }}>□</td>
  </tr>
  <tr>
    <td>Prótesis existente</td>
    <td className="blue-figure" style={{transform: 'scale(1.4)' }}>=</td>
    <td>Extracción Indicada</td>
    <td className="red-figure">X</td>
    <td>Sin erupcionar</td>
    <td className="blue-figure" style={{transform: 'scale(1.6)' }}>‒</td>
  </tr>
  <tr>
    <td>Extraído</td>
    <td className="blue-figure">I</td>
    <td>Necesita endodoncia</td>
    <td className="red-figure">Δ</td>
    <td>Con tratamiento de conductos</td>
    <td className="blue-figure">Δ</td>
  </tr>
  </tbody>
</table>
    </div>
  );
};

export default CondicionesDentales;
