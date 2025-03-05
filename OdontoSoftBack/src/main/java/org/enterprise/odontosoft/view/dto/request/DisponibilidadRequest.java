package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@AllArgsConstructor
@Getter
@Setter
public class DisponibilidadRequest {

	@NotNull
	private Integer idmedico;
	private Integer idconsultorio;

	@NotNull
	private Integer mes;

	@NotNull
	private Integer anio;

	@NotNull
	private List<DetalleDisponibilidad> detalledisponibilidad;
}
