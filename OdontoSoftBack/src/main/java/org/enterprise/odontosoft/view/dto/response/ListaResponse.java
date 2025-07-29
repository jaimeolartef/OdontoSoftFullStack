package org.enterprise.odontosoft.view.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListaResponse {
	private Integer id;
	private String codigo;
	private String descripcion;
	private Boolean habilitado;
	private List<ListaDetalleResponse> detalles;
}
