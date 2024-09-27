package org.enterprise.odontosoft.view.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class HabitoRequest {

	private Integer id;
	private String descripcion;
	private Boolean habilitado;
}
