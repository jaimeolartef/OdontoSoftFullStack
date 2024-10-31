package org.enterprise.odontosoft.view.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class TipoDiagnosticoResponse {
	private Integer id;

	private String codigo;

	private String descripcion;

	private Boolean habilitado;
}
