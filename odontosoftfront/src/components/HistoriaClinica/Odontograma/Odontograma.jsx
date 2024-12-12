import React, {useEffect, useMemo, useState} from 'react';
import './Odontograma.css'
import CondicionesDentales from './CondicionesDentale';
import Diente from './Diente';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import config from "../../../config";
import showMessage from "../../../util/UtilMessage";

const Odontograma = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = localStorage.getItem('username');

  // Utiliza useMemo para memorizar el objeto patient
  const idHistoriaClinica = useMemo(() => {
    return location.state?.idHistoriaClinica || {};
  }, [location.state]);

  let readOnly = useMemo(() => {
    return location.state?.readOnly || false;
  }, [location.state]);

  const [idOdontograma, setIdOdontograma] = useState('');
  const [initOdontograma, setInitOdontograma] = useState({
    id: 0,
    idhistoriaclinica: 0,
    fecha: '',
    idusuariocreacion: 1,
    fechacreacion: '',
    idusuariomodificacion: '',
    fechamodificacion: '',
    detalleodontogramas: [],
    habilitado: true
  });
  const mapFormOdontograma = (data) => ({
    id: data.id || '',
    idhistoriaclinica: data.idhistoriaclinica || '',
    fecha: data.fecha || '',
    idusuariocreacion: data.idusuariocreacion || '',
    fechacreacion: data.fechacreacion || '',
    idusuariomodificacion: data.idusuariomodificacion || '',
    fechamodificacion: data.fechamodificacion || '',
    detalleodontogramas: data.detalleodontogramas || [],
    habilitado: data.habilitado || true
  });

  const handleToothClick = (indexSegmento, segmentos) => {
    let usuario = localStorage.getItem('username');

    Object.keys(segmentos).forEach(key => {
      if (initOdontograma.detalleodontogramas.length === 0) {
        initOdontograma.detalleodontogramas.push({
          id: '',
          iddiente: segmentos[key].iddiente,
          idsegmento: segmentos[key].idsegmento,
          idestado: segmentos[key].idestado,
          idusuariocreacion: usuario,
          fechacreacion: new Date().toISOString(),
          fechatratamiento: new Date().toISOString(),
          habilitado: true,
          idodontograma: idOdontograma,
        });
        return;
      } else {
        const existingItemIndex = initOdontograma.detalleodontogramas.findIndex(
          itemOdon => itemOdon.iddiente === segmentos[key].iddiente && itemOdon.idsegmento === segmentos[key].idsegmento
        );

        if (existingItemIndex === -1 && segmentos[key].idestado !== 'DS') {
          // Agregar nuevo segmento si no existe
          initOdontograma.detalleodontogramas.push({
            id: '',
            iddiente: segmentos[key].iddiente,
            idsegmento: segmentos[key].idsegmento,
            idestado: segmentos[key].idestado,
            idusuariocreacion: usuario,
            fechacreacion: new Date().toISOString(),
            fechatratamiento: new Date().toISOString(),
            habilitado: true,
            idodontograma: idOdontograma,
          });
        } else if (existingItemIndex > -1 && segmentos[key].idestado === 'DS') {
          // Actualizar segmento existente
          initOdontograma.detalleodontogramas[existingItemIndex] = {
            ...initOdontograma.detalleodontogramas[existingItemIndex],
            idestado: segmentos[key].idestado === 'DS' ? '' : segmentos[key].idestado, // si esta vacio significa que se debe eliminar
            fechatratamiento: new Date().toISOString(),
            idusuariomodificacion: usuario,
            fechamodificacion: new Date().toISOString(),
          };
        } else if (existingItemIndex > -1) {
          // Actualizar segmento existente
          initOdontograma.detalleodontogramas[existingItemIndex] = {
            ...initOdontograma.detalleodontogramas[existingItemIndex],
            idestado: segmentos[key].idestado,
            fechatratamiento: new Date().toISOString(),
            idusuariomodificacion: usuario,
            fechamodificacion: new Date().toISOString(),
          };
        }
      }
    });
    initOdontograma.idusuariomodificacion = usuario;
    initOdontograma.fechamodificacion = new Date().toISOString();
  }

  useEffect(() => {
    const fetchOdontograma = async () => {
      if (initOdontograma.id === '' || initOdontograma.id === 0) {
        let token = localStorage.getItem('jsonwebtoken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await axios.get(`${config.baseURL}/odontograma/consultar/` + idHistoriaClinica);
          if (response.status === 201 || response.status === 200) {
            setInitOdontograma(mapFormOdontograma(response.data));
          } else if (response.status === 204) {
            setInitOdontograma(mapFormOdontograma({
                idhistoriaclinica: idHistoriaClinica,
                fecha: new Date().toISOString(),
                idusuariocreacion: usuario,
                fechacreacion: new Date().toISOString(),
              }));
          }
        } catch (error) {
          console.error('Error fetching patient data:', error);
        }
      }
    };

    fetchOdontograma();
  }, []);


  const renderTooth = (index, toothNumber) => {
    const initSegmentos = {
      0: {iddiente: toothNumber, idsegmento: 0, idestado: 'DS'},
      1: {iddiente: toothNumber, idsegmento: 1, idestado: 'DS'},
      2: {iddiente: toothNumber, idsegmento: 2, idestado: 'DS'},
      3: {iddiente: toothNumber, idsegmento: 3, idestado: 'DS'},
      4: {iddiente: toothNumber, idsegmento: 4, idestado: 'DS'},
      5: {iddiente: toothNumber, idsegmento: 5, idestado: 'DS'}
    };

    if (initOdontograma && initOdontograma.detalleodontogramas.length > 0) {
      initOdontograma.detalleodontogramas
        .filter(item => item.iddiente === toothNumber)
        .forEach(item => {
          if (item.iddiente === toothNumber) {
            if (item.iddiente === toothNumber) {
              if (['NE', 'CT', 'EX', 'SE', 'EI', 'PE', 'CC'].includes(item.idestado)) {
                initSegmentos[5].idestado = item.idestado;
              } else {
                initSegmentos[item.idsegmento].idestado = item.idestado;
              }
            }
          }
        }, []);

      return (
        <div key={index} className="">
          <div style={{textAlign: 'center'}}>{toothNumber}</div>
          <Diente toothNumber={toothNumber} onClick={handleToothClick}
                  initSegmentos={initSegmentos}/>
        </div>
      );
    } else {
      return (
        <div key={index} className="">
          <div style={{textAlign: 'center'}}>{toothNumber}</div>
          <Diente toothNumber={toothNumber} onClick={handleToothClick} readOnly={readOnly}
                  initSegmentos={initSegmentos}/>
        </div>
      );
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initOdontograma.id === '' || initOdontograma.id === 0) {
      setInitOdontograma(prevState => ({
        ...prevState,
        idusuariocreacion: usuario,
        fechacreacion: new Date().toISOString(),
      }));
    }

    let token = localStorage.getItem('jsonwebtoken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.post(`${config.baseURL}/odontograma/guardar`, initOdontograma, {
      validateStatus: function (status) {
        return status;
      }
    })
      .then(response => {
        navigate(-1);
        if (response.status === 201) {
          showMessage('success', 'El odontograma se guardo con éxito');
        } else {
          showMessage('error', 'Error al guardar el odontograma');
        }
      })
      .catch(error => {
        showMessage('error', 'Error al guardar el odontograma');
      });
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Odontograma</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="odontograma-container">
            <CondicionesDentales/>
            <div className="espacio"/>
            <div className="odontograma">
              <div className="rowOdonto">
                {Array.from({length: 8}, (_, i) => renderTooth(i, 18 - i))}
                <div className="vertical-line"></div>
                {Array.from({length: 8}, (_, i) => renderTooth(i + 8, 21 + i))}
              </div>
              <div className="rowOdonto">
                {Array.from({length: 8}, (_, i) => renderTooth(i + 16, 48 - i))}
                <div className="vertical-line"></div>
                {Array.from({length: 8}, (_, i) => renderTooth(i + 24, 31 + i))}
              </div>
            </div>
            <div className="espacio"/>
            <div id="kids" className="odontograma">
              <div className="rowOdonto">
                {Array.from({length: 5}, (_, i) => renderTooth(i, 55 - i))}
                <div className="vertical-line"></div>
                {Array.from({length: 5}, (_, i) => renderTooth(i + 5, 61 + i))}
              </div>
              <div className="rowOdonto">
                {Array.from({length: 5}, (_, i) => renderTooth(i + 10, 85 - i))}
                <div className="vertical-line"></div>
                {Array.from({length: 5}, (_, i) => renderTooth(i + 15, 71 + i))}
              </div>
            </div>
            <div className="espacio"/>
            <button type="submit" className="btn btn-primary" disabled={readOnly}>Guardar</button>
            <div className="espacio"/>
            <div className="espacio"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Odontograma;