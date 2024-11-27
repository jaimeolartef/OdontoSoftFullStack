package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.CitaResponse;

import java.util.List;

public interface AppointmentController {

	List<CitaResponse> findByMedico(Integer idMedico);
}
