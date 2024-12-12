import React, { useEffect, useState } from "react";
import Logo from '../resource/LogoNegro.png';

const Inicio = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    // Cargar el menú desde el localStorage
    const menuUser = localStorage.getItem('menuUser');
    if (menuUser) {
      setMenu(JSON.parse(menuUser));
    } else {
      // Si no hay menú en el localStorage, realizar una llamada a la API para obtenerlo
      // axios.get('/api/menu').then(response => setMenu(response.data));
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