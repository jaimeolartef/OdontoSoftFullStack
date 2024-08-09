import React from "react";
import Logo from '../resource/LogoNegro.png';

const Inicio = () => {



  return(
    <div className="parent" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div className="container">
        <form>
          <img src={Logo} alt="Logo" />
        </form>
      </div>
    </div>
  );
};

export default Inicio;