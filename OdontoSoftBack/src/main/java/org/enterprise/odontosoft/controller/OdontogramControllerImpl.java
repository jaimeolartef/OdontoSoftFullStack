package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.OdontogramaMapper;
import org.enterprise.odontosoft.model.Dao.OdontogramaDao;
import org.enterprise.odontosoft.model.Entity.Odontograma;
import org.enterprise.odontosoft.view.dto.response.OdontogramaResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class OdontogramControllerImpl implements OdontogramController {

	private final OdontogramaDao odontogramaDao;

	private static final Logger logger = LoggerFactory.getLogger(OdontogramControllerImpl.class);

	@Override
	public ResponseEntity<OdontogramaResponse> getOdontogramByMedicalHistory(Integer idHistoriaClinica) {
		ResponseEntity<OdontogramaResponse> responseEntity = null;
		try {
			Odontograma odontograma = odontogramaDao.findByIdhistoriaclinica(idHistoriaClinica).orElse(null);
			if (odontograma == null) {
				responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body(new OdontogramaResponse(String.valueOf(HttpStatus.NOT_FOUND.value()), "No se encontró el odontograma"));
				return responseEntity;
			}
			responseEntity = ResponseEntity.status(HttpStatus.OK).body(OdontogramaMapper.toResponse(odontograma));
		} catch (Exception e) {
			responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			logger.error("Error getting medical history.", e);
		}

		return responseEntity;
	}
}
