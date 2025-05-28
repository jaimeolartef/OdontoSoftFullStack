package org.enterprise.odontosoft.view.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class EntidadPrestadoraSaludResponse {
	private Integer id;
	private String tipodocumento;
	private String numerodocumento;
	private String nombre;
	private String tipoentidad;
	private String codigominsalud;
	private String regimenadministra;
	private String direccion;
	private String telefono;
	private String sitioweb;
	private String correo;
	private String canalesatencion;
	private Boolean habilitado;
}
