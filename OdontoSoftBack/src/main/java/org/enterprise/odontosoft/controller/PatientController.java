package org.enterprise.odontosoft.controller;

import java.util.List;

import org.enterprise.odontosoft.view.dto.ConsultarPacienteDto;
import org.enterprise.odontosoft.view.dto.PacienteDto;
import org.springframework.http.ResponseEntity;

public interface PatientController {

    ResponseEntity<PacienteDto> createPatient(PacienteDto pacienteDto);

    ResponseEntity<List<PacienteDto>> getPatient(String documento, String nombre);

    ResponseEntity<PacienteDto> getPatientById(Integer id);

    ResponseEntity<PacienteDto> updatePatient(PacienteDto pacienteDto);

    ResponseEntity<PacienteDto> deletePatient(Integer id);
}
