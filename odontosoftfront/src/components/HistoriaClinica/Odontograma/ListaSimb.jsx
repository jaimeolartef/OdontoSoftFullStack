import React from 'react';
import './CondicionesDentales.css';
import './ListaSimb.css';

const ListaSimb = ({ toggleLista, onSymbolSelect, idsegmentoActual }) => {
  const handleTdClick = (idestado) => {
    onSymbolSelect(idestado, idsegmentoActual);
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
            <td className="blue-figure" onClick={() => handleTdClick('CC', '5')}>□</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('PE', '5')}>=</td>
          </tr>
          <tr>
            <td className="red-figure" onClick={() => handleTdClick('EI', '5')}>X</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('SE', '5')}>-</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('EX', '5')}>I</td>
          </tr>
          <tr>
            <td className="red-figure" onClick={() => handleTdClick('NE', '5')}>Δ</td>
          </tr>
          <tr>
            <td className="blue-figure" onClick={() => handleTdClick('CT', '5')}>Δ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListaSimb;
