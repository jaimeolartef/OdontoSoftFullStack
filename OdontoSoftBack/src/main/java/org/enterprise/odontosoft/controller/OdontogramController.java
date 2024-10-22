package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.OdontogramaResponse;
import org.springframework.http.ResponseEntity;

public interface OdontogramController {

	ResponseEntity<OdontogramaResponse> getOdontogramByMedicalHistory(Integer idHistoriaClinica);
}
