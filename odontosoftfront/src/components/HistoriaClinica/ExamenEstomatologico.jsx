import React, { useEffect } from 'react';

const ExamenEstomatologico = ({ formMedicalHistory, setFormMedicalHistory }) => {
  const usuario = localStorage.getItem('username');
  const handleChange = (e) => {
    const { name, checked } = e.target;
    let fecha = new Date().toISOString();
    setFormMedicalHistory(prev => {
      const updatedExamenEstom = prev.examenestomatologicos.map((item, index) => {
        if (index === 0) { // Assuming you want to update the first item in the list
          return {
            ...item,
            [name]: checked,
            idusuariocreacion: item.idusuariocreacion || usuario,
            fechacreacion: item.fechacreacion || fecha,
            idusuariomodificacion: item.id ? usuario : '',
            fechamodificacion: item.id ? fecha : ''
          };
        }
        return item;
      });
      return {
        ...prev,
        examenestomatologicos: updatedExamenEstom
      };
    });
  };

  useEffect(() => {
    let fecha = new Date().toISOString();
    if (!formMedicalHistory.examenestomatologicos || formMedicalHistory.examenestomatologicos.length === 0) {
      setFormMedicalHistory(prev => ({
        ...prev,
        examenestomatologicos: [{
          id: '',
          labiosuperior: false,
          labioinferior: false,
          comisura: false,
          menton: false,
          frenillos: false,
          surcosvestibulares: false,
          carrillos: false,
          procesosalveolares: false,
          regionfaringea: false,
          paladarblando: false,
          paladarduro: false,
          pisoboca: false,
          dorsolengua: false,
          vientrelengua: false,
          glandulasparotidas: false,
          glandulassublinguales: false,
          glandulassubmaxilares: false,
          glandulassalivaresmenores: false,
          maxilarsuperior: false,
          maxilarinferior: false,
          idusuariocreacion: usuario,
          fechacreacion: fecha
        }]
      }));
    }
  }, [formMedicalHistory, setFormMedicalHistory]);

  const items = [
    {id: 1, name: 'Labio superior', value: 'labiosuperior'},
    {id: 2, name: 'Labio inferior', value: 'labioinferior'},
    {id: 3, name: 'Comisuras', value: 'comisura'},
    {id: 4, name: 'Mentón', value: 'menton'},
    {id: 5, name: 'Frenillos', value: 'frenillos'},
    {id: 6, name: 'Sulcos vestibulares', value: 'surcosvestibulares'},
    {id: 7, name: 'Carrillos', value: 'carrillos'},
    {id: 8, name: 'Procesos alveolares', value: 'procesosalveolares'},
    {id: 9, name: 'Región faríngea', value: 'regionfaringea'},
    {id: 10, name: 'Paladar blando', value: 'paladarblando'},
    {id: 11, name: 'Paladar duro', value: 'paladarduro'},
    {id: 12, name: 'Piso de boca', value: 'pisoboca'},
    {id: 13, name: 'Dorso de lengua', value: 'dorsolengua'},
    {id: 14, name: 'Vientre de la lengua', value: 'vientrelengua'},
    {id: 15, name: 'Glándulas parótidas', value: 'glandulasparotidas'},
    {id: 16, name: 'Glándulas sublinguales', value: 'glandulassublinguales'},
    {id: 17, name: 'Glándulas submaxilares', value: 'glandulassubmaxilares'},
    {id: 18, name: 'Glándulas salivares menores', value: 'glandulassalivaresmenores'},
    {id: 19, name: 'Maxilar superior', value: 'maxilarsuperior'},
    {id: 20, name: 'Maxilar inferior', value: 'maxilarinferior'}
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h2>Exámen Estomatológico</h2>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead className="table-light">
          <tr>
            <th>Estructuras</th>
            <th>Normal</th>
          </tr>
          </thead>
          <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td><input type="checkbox"
                         name={item.value}
                         checked={formMedicalHistory.examenestomatologicos[0]?.[item.value] || false}
                         onChange={handleChange}
                         className="form-check-input"/></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamenEstomatologico;