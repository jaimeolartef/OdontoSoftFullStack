package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.TipoDiagnosticoResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AnalysisController {

    List<TipoDiagnosticoResponse> getAllAnalysis();
}
