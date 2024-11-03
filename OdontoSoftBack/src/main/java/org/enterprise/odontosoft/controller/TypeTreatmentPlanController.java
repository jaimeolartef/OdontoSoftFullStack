package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.TipoTratamientoResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TypeTreatmentPlanController {

	ResponseEntity<List<TipoTratamientoResponse>> getTypeTreatmentPlan();
}
