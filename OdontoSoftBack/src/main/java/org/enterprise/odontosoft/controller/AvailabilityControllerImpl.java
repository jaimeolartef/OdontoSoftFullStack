package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.AvailabilityMapper;
import org.enterprise.odontosoft.model.Dao.DisponibilidadDao;
import org.enterprise.odontosoft.model.Entity.Disponibilidad;
import org.enterprise.odontosoft.view.dto.response.DisponibilidadResponse;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Controller
public class AvailabilityControllerImpl implements AvailabilityController {

	private final DisponibilidadDao disponibilidadDao;

	@Override
	public List<DisponibilidadResponse> findAvailabilityByDoctor(Integer idDoctor, Integer month, Integer year) {
		List<Disponibilidad> disponibilidad = disponibilidadDao.findByIdMedicoAndMesAndAnio(idDoctor, month, year);
		return disponibilidad.stream()
				.map(dispo -> AvailabilityMapper.toAvailabilityResponse(dispo))
				.collect(Collectors.toList());
	}

}
