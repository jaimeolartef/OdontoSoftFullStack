package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.Cita;
import org.enterprise.odontosoft.model.entity.Medico;
import org.enterprise.odontosoft.model.entity.Paciente;
import org.enterprise.odontosoft.util.UtilDate;
import org.enterprise.odontosoft.view.dto.request.CitaRequest;
import org.enterprise.odontosoft.view.dto.response.CitaResponse;

@UtilityClass
public class CitaMapper {

	public static CitaResponse toCitaResponse(Cita cita) {
		return CitaResponse.builder()
			.id(cita.getId())
			.fecha(cita.getFecha().toString())
			.idMedico(cita.getIdMedico().getIdMedico().toString())
			.nombreMedico(cita.getIdMedico().getNombre())
			.horainicio(cita.getHoraInicio().toString())
			.horafin(cita.getHoraFin().toString())
			.idpaciente(cita.getIdpaciente().getId().toString())
			.nombrePaciente(cita.getIdpaciente().getNombreCompleto())
			.fechaNotificacion(cita.getFechaNotificacion())
			.motivoCancelacion(cita.getMotivoCancelacion())
			.habilitado(cita.getHabilitado())
			.build();
	}

	public static Cita toCita(CitaRequest citaRequest) {
		return Cita.builder()
			.id(citaRequest.getId())
			.fecha(UtilDate.convertToLocalDate(citaRequest.getFecha()))
			.idMedico(Medico.builder().idMedico(citaRequest.getIdMedico()).build())
			.horaInicio(UtilDate.convertToLocalTime(citaRequest.getHorainicio()))
			.horaFin(UtilDate.convertToLocalTime(citaRequest.getHorafin()))
			.idpaciente(Paciente.builder().id(Integer.valueOf(citaRequest.getIdpaciente())).build())
			.fechaNotificacion(citaRequest.getFechaNotificacion())
			.motivoCancelacion(citaRequest.getMotivoCancelacion())
			.habilitado(citaRequest.getHabilitado())
			.build();
	}
}
