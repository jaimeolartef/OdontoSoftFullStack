package org.enterprise.odontosoft.view.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class HabitoResponse {

	private Integer id;
	private String descripcion;
	private Boolean habilitado;
}
