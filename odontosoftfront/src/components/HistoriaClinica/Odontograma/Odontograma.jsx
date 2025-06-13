import React, {useEffect, useMemo, useState} from 'react';
import './Odontograma.css'
import CondicionesDentales from './CondicionesDentale';
import Diente from './Diente';
import {useLocation, useNavigate} from "react-router-dom";
import showMessage from "../../../util/UtilMessage";
import {apiGet, apiPost} from "../../apiService";

const Odontograma = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = sessionStorage.getItem('username');

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
    let usuario = sessionStorage.getItem('username');

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
          initOdontograma.detalleodontogramas[existingItemIndex] = {
            ...initOdontograma.detalleodontogramas[existingItemIndex],
            idestado: segmentos[key].idestado === 'DS' ? '' : segmentos[key].idestado,
            fechatratamiento: new Date().toISOString(),
            idusuariomodificacion: usuario,
            fechamodificacion: new Date().toISOString(),
          };
        } else if (existingItemIndex > -1) {
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
        try {
          const response = await apiGet(`/odontograma/consultar/${idHistoriaClinica}`);
          if (response && (response.id || response.id === 0)) {
            setInitOdontograma(mapFormOdontograma(response));
            setIdOdontograma(response.id);
          } else {
            setInitOdontograma(mapFormOdontograma({
              idhistoriaclinica: idHistoriaClinica,
              fecha: new Date().toISOString(),
              idusuariocreacion: usuario,
              fechacreacion: new Date().toISOString(),
            }));
          }
        } catch (error) {
          setInitOdontograma(mapFormOdontograma({
            idhistoriaclinica: idHistoriaClinica,
            fecha: new Date().toISOString(),
            idusuariocreacion: usuario,
            fechacreacion: new Date().toISOString(),
          }));
          console.error('Error fetching odontograma data:', error);
        }
      }
    };

    fetchOdontograma();
    // eslint-disable-next-line
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
            if (['NE', 'CT', 'EX', 'SE', 'EI', 'PE', 'CC'].includes(item.idestado)) {
              initSegmentos[5].idestado = item.idestado;
            } else {
              initSegmentos[item.idsegmento].idestado = item.idestado;
            }
          }
        });

      return (
        <div key={index} className="">
          <div style={{textAlign: 'center'}}>{toothNumber}</div>
          <Diente toothNumber={toothNumber} onClick={handleToothClick}
                  initSegmentos={initSegmentos} readOnly={readOnly}/>
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initOdontograma.id === '' || initOdontograma.id === 0) {
      setInitOdontograma(prevState => ({
        ...prevState,
        idusuariocreacion: usuario,
        fechacreacion: new Date().toISOString(),
      }));
    }
    try {
      await apiPost('/odontograma/guardar', initOdontograma);
      navigate(-1);
      showMessage('success', 'El odontograma se guardó con éxito');
    } catch (error) {
      showMessage('error', 'Error al guardar el odontograma');
    }
  }

  return (
    <div className="card">
      <div className="card-header text-center">
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
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary" disabled={readOnly}>Guardar</button>
              <div style={{width: '30px'}}/>
              <button type="button" className="btn btn-secondary"
                      onClick={() => navigate(-1, {state: location.state})}>Cancelar
              </button>
            </div>
            <div className="espacio-2"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Odontograma;