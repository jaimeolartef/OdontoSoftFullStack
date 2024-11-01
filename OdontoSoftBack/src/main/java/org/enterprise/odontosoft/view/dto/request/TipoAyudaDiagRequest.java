package org.enterprise.odontosoft.view.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class TipoAyudaDiagRequest {

	private Integer id;

	private String codigo;

	private String descripcion;

	private Boolean habilitado;
}
