// 3. SedeEmpresaResponse.java - Estructura de respuesta estándar
package org.enterprise.odontosoft.view.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SedeEmpresaResponse {
	private Integer id;
	private Integer numeroDocumento;
	private String nombre;
	private String direccion;
	private String telefono;
	private String correo;
	private String canalesAtencion;
	private Integer idEntidadPrestadoraSalud;
	private String entidadPrestadoraSalud;
	private Boolean habilitado;
	private String serviciosPrestados;
}