package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Builder
@AllArgsConstructor
@Getter
@Setter
public class DetalleDisponibilidad {

	private Integer id;
	@NotNull
	private Integer dia;
	private String horainicioam;
	private String horafinam;
	private String horainiciopm;
	private String horafinpm;
	private Integer idDisponibilidad;
}
