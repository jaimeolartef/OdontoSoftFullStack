package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.apache.logging.log4j.util.Strings;
import org.enterprise.odontosoft.model.entity.Disponibilidad;
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
				.dia(disponibilidad.getDia())
				.horaInicioam(Objects.isNull(disponibilidad.getHoraInicio()) ? null : disponibilidad.getHoraInicio().toString())
				.horaFinam(Objects.isNull(disponibilidad.getHoraFin()) ? null : disponibilidad.getHoraFin().toString())
				.horaIniciopm(Objects.isNull(disponibilidad.getHorainiciopm()) ? null : disponibilidad.getHorainiciopm().toString())
				.horaFinpm(Objects.isNull(disponibilidad.getHorafinpm()) ? null :disponibilidad.getHorafinpm().toString())
				.idMedico(disponibilidad.getIdMedico())
				.idConsultorio(disponibilidad.getIdConsultorio())
				.mes(disponibilidad.getMes())
				.anio(disponibilidad.getAnio())
				.build();
	}

	public static List<Disponibilidad> toAvailability(DisponibilidadRequest disponibilidadRequest) {
		List<Disponibilidad> disponibilidades = new ArrayList<>();
		disponibilidadRequest.getDetalledisponibilidad().forEach(disponibilidad ->
			disponibilidades.add(Disponibilidad.builder()
				.idDisponibilidad(disponibilidad.getIdDisponibilidad() == null || disponibilidad.getIdDisponibilidad() == 0 ? null : disponibilidad.getIdDisponibilidad())
				.idMedico(disponibilidadRequest.getIdmedico())
				.dia(disponibilidad.getDia())
				.horaInicio(Objects.nonNull(disponibilidad.getHorainicioam()) && Strings.isNotBlank(disponibilidad.getHorainicioam()) ? LocalTime.parse(disponibilidad.getHorainicioam()) : null)
				.horaFin(Objects.nonNull(disponibilidad.getHorafinam()) && Strings.isNotBlank(disponibilidad.getHorafinam()) ? LocalTime.parse(disponibilidad.getHorafinam()) : null)
				.horainiciopm(Objects.nonNull(disponibilidad.getHorainiciopm()) && Strings.isNotBlank(disponibilidad.getHorainiciopm()) ? LocalTime.parse(disponibilidad.getHorainiciopm()) : null)
				.horafinpm(Objects.nonNull(disponibilidad.getHorafinpm()) && Strings.isNotBlank(disponibilidad.getHorafinpm()) ? LocalTime.parse(disponibilidad.getHorafinpm()) : null)
				.idConsultorio(disponibilidadRequest.getIdconsultorio())
				.mes(disponibilidadRequest.getMes())
				.anio(disponibilidadRequest.getAnio())
				.build())
		);

		return disponibilidades;
	}
}
