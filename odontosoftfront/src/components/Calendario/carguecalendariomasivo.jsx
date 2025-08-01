import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import showMessage from "../../util/UtilMessage";
import validateHours from "../../util/UtilValidation";
import Papa from 'papaparse';
import * as XLSX from "xlsx";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../../resource/LogoNegro.png';
import { apiGet, apiPost } from '../apiService';

const CargueCalendarioMasivo = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    setErrors([]);
    try {
      const file = document.getElementById('file').files[0];
      if (!file) {
        showMessage('error', 'Debe seleccionar un archivo');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        let workbook, idMedico, documentoOdontologoActual, anio, mes, diaSemana, horainicioam, horafinam, horainiciopm, horafinpm, availabNow;
        let jsonData;
        if (file.name.endsWith('.csv')) {
          const csvData = e.target.result;
          const textDecoder = new TextDecoder('utf-8');
          const csvText = textDecoder.decode(csvData);
          const parsedData = Papa.parse(csvText, { header: true });
          jsonData = parsedData.data.map(row => [
            row['documento'],
            row['anio'],
            row['mes'],
            row['dia'],
            row['horainicioam'],
            row['horafinam'],
            row['horainiciopm'],
            row['horafinpm']
          ]);
        } else if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
          workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).slice(1);
        } else {
          showMessage('error', 'Formato de archivo no válido');
          return;
        }

        let documentoOdontologoAnterior = '';
        let availableDoctors = [];
        let uniqueRecords = new Set();
        let linea = 2;

        for (const row of jsonData) {
          if (!row || row.length === 0 || (!row[0] && !row[1] && !row[2] && !row[3])) continue;

          documentoOdontologoActual = row[0];
          anio = row[1];
          mes = row[2];
          diaSemana = row[3];
          horainicioam = row[4];
          horafinam = row[5];
          horainiciopm = row[6];
          horafinpm = row[7];

          if (documentoOdontologoActual !== documentoOdontologoAnterior) {
            try {
              const response = await apiGet(`/doctor/consultar/documento/${documentoOdontologoActual}`);
              idMedico = response.idMedico;
              const availab = await apiGet(`/availability/doctor/${idMedico}`, {
                queryParams: { month: mes, year: anio }
              });
              availabNow = availab;
            } catch (error) {
              errors.push('El odontólogo con documento ' + row[0] + ' no existe, línea ' + linea);
              documentoOdontologoAnterior = documentoOdontologoActual;
              linea++;
              continue;
            }
          }

          validateData(anio, mes, diaSemana, horainicioam, horafinam, horainiciopm, horafinpm, linea, availabNow, documentoOdontologoActual, uniqueRecords);

          documentoOdontologoAnterior = documentoOdontologoActual;
          linea++;

          if (errors.length === 0) {
            let aval = availableDoctors.find(doctor => doctor.idMedico === idMedico);
            if (aval) {
              aval.detalledisponibilidad.push({
                dia: diaSemana,
                horainicioam,
                horafinam,
                horainiciopm,
                horafinpm
              });
            } else {
              availableDoctors.push({
                idmedico: idMedico,
                anio,
                mes,
                detalledisponibilidad: [{
                  dia: diaSemana,
                  horainicioam,
                  horafinam,
                  horainiciopm,
                  horafinpm
                }]
              });
            }
          }
        }

        if (errors.length > 0) {
          setErrorMessages(errors);
          setShowModal(true);
          return false;
        }

        try {
          await apiPost('/availability/save', availableDoctors);
          showMessage('success', 'Cargue masivo realizado con éxito');
        } catch (error) {
          showMessage('error', error?.message || 'Error al realizar el cargue masivo');
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      showMessage('error', 'Error al realizar el cargue masivo');
    }
  };

  const validateData = (anio, mes, diaSemana, horainicioam, horafinam, horainiciopm, horafinpm, linea, availabNow, documentoOdontologoActual, uniqueRecords) => {
    let validate = true;
    const monthDecember = 12;
    let nextMonth = new Date().getMonth() + 2;
    let nowMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const isDecember = nowMonth === monthDecember;
    const maxAllowedYear = currentYear + (isDecember ? 2 : 0);

    const recordKey = `${documentoOdontologoActual}-${anio}-${mes}-${diaSemana}`;
    if (uniqueRecords.has(recordKey)) {
      errors.push(`El registro con documento ${documentoOdontologoActual}, año ${anio}, mes ${mes}, día ${diaSemana} ya existe, línea ${linea}`);
      validate = false;
    } else {
      uniqueRecords.add(recordKey);
    }

    if (isNaN(anio)) {
      errors.push('El año debe ser un valor numérico, línea ' + linea);
      validate = false;
    }
    if (anio < 1900 || anio > maxAllowedYear) {
      errors.push('El año seleccionado no es válido, línea ' + linea);
      validate = false;
    }
    if (isNaN(mes)) {
      errors.push('El mes debe ser un valor numérico, línea ' + linea);
      validate = false;
    }
    if (mes < 1 || mes > 12) {
      errors.push('El mes seleccionado debe estar entre 1 y 12, línea ' + linea);
      validate = false;
    }
    if (mes < nowMonth || mes > nextMonth) {
      errors.push('El mes seleccionado debe ser el mes actual o el siguiente, línea ' + linea);
      validate = false;
    }
    if (isNaN(diaSemana)) {
      errors.push('El día debe ser un valor numérico, línea ' + linea);
      validate = false;
    }
    const daysInMonth = new Date(anio, mes, 0).getDate();
    if (diaSemana < 1 || diaSemana > daysInMonth) {
      errors.push('El día seleccionado debe estar entre 1 y ' + daysInMonth + ' para el mes ' + mes + ', línea ' + linea);
      validate = false;
    }
    if (!(validateHours(horainicioam, horafinam, true, linea) && validateHours(horainiciopm, horafinpm, false, linea))) {
      validate = false;
    }
    let day = availabNow?.find(day => day.dia === diaSemana && day.documento === documentoOdontologoActual);
    if (day) {
      if (day.horainicioam !== horainicioam || day.horafinam !== horafinam || day.horainiciopm !== horainiciopm || day.horafinpm !== horafinpm) {
        errors.push('El día ' + diaSemana + ' ya esta registrado, línea ' + linea);
        validate = false;
      }
    }
    return validate;
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card p-4" style={{ width: '1500px' }}>
        <header className="text-center mb-4">
          <img src={Logo} alt="Logo" className="mb-3" style={{ maxWidth: '140px' }} />
          <h1>Cargue masivo</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <section className="mb-4">
            <div className="form-group">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <label htmlFor="file">Cargar archivo Excel o CSV</label>
                <a href="../../resource/formatocargamasiva.xlsx" download className="icon-link icon-link-hover">
                  <i className="bi bi-file-earmark-spreadsheet me-1"></i>Formato
                </a>
              </div>
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
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Errores</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-dialog modal-dialog-scrollable">
              {errorMessages.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CargueCalendarioMasivo;