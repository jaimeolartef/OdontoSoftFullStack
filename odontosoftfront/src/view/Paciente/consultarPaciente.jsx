import React, { useState } from 'react';
import './consultarPaciente.css';
import Logo from '../../resource/LogoNegro.png';
import axios from "axios";


const ConsultarPaciente = () => {


  return (
    <div className="medical-form-container">
      <header>
        <img src={Logo} alt="Logo" />
        <h1>Registrar Paciente</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <section className="personal-information">
          <h3>Consultar Personal</h3>

        </section>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
