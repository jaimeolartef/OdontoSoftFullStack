package org.enterprise.odontosoft.view.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EstadoMedicamentoRequest {

	private String nombre;
	private String descripcion;
	private Boolean habilitado;
}
