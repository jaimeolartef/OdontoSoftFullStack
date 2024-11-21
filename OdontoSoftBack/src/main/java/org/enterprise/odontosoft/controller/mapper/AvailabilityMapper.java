package org.enterprise.odontosoft.controller.mapper;

import org.enterprise.odontosoft.model.Entity.Disponibilidad;
import org.enterprise.odontosoft.view.dto.response.DisponibilidadResponse;

public class AvailabilityMapper {

	public static DisponibilidadResponse toAvailabilityResponse(Disponibilidad disponibilidad) {
		return DisponibilidadResponse.builder()
				.idDisponibilidad(disponibilidad.getIdDisponibilidad())
				.diaSemana(disponibilidad.getDiaSemana())
				.horaInicio(disponibilidad.getHoraInicio())
				.horaFin(disponibilidad.getHoraFin())
				.idMedico(disponibilidad.getIdMedico())
				.idConsultorio(disponibilidad.getIdConsultorio())
				.build();
	}
}
