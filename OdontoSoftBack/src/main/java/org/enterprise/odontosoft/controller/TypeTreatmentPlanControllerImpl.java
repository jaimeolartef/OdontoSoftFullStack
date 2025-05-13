package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.TipoTratamientoMapper;
import org.enterprise.odontosoft.model.dao.TipoTratamientoDao;
import org.enterprise.odontosoft.view.dto.response.OdontogramaResponse;
import org.enterprise.odontosoft.view.dto.response.TipoTratamientoResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Controller
public class TypeTreatmentPlanControllerImpl implements TypeTreatmentPlanController {

	private static final Logger logger = LoggerFactory.getLogger(TypeTreatmentPlanControllerImpl.class);

	private final TipoTratamientoDao tipoTratamientoDao;

	@Override
	public ResponseEntity<List<TipoTratamientoResponse>> getTypeTreatmentPlan() {
		ResponseEntity<List<TipoTratamientoResponse>> responseEntity = null;
		List<TipoTratamientoResponse> tipoTratamientosResponse = new ArrayList<>();
		try {
			tipoTratamientoDao.findAllByHabilitadoTrue().forEach(tipoTratamiento -> {
				tipoTratamientosResponse.add(TipoTratamientoMapper.toResponse(tipoTratamiento));
			});
			if (tipoTratamientosResponse.isEmpty()) {
				ResponseEntity.status(HttpStatus.NOT_FOUND).body((List<TipoTratamientoResponse>) new OdontogramaResponse(String.valueOf(HttpStatus.NOT_FOUND.value()), "No se encontró tipos de tratamiento."));
			}
			responseEntity = ResponseEntity.status(HttpStatus.OK).body(tipoTratamientosResponse);
		} catch (Exception e) {
			responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			logger.error("Error getting medical history.", e);
		}
		return responseEntity;
	}
}
