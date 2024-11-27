package org.enterprise.odontosoft.controller.mapper;

import org.enterprise.odontosoft.model.Entity.Cita;
import org.enterprise.odontosoft.model.Entity.Medico;
import org.enterprise.odontosoft.model.Entity.Paciente;
import org.enterprise.odontosoft.view.dto.response.CitaResponse;

import java.sql.Time;
import java.time.LocalDate;

public class CitaMapper {

	public static CitaResponse toCitaResponse(Cita cita) {
		return CitaResponse.builder()
			.id(cita.getId())
			.fecha(cita.getFecha().toString())
			.idMedico(String.valueOf(cita.getIdMedico().getIdMedico()))
			.horainicio(cita.getHoraInicio().toString())
			.horafin(cita.getHoraFin().toString())
			.idpaciente(cita.getIdpaciente().getNombreCompleto())
			.fechaNotificacion(cita.getFechaNotificacion())
			.motivoCancelacion(cita.getMotivoCancelacion())
			.habilitado(cita.getHabilitado())
			.build();
	}

	public static Cita toCita(CitaResponse citaResponse) {
		return Cita.builder()
			.id(citaResponse.getId())
			.fecha(LocalDate.parse(citaResponse.getFecha()))
			.idMedico(Medico.builder().idMedico(Integer.valueOf(citaResponse.getIdMedico())).build())
			.horaInicio(Time.valueOf(citaResponse.getHorainicio()).toLocalTime())
			.horaFin(Time.valueOf(citaResponse.getHorafin()).toLocalTime())
			.idpaciente(Paciente.builder().id(Integer.valueOf(citaResponse.getIdpaciente())).build())
			.fechaNotificacion(citaResponse.getFechaNotificacion())
			.motivoCancelacion(citaResponse.getMotivoCancelacion())
			.habilitado(citaResponse.getHabilitado())
			.build();
	}
}
