package org.enterprise.odontosoft.view.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class EntidadPrestadoraSaludRequest {
	private Integer id;
	private String tipodocumento;
	private String numerodocumento;
	private String nombre;
	private String tipoentidad;
	private String codigominsalud;
	private String regimenadministra;
	private String direccion;
	private String telefono;
	private String sitioWeb;
	private String correo;
	private String canalesAtencion;
	private Boolean habilitado;

}
