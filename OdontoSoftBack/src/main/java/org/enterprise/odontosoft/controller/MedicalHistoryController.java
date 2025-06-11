package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.request.HistoriaClinicaRequest;
import org.enterprise.odontosoft.view.dto.response.HistoriaClinicaResponse;

public interface MedicalHistoryController {

        HistoriaClinicaResponse createMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest);

        HistoriaClinicaResponse getMedicalHistoryById(Integer id);

        HistoriaClinicaResponse getMedicalHistoryByIdPaciente(Integer idPaciente);

        HistoriaClinicaResponse updateMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest);
}
