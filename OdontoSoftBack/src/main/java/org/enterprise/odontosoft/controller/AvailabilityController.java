package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.request.DisponibilidadRequest;
import org.enterprise.odontosoft.view.dto.response.DisponibilidadResponse;
import java.util.List;

public interface AvailabilityController {

	public List<DisponibilidadResponse> findAvailabilityByDoctor(Integer idDoctor, Integer month, Integer year);

	public List<DisponibilidadResponse> saveAvailabilityByDoctor(List<DisponibilidadRequest> disponibilidadRequests);
}
