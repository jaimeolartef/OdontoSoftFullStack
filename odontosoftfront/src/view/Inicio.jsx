import React from "react";
import logo from '../resource/LogoNegro.png';

const Inicio = () => {



  return(
    <div className="parent" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div className="container">
        <form>
          <img src={logo} alt="Logo" />
        </form>
      </div>
    </div>
  );
};

export default Inicio;