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
          <td>■</td>
          <td>Caries o recurrencia</td>
          <td>Rojo</td>
          <td>■</td>
          <td>Obturado</td>
          <td>Azul</td>
          <td>□</td>
          <td>Corona completa</td>
          <td>Azul</td>
        </tr>
        <tr>
          <td>=</td>
          <td>Prótesis existente</td>
          <td>Azul</td>
          <td>X</td>
          <td>Extracción Indicada</td>
          <td>Rojo</td>
          <td>-</td>
          <td>Sin erupcionar</td>
          <td>Azul</td>
        </tr>
        <tr>
          <td>I</td>
          <td>Extraído</td>
          <td>Azul</td>
          <td>Δ</td>
          <td>Necesita endodoncia</td>
          <td>Rojo</td>
          <td>Δ</td>
          <td>Con tratamiento de conductos</td>
          <td>Azul</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CondicionesDentales;
