import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import { createStore } from 'redux'
import reportWebVitals from './reportWebVitals';
import Login from "./Login";
import RecordarClave from "./ForgotPassword";
import Inicio from "./components/Inicio";
import RegistroPac from "./components/Paciente/registroPaciente";
import {setAuthenticationHeader} from "./util/authenticate";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import NavBar from "./components/Navigator/NavBar";
import reducer from "./store/reducer";
import requireAuth from "./util/requireAuth";
import ConsultarPac from "./components/Paciente/consultarPaciente";
import ModificarPac from "./components/Paciente/modificarPaciente";
import HistoriaPac from "../src/components/HistoriaClinica/MedicalRecord";
import Odontograma from "./components/HistoriaClinica/Odontograma/Odontograma";
import CitaMedica from "./components/CitasMedicas/CitaMedica";
import RestaurarContrasenia from "./components/RestaurarContrasenia";
import CargueCalendario from "./components/Calendario/carguecalendario";
import CargueCalendarioMasivo from "./components/Calendario/carguecalendariomasivo";
import AgendaMedica from "./components/CitasMedicas/agendaMedica";
import Entidad from "./components/Entidades/entidad";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const token = sessionStorage.getItem("jsonwebtoken")
setAuthenticationHeader(token) // axios

// perform a dispatch to change the global state
if(token) {
  store.dispatch({type: 'ON_LOGGED_IN' })
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {store}>
        <NavBar>
          <Routes>
            <Route exact path = "/" Component={Login} />
            <Route exact path = "/login" Component={Login} />
            <Route exact path = "/inicio" Component = {requireAuth(Inicio)} />
            <Route exact path = "/registroPac" Component = {requireAuth(RegistroPac)} />
            <Route exact path = "/consultarPac" Component = {requireAuth(ConsultarPac)} />
            <Route exact path = "/modificarPac" Component = {requireAuth(ModificarPac)} />
            <Route exact path = "/historiaPac" Component = {requireAuth(HistoriaPac)} />
            <Route exact path = "/odontograma" Component = {requireAuth(Odontograma)} />
            <Route exact path = "/citaMedica" Component = {requireAuth(CitaMedica)} />
            <Route exact path = "/restaurarcontrasenia" Component = {requireAuth(RestaurarContrasenia)} />
            <Route exact path = "/recordarClave" Component = {RecordarClave} />
            <Route exact path = "/cargueCalendario" Component = {requireAuth(CargueCalendario)} />
            <Route exact path = "/carguecalendariomasivo" Component = {requireAuth(CargueCalendarioMasivo)} />
            <Route exact path = "/agendaMedica" Component = {requireAuth(AgendaMedica)} />
            <Route exact path = "/entidad" Component = {requireAuth(Entidad)} />
          </Routes>
        </NavBar>
      </Provider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
