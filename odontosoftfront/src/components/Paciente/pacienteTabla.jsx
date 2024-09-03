import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pacienteTabla.css';
import MedicalIcon from '../../resource/MedicalIcon.png'; // Importar el icono desde la carpeta resource

const PacienteTabla = ({ data, formData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Calculate the indices for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle row click
  const handleRowClick = (paciente) => {
    localStorage.setItem('consultarPacienteFormData', JSON.stringify(formData));
    navigate('/modificarPac', { state: { id: paciente.id } });
  };

  // Handle medical record icon click
  const handleMedicalRecordClick = (paciente) => {
    console.log('Paciente: ', paciente.id);
    navigate('/historiaPac', { state: { idPatient: paciente.id } });
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Teléfono</th>
            <th>Habilitado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((paciente, index) => (
            <tr key={index} onClick={() => handleRowClick(paciente)}>
              <td data-label="Documento">{paciente.documento}</td>
              <td data-label="Nombre">{paciente.primernombre} {paciente.segundonombre}</td>
              <td data-label="Primer Apellido">{paciente.primerapellido}</td>
              <td data-label="Segundo Apellido">{paciente.segundoapellido}</td>
              <td data-label="Teléfono">{paciente.telefono}</td>
              <td data-label="Habilitado">{paciente.habilitado === 'true' ? 'Sí' : 'No'}</td>
              <td data-label="Acciones">
                <img
                  src={MedicalIcon}
                  alt="Historia Clinicia"
                  style={{ marginRight: '5px', width: '35px', height: '35px', cursor: 'pointer' }}
                  onClick={(e) => { e.stopPropagation(); handleMedicalRecordClick(paciente); }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PacienteTabla;