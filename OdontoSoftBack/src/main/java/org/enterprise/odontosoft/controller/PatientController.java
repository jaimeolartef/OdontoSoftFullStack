package org.enterprise.odontosoft.controller;

import java.util.List;

import org.enterprise.odontosoft.view.dto.request.PacienteRequest;
import org.enterprise.odontosoft.view.dto.response.PacienteResponse;

public interface PatientController {

    PacienteResponse createPatient(PacienteRequest pacienteRequest);

    List<PacienteResponse> getPatient(String documento, String nombre, String correo);

    PacienteResponse getPatientById(Integer id);

    PacienteResponse updatePatient(PacienteRequest pacienteRequest);

    List<PacienteResponse> getAllPatients();
}
