import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../resource/LogoNegro.png';
import '../../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import showMessage from "../../util/UtilMessage";
import config from "../../config";
import * as Papa from "date-fns";
import * as XLSX from "xlsx";

const CargueCalendarioMasivo = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
          const file = document.getElementById('file').files[0];
          if (!file) {
            showMessage('error', 'Debe seleccionar un archivo');
            return;
          }

          const reader = new FileReader();
          reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            let workbook;
            if (file.name.endsWith('.csv')) {
              const csvData = e.target.result;
              const parsedData = Papa.parse(csvData, { header: true });
              parsedData.data.forEach(row => console.log(row));
            } else {
              workbook = XLSX.read(data, { type: 'array' });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
              jsonData.forEach(row => {
                console.log(row)
              });
            }
          };
          reader.readAsArrayBuffer(file);
        } catch (e) {
          showMessage('error', 'Error al realizar el cargue masivo');
        }
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card p-4" style={{width: '1500px'}}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{maxWidth: '140px'}}/>
          <h1>Cargue masivo</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <section className="mb-4">
            <div className="form-group">
              <label htmlFor="file">Cargar archivo Excel o CSV</label>
              <input
                type="file"
                className="form-control"
                id="file"
                accept=".csv, .xlsx, .xls"
              />
            </div>
          </section>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </div>
    </div>
  );
}

export default CargueCalendarioMasivo;