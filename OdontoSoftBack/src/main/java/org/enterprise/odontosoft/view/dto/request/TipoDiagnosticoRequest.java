package org.enterprise.odontosoft.view.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class TipoDiagnosticoRequest {
	private Integer id;

	private String codigo;

	private String descripcion;

	private Boolean habilitado;
}
