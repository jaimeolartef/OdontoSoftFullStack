package org.enterprise.odontosoft.view.dto.request;

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

	private Integer idmedico;
	private Integer idconsultorio;
	private Integer mes;
	private Integer anio;
	private List<DetalleDisponibilidad> detalledisponibilidad;
}
