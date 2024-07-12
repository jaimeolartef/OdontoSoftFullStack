import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import { createStore } from 'redux'
import reportWebVitals from './reportWebVitals';
import Login from "./Login";
import Contacto from "./view/Contacto";
import {setAuthenticationHeader} from "./util/authenticate";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import NavBar from "./view/Navigator/NavBar";
import reducer from "./store/reducer";
import requireAuth from "./util/requireAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(reducer)

const token = localStorage.getItem("jsonwebtoken")
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
            <Route exact path = "/contacto" Component = {requireAuth(Contacto)} />
          </Routes>
        </NavBar>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
