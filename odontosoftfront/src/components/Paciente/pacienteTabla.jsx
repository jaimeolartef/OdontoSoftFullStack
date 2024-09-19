import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pacienteTabla.css';
import MedicalIcon from '../../resource/MedicalIcon.png';
import EditIcon from '../../resource/EditIcon.png';
import { Tooltip } from 'react-tooltip';

const PacienteTabla = ({ data, formData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (paciente) => {
    localStorage.setItem('consultarPacienteFormData', JSON.stringify(formData));
    navigate('/modificarPac', { state: { id: paciente.id } });
  };

  const handleMedicalRecordClick = (paciente) => {
    navigate('/historiaPac', { state: { patient: paciente } });
  };

  return (
    <div className="table-container">
      <div className="table-responsive">
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
                {paciente.idHistoriaClinica  !== null && (
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
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} style={{width: '110px'}}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}>
              Anterior
            </button>
          </li>
          {Array.from({length: totalPages}, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}
                      disabled={currentPage === totalPages}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} style={{width: '110px'}}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PacienteTabla;