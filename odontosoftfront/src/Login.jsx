import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Asegúrate de tener un archivo CSS para estilos adicionales
import axios from "axios";
import sha256 from 'crypto-js/sha256';
import {connect} from "react-redux";
import {useNavigate} from 'react-router-dom';
import config from './config';
import showMessage from "../src/util/UtilMessage";
import { Link } from 'react-router-dom';
import { apiGet, apiPost} from './components/apiService';

const Login = (props) => {
  const [loginObj, setLoginObj] = useState({
    usuario: '', clave: '',
  });

  const [usuarioDto, setUsuarioDto] = useState({
    codigo: ''
  });

  const [validation, setValidation] = useState({
    usuario: null, clave: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
      'use strict'

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
    })();
  }, []);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setLoginObj((prevLoginObj) => ({
      ...prevLoginObj, [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const hash = sha256(loginObj.clave).toString();
      const loginData = {...loginObj, clave: hash};

      // 1. Login
      const loginResponse = await apiPost('/user/login', loginData, {includeAuth: false});
      if (loginResponse) {
        sessionStorage.setItem('jsonwebtoken', loginResponse.token);
        const usuarioCodigo = loginResponse.usuario;
        setUsuarioDto({codigo: usuarioCodigo});

        // 2. Validar rol
        const roleResponse = await apiPost('/user/validateRole', {codigo: usuarioCodigo});
        const responseValidateRole = JSON.stringify(roleResponse.menus);
        sessionStorage.setItem('menuUser', responseValidateRole);
        sessionStorage.setItem('username', usuarioCodigo);
        sessionStorage.setItem('idPaciente', roleResponse.idPatient);
        sessionStorage.setItem('Rol', roleResponse.rol);
        sessionStorage.setItem('nombre', roleResponse.nombreUsuario);

        // 3. Si es paciente, obtener datos del paciente
        if (roleResponse.idPatient) {
          try {
            const patientResponse = await apiGet(`/pacientes/consultar/${roleResponse.idPatient}`);
            sessionStorage.setItem('documento', patientResponse.documento);
            sessionStorage.setItem('nombre',
              patientResponse.primernombre +
              (patientResponse.segundonombre ? ' ' + patientResponse.segundonombre : '') +
              ' ' + patientResponse.primerapellido +
              (patientResponse.segundoapellido ? ' ' + patientResponse.segundoapellido : '')
            );
          } catch (error) {
            console.error('Error fetching patient data:', error);
          }
        }

        // 4. Obtener constantes
        try {
          const constantsResponse = await apiGet('/constants');
          constantsResponse.forEach(constant => {
            sessionStorage.setItem(constant.codigo, constant.valor);
          });
        } catch (error) {
          console.error('Error fetching constants:', error);
        }

        navigate('/inicio');
        props.onLoggedIn();
      } else {
        showMessage('error', 'Error de autenticación, por favor validar sus credenciales');
      }
    } catch (error) {
      showMessage('error', 'Error de autenticación, por favor validar sus credenciales');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event);
    }
  };

  return (<div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-5 w-99">
        <h2 className="card-title text-center">Inicio de sesión</h2>
        <form className="row g-3 needs-validation" noValidate onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" name="usuario" value={loginObj.usuario}
                   onChange={handleInputChange} placeholder="Usuario" required/>
            <label>Usuario</label>
            <div className="invalid-feedback">
              Debe ingresar un usuario
            </div>
          </div>
          <div className="form-floating mb-3">
            <input id="floatingInputPwd" type="password" className="form-control" name="clave" value={loginObj.clave}
                   onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Clave" required/>
            <label htmlFor="floatingInputPwd">Clave</label>
            <div className="invalid-feedback">
              Debe ingresar una clave
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </div>
          <div className="text-center mt-3">
            <Link to="/recordarClave">¿Olvidaste tu contraseña?</Link>
          </div>
        </form>
      </div>
    </div>);
};

const mapDisPatchToProps = (dispatch) => {
  return {
    onLoggedIn: () => dispatch({type: 'ON_LOGGED_IN'})
  }
}

export default connect(null, mapDisPatchToProps)(Login);