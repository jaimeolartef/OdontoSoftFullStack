package org.enterprise.odontosoft.view.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegimenResponse {
	private Integer id;
	private String descripcion;
	private Boolean habilitado;
}
