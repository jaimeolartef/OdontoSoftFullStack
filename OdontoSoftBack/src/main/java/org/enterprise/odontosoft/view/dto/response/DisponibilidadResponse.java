package org.enterprise.odontosoft.view.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalTime;

@Builder
@AllArgsConstructor
@Getter
@Setter
public class DisponibilidadResponse {

	private Integer idDisponibilidad;
	private Integer idMedico;
	private Integer dia;
	private String horaInicioam;
	private String horaFinam;
	private String horaIniciopm;
	private String horaFinpm;
	private Integer idConsultorio;
	private Integer mes;
	private Integer anio;
}
