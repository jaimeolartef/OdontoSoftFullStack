import React, { useEffect, useMemo, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Logo from "../../resource/LogoNegro.png";
import Calendario from './Calendario';
import { useLocation, useNavigate } from "react-router-dom";
import showMessage from "../../util/UtilMessage";
import { apiGet } from '../apiService';

const CitaMedica = () => {
  const [paciente, setPaciente] = useState('');
  const [selectedOdontologo, setSelectedOdontologo] = useState('');
  const [selectedPaciente, setSelectedPaciente] = useState('');
  const navigate = useNavigate();
  const [odontologo, setOdontologo] = useState([
    { idMedico: 0, nombre: '' }
  ]);
  const [pacientes, setPacientes] = useState([
    { idPaciente: 0, nombre: '' }
  ]);
  const [availability, setAvailability] = useState([]);
  const [calendarKey, setCalendarKey] = useState(0);
  const location = useLocation();
  const patient = useMemo(() => location.state?.patient || {}, [location.state]);
  const Rol = sessionStorage.getItem('Rol');

  useEffect(() => {
    fetchOdontologos();
    fetchPacientes();
    // eslint-disable-next-line
  }, []);

  const fetchOdontologos = async () => {
    try {
      const data = await apiGet('/doctor/consultar');
      setOdontologo(data);
    } catch (error) {
      showMessage('error', error?.message || 'Error al obtener odontólogos');
    }
  };

  const fetchPacientes = async () => {
    if (Rol !== 'Paciente') {
      try {
        const data = await apiGet('/pacientes/listar');
        let newPacientes = data.map((paciente) => ({
          idPaciente: paciente.id,
          nombre: `${paciente.primernombre.trim()} ${paciente.segundonombre ? paciente.segundonombre.trim() : ''} ${paciente.primerapellido.trim()} ${paciente.segundoapellido ? paciente.segundoapellido.trim() : ''}`.trim()
        }));
        setPacientes(newPacientes);
      } catch (error) {
        showMessage('error', error?.message || 'Error al obtener pacientes');
      }
    } else {
      try {
        const idPaciente = sessionStorage.getItem('idPaciente');
        const data = await apiGet(`/pacientes/consultar/${idPaciente}`);
        setSelectedPaciente(`${data.id} - ${data.segundonombre ? data.segundonombre : ''} ${data.primerapellido.trim()} ${data.segundoapellido ? data.segundoapellido.trim() : ''}`.trim());
      } catch (error) {
        showMessage('error', error?.message || 'Error al obtener paciente');
      }
    }
  };

  const handleSearchChangeOdont = (event) => {
    setSelectedOdontologo(event.target.value);
  };

  const handleSearchChangePac = (event) => {
    setSelectedPaciente(event.target.value);
  };

  const handleOdontologoChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOdontologo(selectedValue);
    let odontoSelec = selectedValue.split(' - ');
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    const odontoSelected = odontologo.findIndex(odontologo => odontologo.idMedico == odontoSelec[0]);
    if (odontoSelected > -1) {
      try {
        const availab = await apiGet(`/availability/doctor/${odontoSelec[0]}`, {
          queryParams: { month, year }
        });
        if (availab.length === 0) {
          showMessage('warning', 'La agenda no está disponible para el mes seleccionado');
        } else {
          setAvailability(availab);
          setCalendarKey(prevKey => prevKey + 1);
        }
      } catch (error) {
        showMessage('error', error?.message || 'Error al obtener disponibilidad');
      }
    }
  };

  const handlePacienteChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPaciente(selectedValue);
    let paciSelec = selectedValue.split(' - ');
    const paciSelected = pacientes.findIndex(paciente => paciente.idPaciente == paciSelec[0]);
    if (paciSelected > -1) {
      setPaciente(pacientes[paciSelected].nombre);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClearOdontologo = () => {
    setSelectedOdontologo('');
    setAvailability([]);
    setCalendarKey(prevKey => prevKey + 1);
  };

  const handleClearPaciente = () => {
    setSelectedPaciente('');
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ width: '1500px' }}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{ maxWidth: '140px' }} />
          <h1>Asignación de Citas</h1>
        </header>
        <div className="card">
          <div className="card-header">
            <h2>Agendar Cita Medica</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="odontologo">Odontologo</label>
                <div className="input-group">
                  <input className="form-control"
                         list="datalistodontologo"
                         id="dataListOdonto"
                         placeholder="Buscar odontologo..."
                         value={selectedOdontologo || ''}
                         onBlur={handleSearchChangeOdont}
                         onInput={handleOdontologoChange}
                         onChange={handleSearchChangeOdont}
                         autoComplete="off"/>
                  <button type="button" className="btn btn-outline-secondary" onClick={handleClearOdontologo}>
                    Limpiar
                  </button>
                </div>
                <datalist id="datalistodontologo">
                  {odontologo.map((odontologo) => (
                    <option key={odontologo.idMedico} value={`${odontologo.idMedico} - ${odontologo.nombre}`}/>
                  ))}
                </datalist>
              </div>
              <div className="espacio"/>
              {Rol !== 'Paciente' && (
                <div className="form-group">
                  <label htmlFor="paciente">Paciente</label>
                  <div className="input-group">
                    <input className="form-control"
                           list="datalistpaciente"
                           id="dataListPacien"
                           placeholder="Buscar paciente..."
                           value={selectedPaciente || ''}
                           onBlur={handleSearchChangePac}
                           onChange={handlePacienteChange}
                           autoComplete="off"/>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleClearPaciente}>
                      Limpiar
                    </button>
                  </div>
                  <datalist id="datalistpaciente">
                    {pacientes.map((paci) => (
                      <option key={paci.idPaciente} value={`${paci.idPaciente} - ${paci.nombre}`}/>
                    ))}
                  </datalist>
                </div>
              )}
              <div className="espacio"/>
              <div className="calendar-container">
                <Calendario key={calendarKey} availability={availability} patient={selectedPaciente}
                            setAvailability={setAvailability} Rol={Rol}/>
              </div>
              <div className="espacio"/>
              <button type="button" className="btn btn-secondary"
                      onClick={() => navigate('/inicio')}>Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CitaMedica;