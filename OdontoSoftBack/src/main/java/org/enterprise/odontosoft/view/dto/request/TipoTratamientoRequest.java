package org.enterprise.odontosoft.view.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class TipoTratamientoRequest {

	private Integer id;

	private String codigo;

	private String descripcion;

	private Boolean habilitado;
}
