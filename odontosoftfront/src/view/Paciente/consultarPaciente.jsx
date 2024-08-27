import React, { useState } from 'react';
import './consultarPaciente.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';


const ConsultarPaciente = () => {

  const handleSubmit = (e) => {

  };

  return (
    <div className="medical-form-container">
      <header>
        <img src={Logo} alt="Logo" />
        <h1>Registrar Paciente</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <section className="personal-information">
          <h3>Consultar paciente</h3>

        </section>
        <button type="submit"  className="btn">Consultar</button>
      </form>
    </div>
  );
}

export default ConsultarPaciente