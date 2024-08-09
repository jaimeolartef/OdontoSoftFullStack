package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.model.Dao.PatientDao;
import org.enterprise.odontosoft.view.dto.PacienteDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface PatientController {

    ResponseEntity<Void> createPatient(PacienteDto pacienteDto);

    ResponseEntity<PacienteDto> getPatient(Integer id);

    ResponseEntity<Void> updatePatient(PacienteDto paciente);

    ResponseEntity<Void> deletePatient(Integer id);
}
