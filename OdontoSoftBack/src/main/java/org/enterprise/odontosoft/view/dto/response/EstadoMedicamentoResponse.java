package org.enterprise.odontosoft.view.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EstadoMedicamentoResponse {

	private Long id;
	private String nombre;
	private String descripcion;
	private Boolean habilitado;
}
