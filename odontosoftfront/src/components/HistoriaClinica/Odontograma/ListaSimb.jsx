import React from 'react';
import './CondicionesDentales.css';
import './ListaSimb.css';

const SimbList = ({ toggleLista, onSymbolSelect }) => {
  const handleTdClick = (symbol) => {
    onSymbolSelect(symbol);
    toggleLista();
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
            <td className="red-figure" onClick={() => handleTdClick('CR')}>■</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('OB')}>■</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('CC')}>□</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('PE')}>=</td>
          </tr>
          <tr>
            <td className="red-figure" onClick={() => handleTdClick('EI')}>X</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('SE')}>-</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('EX')}>I</td>
          </tr>
          <tr>
            <td className="red-figure" onClick={() => handleTdClick('NE')}>Δ</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('CT')}>Δ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SimbList;