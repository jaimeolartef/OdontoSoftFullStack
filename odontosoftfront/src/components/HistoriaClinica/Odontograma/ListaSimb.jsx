import React from 'react';
import './CondicionesDentales.css';
import './ListaSimb.css';

const SimbList = () => {
  const handleTdClick = (symbol) => {
    console.log(`Selected symbol: ${symbol}`);
    // Aquí puedes agregar la acción que deseas realizar
  };

  return (
    <div className="lista-flotante">
      <table>
        <thead>
          <tr>
            <th>SIMB</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="red-figure" onClick={() => handleTdClick('■')}>■</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('■')}>■</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('□')}>□</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('=')}>=</td>
          </tr>
          <tr>
            <td className="red-figure" onClick={() => handleTdClick('X')}>X</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('-')}>-</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('I')}>I</td>
          </tr>
          <tr>
            <td className="red-figure" onClick={() => handleTdClick('Δ')}>Δ</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('Δ')}>Δ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SimbList;