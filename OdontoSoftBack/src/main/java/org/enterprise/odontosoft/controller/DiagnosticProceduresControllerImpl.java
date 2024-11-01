package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.TipoAyudaDiagMapper;
import org.enterprise.odontosoft.model.Dao.TipoAyudaDiagnosticaDao;
import org.enterprise.odontosoft.view.dto.response.OdontogramaResponse;
import org.enterprise.odontosoft.view.dto.response.TipoAyudaDiagResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Controller
public class DiagnosticProceduresControllerImpl implements DiagnosticProceduresController {

	private static final Logger logger = LoggerFactory.getLogger(DiagnosticProceduresControllerImpl.class);

	private final TipoAyudaDiagnosticaDao ayudaDiagnosticaDao;

	@Override
	public ResponseEntity<List<TipoAyudaDiagResponse>> getAllDiagnosticProcedures() {
		ResponseEntity<List<TipoAyudaDiagResponse>> responseEntity = null;
		List<TipoAyudaDiagResponse> tipoAyudaDiagsResponse = new ArrayList<>();
		try {
			ayudaDiagnosticaDao.findAll().forEach(tipoAyudaDiag -> {
				tipoAyudaDiagsResponse.add(TipoAyudaDiagMapper.toResponse(tipoAyudaDiag));
			});

			if (tipoAyudaDiagsResponse == null) {
				responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body((List<TipoAyudaDiagResponse>) new OdontogramaResponse(String.valueOf(HttpStatus.NOT_FOUND.value()), "No se encontró tipos de diagnóstico."));
			}
			responseEntity = ResponseEntity.status(HttpStatus.OK).body(tipoAyudaDiagsResponse);
		} catch (Exception e) {
			responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			logger.error("Error getting medical history.", e);
		}
		return responseEntity;
	}
}
