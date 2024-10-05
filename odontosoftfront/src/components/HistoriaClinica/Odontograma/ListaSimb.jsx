import React from 'react';
import './CondicionesDentales.css';

const SimbList = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>SIMB</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td className="red-figure">■</td>
      </tr>
      <tr>
        <td className="red-figure">■</td>
      </tr>
      <tr>
        <td className="blue-figure" style={{transform: 'scale(1.4)'}}>□</td>
      </tr>
      <tr>
        <td className="blue-figure" style={{transform: 'scale(1.4)'}}>=</td>
      </tr>
      <tr>
        <td className="red-figure">X</td>
      </tr>
      <tr>
        <td className="blue-figure" style={{transform: 'scale(1.6)'}}>-</td>
      </tr>
      <tr>
        <td className="blue-figure">I</td>
      </tr>
      <tr>
        <td className="red-figure">Δ</td>
      </tr>
      <tr>
        <td className="blue-figure">Δ</td>
      </tr>
      </tbody>
    </table>
  );
};

export default SimbList;