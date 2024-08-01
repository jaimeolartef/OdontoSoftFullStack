import React from "react";
import logo from '../resource/LogoNegro.png';

const Inicio = () => {

  // Recuperar la variable del localStorage
  let data = localStorage.getItem('menuUser');
  let dataMenu = "";

  // Comprobar si la variable existe
  if (data) {
    // Convertir la cadena JSON en un objeto JavaScript
    data = JSON.parse(data);

    // Recorrer el objeto
    for (let key in data) {
      console.log(`Key: ${key}, Value: ${data[key]}`);
      if (data[key] != null) {
        dataMenu = data[key];
        console.log(`El usuario tiene acceso a la opción de menú: ' ${dataMenu[key]}`);
      }
    }
  } else {
    console.log('No data found in localStorage for key "menuUser"');
  }


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