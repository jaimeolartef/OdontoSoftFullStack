package org.enterprise.odontosoft.view.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SedeEmpresaRequest {

	private Integer id;

	@NotBlank(message = "El nombre es obligatorio")
	@Size(max = 255, message = "El nombre no puede exceder 255 caracteres")
	private String nombre;

	@Size(max = 255, message = "La dirección no puede exceder 255 caracteres")
	private String direccion;

	@Size(max = 50, message = "El teléfono no puede exceder 50 caracteres")
	private String telefono;

	@Email(message = "El formato del correo electrónico no es válido")
	@Size(max = 255, message = "El correo no puede exceder 255 caracteres")
	private String correo;

	@Size(max = 255, message = "Los canales de atención no pueden exceder 255 caracteres")
	private String canalesAtencion;

	@NotNull(message = "El estado de habilitación es obligatorio")
	private Boolean habilitado;

	@NotNull(message = "La entidad prestadora de salud es obligatoria")
	private Integer idEntidadPrestadoraSalud;
}