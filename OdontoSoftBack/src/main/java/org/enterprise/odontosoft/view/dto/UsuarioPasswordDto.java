package org.enterprise.odontosoft.view.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioPasswordDto {

	private String usuario;
	private String clave;
	private String nuevaClave;
	private String confirmarClave;
}
