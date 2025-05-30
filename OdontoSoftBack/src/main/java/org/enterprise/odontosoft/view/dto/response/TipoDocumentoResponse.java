package org.enterprise.odontosoft.view.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TipoDocumentoResponse {

	private Integer id;
	private String codigo;
	private String nombre;
}
