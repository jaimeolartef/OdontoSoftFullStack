import React, { useEffect, useState } from "react";
import Logo from '../resource/LogoNegro.png';

const Inicio = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    // Cargar el menú desde el sessionStorage
    const menuUser = sessionStorage.getItem('menuUser');
    if (menuUser) {
      setMenu(JSON.parse(menuUser));
    }
  }, []);

  return (
    <div className="parent" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <div className="container">
        <form>
          <img src={Logo} alt="Logo" />
        </form>
      </div>
    </div>
  );
};

export default Inicio;