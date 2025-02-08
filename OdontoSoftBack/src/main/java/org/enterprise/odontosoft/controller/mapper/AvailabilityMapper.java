package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.Disponibilidad;
import org.enterprise.odontosoft.view.dto.request.DisponibilidadRequest;
import org.enterprise.odontosoft.view.dto.response.DisponibilidadResponse;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
				.mes(disponibilidad.getMes())
				.anio(disponibilidad.getAnio())
				.build();
	}

	public static List<Disponibilidad> toAvailability(DisponibilidadRequest disponibilidadRequest) {
		List<Disponibilidad> disponibilidades = new ArrayList<>();
		disponibilidadRequest.getDetalledisponibilidad().forEach(disponibilidad -> disponibilidades.add(Disponibilidad.builder()
				.idMedico(disponibilidadRequest.getIdmedico())
				.diaSemana(disponibilidad.getDiasemana())
				.horaInicio(Objects.nonNull(disponibilidad.getHorainicioam()) ? LocalTime.parse(disponibilidad.getHorainicioam()) : null)
				.horaFin(Objects.nonNull(disponibilidad.getHorafinam()) ? LocalTime.parse(disponibilidad.getHorafinam()) : null)
				.horainiciopm(Objects.nonNull(disponibilidad.getHorainiciopm()) ? LocalTime.parse(disponibilidad.getHorainiciopm()) : null)
				.horafinpm(Objects.nonNull(disponibilidad.getHorafinpm()) ? LocalTime.parse(disponibilidad.getHorafinpm()) : null)
				.idConsultorio(disponibilidadRequest.getIdconsultorio())
				.mes(disponibilidadRequest.getMes())
				.anio(disponibilidadRequest.getAnio())
				.build()));

		return disponibilidades;
	}
}
