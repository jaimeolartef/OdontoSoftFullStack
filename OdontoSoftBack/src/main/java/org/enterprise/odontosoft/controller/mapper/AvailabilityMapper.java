package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.Disponibilidad;
import org.enterprise.odontosoft.view.dto.response.DisponibilidadResponse;

@UtilityClass
public class AvailabilityMapper {

	public static DisponibilidadResponse toAvailabilityResponse(Disponibilidad disponibilidad) {
		return DisponibilidadResponse.builder()
				.idDisponibilidad(disponibilidad.getIdDisponibilidad())
				.diaSemana(disponibilidad.getDiaSemana())
				.horaInicioam(disponibilidad.getHoraInicio())
				.horaFinam(disponibilidad.getHoraFin())
				.horaIniciopm(disponibilidad.getHorainiciopm())
				.horaFinpm(disponibilidad.getHorafinpm())
				.idMedico(disponibilidad.getIdMedico())
				.idConsultorio(disponibilidad.getIdConsultorio())
				.build();
	}
}
