package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.AvailabilityMapper;
import org.enterprise.odontosoft.exception.CustomException;
import org.enterprise.odontosoft.model.Entity.Disponibilidad;
import org.enterprise.odontosoft.model.Service.DisponibilidadService;
import org.enterprise.odontosoft.view.dto.request.DisponibilidadRequest;
import org.enterprise.odontosoft.view.dto.response.DisponibilidadResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Controller
public class AvailabilityControllerImpl implements AvailabilityController {

	private DisponibilidadService disponibilidadService;

	@Override
	public List<DisponibilidadResponse> findAvailabilityByDoctor(Integer idDoctor, Integer month, Integer year) {
		List<Disponibilidad> disponibilidad = disponibilidadService.findByIdMedicoAndMesAndAnio(idDoctor, month, year);
		return disponibilidad.stream()
				.map(AvailabilityMapper::toAvailabilityResponse)
				.toList();
	}

	@Override
	public List<DisponibilidadResponse> saveAvailabilityByDoctor(List<DisponibilidadRequest> disponibilidadRequests) {
		List<Disponibilidad> disponibilidad = disponibilidadRequests.stream()
				.flatMap(dispo -> AvailabilityMapper.toAvailability(dispo).stream())
				.collect(Collectors.toList());
		disponibilidad.forEach(disponibilidadResponse -> {
			if (!disponibilidadService.findByIdMedicoAndMesAndAnioAndDia(disponibilidadResponse.getIdMedico(), disponibilidadResponse.getMes(), disponibilidadResponse.getAnio(), disponibilidadResponse.getDia()).isEmpty())
				throw new CustomException("Ya existe una disponibilidad para el día " + disponibilidadResponse.getDia(), HttpStatus.CONFLICT.value());
		});
		disponibilidadService.saveAll(disponibilidad);
		return disponibilidad.stream()
				.map(AvailabilityMapper::toAvailabilityResponse)
				.toList();
	}

}
