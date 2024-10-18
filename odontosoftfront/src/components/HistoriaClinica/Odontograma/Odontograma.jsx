import React, {useEffect, useState} from 'react';
import './Odontograma.css'; // Ensure you have a CSS file for custom styles
import CondicionesDentales from './CondicionesDentale';
import Diente from './Diente';  // Ensure the path is correct

const Odontograma = ({ formMedicalHistory }) => {
  const renderTooth = (index, toothNumber) => {
    return (
      <div key={index} className="">
        <div style={{ textAlign: 'center' }}>{toothNumber}</div>
        <Diente toothNumber={toothNumber} onClick={handleToothClick}/>
      </div>
    );
  };

  const [idOdontograma, setIdOdontograma] = useState('');

  const handleToothClick = (toothNumber, segmentos) => {
    console.log('Tooth number:', toothNumber);
    console.log('Segmentos:', segmentos);

    Object.keys(segmentos).forEach(key => {
      const value = segmentos[key].idestado;

      if (['NE', 'CT', 'EX', 'SE', 'EI', 'PE', 'CC'].includes(value)) {
        segmentos[key].idsegmento = 5;
      }

      if (formMedicalHistory.odontogramas.length === 0) {
        formMedicalHistory.odontogramas.push({
          id: '',
          idhistoriaclinica: formMedicalHistory.idHistoriaClinica,
          detalleodontogramas: [],
          habilitado: true,
        });
      }

      formMedicalHistory.odontogramas.forEach(itemOdon => {
        if (itemOdon.detalleodontogramas.length === 0) {
          itemOdon.detalleodontogramas.push({
            id: '',
            iddiente: segmentos[key].iddiente,
            idsegmento: segmentos[key].idsegmento,
            idestado: segmentos[key].idestado,
            fechacreacion: new Date().toISOString(),
            fechatratamiento: new Date().toISOString(),
            habilitado: true,
            idodontograma: idOdontograma,
          });
          return;
        }

        if (value === 'DS') {
          console.log('Seleccion segmento diente');
          itemOdon.detalleodontogramas = itemOdon.detalleodontogramas.filter(item =>
            !(item.iddiente === segmentos[key].iddiente && (item.idsegmento == 5 || item.idsegmento === segmentos[key].idsegmento))
          );
        } else {
          const existingItem = itemOdon.detalleodontogramas.find(item =>
            item.iddiente == segmentos[key].iddiente && item.idsegmento == segmentos[key].idsegmento
          );

          if (!existingItem) {
            itemOdon.detalleodontogramas.push({
              id: '',
              iddiente: segmentos[key].iddiente,
              idsegmento: segmentos[key].idsegmento,
              idestado: segmentos[key].idestado,
              fechacreacion: new Date().toISOString(),
              fechatratamiento: new Date().toISOString(),
              habilitado: true,
              idodontograma: idOdontograma,
            });
          } else {
            itemOdon.detalleodontogramas = itemOdon.detalleodontogramas.map(item =>
              item.iddiente == segmentos[key].iddiente && item.idsegmento == segmentos[key].idsegmento
                ? {
                  ...item,
                  idestado: segmentos[key].idestado,
                  fechatratamiento: new Date().toISOString(),
                  fechamodificacion: new Date().toISOString()
                }
                : item
            );
          }
        }
      });
    });

    console.log('historia Clinica desde el odontograma:', formMedicalHistory);
  }

  useEffect(() => {
    if (formMedicalHistory.odontogramas.length === 0) {
      formMedicalHistory.odontogramas.push({
        id: '',
        idhistoriaclinica: formMedicalHistory.idHistoriaClinica,
        detalleodontogramas: [],
        habilitado: true,
      });
    } else {
      setIdOdontograma(formMedicalHistory.odontogramas[0].id);
    }
  }, [formMedicalHistory]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Odontograma</h2>
      </div>
      <div className="card-body">
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
        </div>
      </div>
    </div>
  );
};

export default Odontograma;