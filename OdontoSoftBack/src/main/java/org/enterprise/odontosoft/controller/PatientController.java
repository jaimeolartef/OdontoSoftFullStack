package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.ConsultarPacienteDto;
import org.enterprise.odontosoft.view.dto.PacienteDto;
import org.springframework.http.ResponseEntity;

public interface PatientController {

    ResponseEntity<PacienteDto> createPatient(PacienteDto pacienteDto);

    ResponseEntity<PacienteDto> getPatient(ConsultarPacienteDto consultarPacienteDto);

    ResponseEntity<Void> updatePatient(PacienteDto paciente);

    ResponseEntity<Void> deletePatient(Integer id);
}
