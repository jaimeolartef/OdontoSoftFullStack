package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.request.HistoriaClinicaRequest;
import org.enterprise.odontosoft.view.dto.response.HistoriaClinicaResponse;
import org.springframework.http.ResponseEntity;

public interface MedicalHistory {

        ResponseEntity<HistoriaClinicaResponse> createMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest);

        ResponseEntity<HistoriaClinicaResponse> getMedicalHistoryById(Integer id);

        ResponseEntity<HistoriaClinicaResponse> updateMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest);
}
