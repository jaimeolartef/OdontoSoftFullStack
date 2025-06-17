package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.request.HistoriaClinicaRequest;
import org.enterprise.odontosoft.view.dto.response.HistoriaClinicaResponse;

import java.util.List;

public interface MedicalHistoryController {

        HistoriaClinicaResponse createMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest);

        HistoriaClinicaResponse getMedicalHistoryById(Integer id);

        List<HistoriaClinicaResponse> getMedicalHistoryByIdPaciente(Integer idPaciente);

        HistoriaClinicaResponse updateMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest);
}
