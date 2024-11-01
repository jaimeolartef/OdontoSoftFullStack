package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.TipoAyudaDiagResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface DiagnosticProceduresController {

	ResponseEntity<List<TipoAyudaDiagResponse>> getAllDiagnosticProcedures();
}
