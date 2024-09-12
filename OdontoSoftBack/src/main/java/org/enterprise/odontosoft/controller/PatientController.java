package org.enterprise.odontosoft.controller;

import java.util.List;

import org.enterprise.odontosoft.view.dto.request.PacienteRequest;
import org.enterprise.odontosoft.view.dto.response.PacienteResponse;
import org.springframework.http.ResponseEntity;

public interface PatientController {

    ResponseEntity<PacienteResponse> createPatient(PacienteRequest pacienteRequest);

    ResponseEntity<List<PacienteResponse>> getPatient(String documento, String nombre);

    ResponseEntity<PacienteResponse> getPatientById(Integer id);

    ResponseEntity<PacienteResponse> updatePatient(PacienteRequest pacienteRequest);
}
