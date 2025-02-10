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
public class DetalleDisponibilidad {

	private Integer id;
	private Integer diasemana;
	private String horainicioam;
	private String horafinam;
	private String horainiciopm;
	private String horafinpm;
}
