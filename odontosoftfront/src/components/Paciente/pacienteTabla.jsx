import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './pacienteTabla.css';
import MedicalIcon from '../../resource/MedicalIcon.png'; // Importar el icono desde la carpeta resource
import EditIcon from '../../resource/EditIcon.png'; // Importar el icono desde la carpeta resource
import {Tooltip} from 'react-tooltip'; // Importar el componente Tooltip
import bootstrap from 'bootstrap'; // Importar bootstrap

const PacienteTabla = ({data, formData}) => {
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
  const handleEditClick = (paciente) => {
    localStorage.setItem('consultarPacienteFormData', JSON.stringify(formData));
    navigate('/modificarPac', {state: {id: paciente.id}});
  };

  // Handle medical record icon click
  const handleMedicalRecordClick = (paciente) => {
    navigate('/historiaPac', {state: {idPatient: paciente.id}});
  };


  return (
    <div className="table-container">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
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
          <tr key={index}>
            <td data-label="Documento">{paciente.documento}</td>
            <td data-label="Nombre">{paciente.primernombre} {paciente.segundonombre}</td>
            <td data-label="Primer Apellido">{paciente.primerapellido}</td>
            <td data-label="Segundo Apellido">{paciente.segundoapellido}</td>
            <td data-label="Teléfono">{paciente.telefono}</td>
            <td data-label="Habilitado">{paciente.habilitado === 'true' ? 'Sí' : 'No'}</td>
            <td data-label="Acciones">
              {paciente.habilitado === 'true' && (
                <>
                  <img src={MedicalIcon} alt="Historia Clinica"
                       style={{marginRight: '5px', width: '35px', height: '35px', cursor: 'pointer'}}
                       onClick={(e) => {
                         e.stopPropagation();
                         handleMedicalRecordClick(paciente);
                       }}
                       data-tooltip-id="tooltip" data-tooltip-content="Ver Historia Clinica"/>
                  <Tooltip id="tooltip"/>
                </>
              )}
              <img src={EditIcon} alt="Editar Paciente"
                   style={{marginRight: '5px', width: '35px', height: '35px', cursor: 'pointer'}}
                   onClick={(e) => {
                     e.stopPropagation();
                     handleEditClick(paciente);
                   }}
                   data-tooltip-id="editTooltip" data-tooltip-content="Editar Paciente"/>
              <Tooltip id="editTooltip"/>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <ul className="pagination">
        {Array.from({length: totalPages}, (_, index) => (
          <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button
              onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PacienteTabla;