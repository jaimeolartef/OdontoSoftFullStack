// entidadTabla.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './entidadTabla.css';
import MedicalIcon from "../../resource/MedicalIcon.png";
import {Tooltip} from "react-tooltip";
import { useNavigate } from 'react-router-dom';
import EditIcon from "../../resource/EditIcon.png";

const EntidadTabla = ({ data, loading }) => {
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

  const handleReadClick = (entidad) => {
    navigate('/verentidad', { state: { id: entidad.id, readOnly: true } });
  }

  const handleEditClick = (entidad) => {
    navigate('/editarentidad', { state: { id: entidad.id, readOnly: true } });
  }

  return (
    <div className="table-container">
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Tipo Documento</th>
              <th>Número Documento</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((entidad, index) => (
                <tr key={index}>
                  <td data-label="Tipo Doc.">{entidad.tipodocumento}</td>
                  <td data-label="Número Doc.">{entidad.numerodocumento}</td>
                  <td data-label="Nombre">{entidad.nombre}</td>
                  <td data-label="Correo">{entidad.correo}</td>
                  <td data-label="Acciones">
                    <>
                      <img src={MedicalIcon} alt="Entidad"
                           style={{marginRight: '5px', width: '35px', height: '35px', cursor: 'pointer',filter: 'grayscale(100%)'}}
                           onClick={(e) => {
                             e.stopPropagation();
                             handleReadClick(entidad);
                           }}
                           data-tooltip-id="tooltip" data-tooltip-content="Consultar Entidad"/>
                      <Tooltip id="tooltip"/>
                    </>

                    <>
                      <img src={EditIcon} alt="Editar Entidad"
                           style={{marginRight: '5px', width: '35px', height: '35px', cursor: 'pointer'}}
                           onClick={(e) => {
                             e.stopPropagation();
                             handleEditClick(entidad);
                           }}
                           data-tooltip-id="editTooltip" data-tooltip-content="Editar Entidad"/>
                      <Tooltip id="editTooltip"/>
                    </>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  {loading ? 'Cargando datos...' : 'No se encontraron entidades'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data.length > 0 && (
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
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} style={{width: '120px'}}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}>
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default EntidadTabla;