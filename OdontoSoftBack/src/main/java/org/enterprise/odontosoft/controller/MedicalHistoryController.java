package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.request.HistoriaClinicaRequest;
import org.enterprise.odontosoft.view.dto.response.HistoriaClinicaResponse;
import org.springframework.http.ResponseEntity;

public interface MedicalHistoryController {

        ResponseEntity<HistoriaClinicaResponse> createMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest);

        ResponseEntity<HistoriaClinicaResponse> getMedicalHistoryById(Integer id);

        ResponseEntity<HistoriaClinicaResponse> getMedicalHistoryByIdPaciente(Integer idPaciente);

        ResponseEntity<HistoriaClinicaResponse> updateMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest);
}
