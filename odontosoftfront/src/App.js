import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './view/Navigator/NavBar';
import Contacto from './view/Contacto';
import Login from './Login';
import {createStore} from 'redux';
import reducer from "./store/reducer";
import {Provider} from 'react-redux';

const store = createStore(reducer);

const token = localStorage.getItem("jsonwebtoken");

// perform a dispatch to change the global state
if(token) {
  store.dispatch({type: 'ON_LOGGED_IN' })
}

function App() {
  return (
    <div className="App">
        <Router>
          <Provider store={store}>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
          </Provider>
        </Router>
    </div>
  );
}

export default App;