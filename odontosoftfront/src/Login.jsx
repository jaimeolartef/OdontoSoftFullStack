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

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      const hash = sha256(loginObj.clave).toString();
      loginObj.clave = hash;

      axios.post(`${config.baseURL}/user/login`, loginObj)
        .then(response => {
          if (response.data) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            localStorage.setItem('jsonwebtoken', response.data.token);
            usuarioDto.codigo = response.data.usuario;
            axios.post(`${config.baseURL}/user/validateRole`, usuarioDto)
              .then(responseMenu => {
                const responseValidateRole = JSON.stringify(responseMenu.data.menus);
                localStorage.setItem('menuUser', responseValidateRole);
                navigate('/inicio');
                localStorage.setItem('username', usuarioDto.codigo);
                localStorage.setItem('idPaciente', responseMenu.data.idPatient);
                localStorage.setItem('Rol', responseMenu.data.rol);

                if (responseMenu.data.idPatient) {
                  axios.get(`${config.baseURL}/pacientes/consultar/${responseMenu.data.idPatient}`)
                    .then(response => {
                      localStorage.setItem('documento', response.data.documento);
                      localStorage.setItem('nombre', response.data.primernombre + (response.data.segundonombre ? ' ' + response.data.segundonombre : '') + ' ' + response.data.primerapellido + (response.data.segundoapellido ? ' ' + response.data.segundoapellido : ''));
                    })
                    .catch(error => {
                      console.error('Error fetching patient data:', error);
                    });
                }
                localStorage.setItem('nombre', responseMenu.data.nombreUsuario);

                axios.get(`${config.baseURL}/constants`)
                  .then(response => {
                    console.log('Data -> ' + response.data);
                    response.data.forEach(constant => {
                      localStorage.setItem(constant.codigo, constant.valor);
                    });
                  });


                props.onLoggedIn();
              }).catch(error => {
              showMessage('error', 'Error al validar el rol del usuario');
            });
          } else {
            showMessage('error', 'Error de autenticación, por favor validar sus credenciales');
          }
        }).catch(error => {
        showMessage('error', 'Error de autenticación, por favor validar sus credenciales');
      });
    } catch (error) {
      showMessage('error', 'Error ' + error);
    }
  };

  const consultarPaciente = (idPaciente) => {
    let paciente = axios.get(`${config.baseURL}/pacientes/consultar/${idPaciente}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching patient data:', error);
      });
    return paciente;
  }

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