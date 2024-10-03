import React from 'react';
import './CondicionesDentales.css';

const CondicionesDentales = () => {
  return (
    <div className="condiciones-dentales">
      <table>
        <thead>
        <tr>
          <th>SIMB</th>
          <th>CONDICIONES</th>
          <th>COLOR</th>
          <th>SIMB</th>
          <th>CONDICIONES</th>
          <th>COLOR</th>
          <th>SIMB</th>
          <th>CONDICIONES</th>
          <th>COLOR</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="red-figure">■</td>
          <td>Caries o recurrencia</td>
          <td>Rojo</td>
          <td className="blue-figure">■</td>
          <td>Obturado</td>
          <td>Azul</td>
          <td className="blue-figure" style={{transform: 'scale(1.4)' }}>□</td>
          <td>Corona completa</td>
          <td>Azul</td>
        </tr>
        <tr>
          <td className="blue-figure" style={{transform: 'scale(1.4)' }}>=</td>
          <td>Prótesis existente</td>
          <td>Azul</td>
          <td className="red-figure">X</td>
          <td>Extracción Indicada</td>
          <td>Rojo</td>
          <td className="blue-figure" style={{transform: 'scale(1.6)' }}>-</td>
          <td>Sin erupcionar</td>
          <td>Azul</td>
        </tr>
        <tr>
          <td className="blue-figure">I</td>
          <td>Extraído</td>
          <td>Azul</td>
          <td className="red-figure">Δ</td>
          <td>Necesita endodoncia</td>
          <td>Rojo</td>
          <td className="blue-figure">Δ</td>
          <td>Con tratamiento de conductos</td>
          <td>Azul</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CondicionesDentales;
