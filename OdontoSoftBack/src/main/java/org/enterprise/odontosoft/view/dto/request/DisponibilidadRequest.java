package org.enterprise.odontosoft.view.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Builder
@AllArgsConstructor
@Getter
@Setter
public class DisponibilidadRequest {

	private Integer idDisponibilidad;
	private Integer idMedico;
	private Integer diaSemana;
	private LocalTime horaInicio;
	private LocalTime horaFin;
	private Integer idConsultorio;
}
