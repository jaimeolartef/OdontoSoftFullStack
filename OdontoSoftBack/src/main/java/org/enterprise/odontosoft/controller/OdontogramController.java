package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.request.OdontogramaRequest;
import org.enterprise.odontosoft.view.dto.response.OdontogramaResponse;

public interface OdontogramController {

	OdontogramaResponse getOdontogramByMedicalHistory(Integer idHistoriaClinica);

	void saveOdontogram(OdontogramaRequest odontogramaRequest);
}
