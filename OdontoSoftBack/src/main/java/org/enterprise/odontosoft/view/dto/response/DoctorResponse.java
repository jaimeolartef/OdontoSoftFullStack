package org.enterprise.odontosoft.view.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Builder
@Getter
@Setter
public class DoctorResponse {

	private Integer idMedico;
	private String nombre;
	private String especialidad;
	private String matricula;
	private Integer idtipodocumento;
	private String documento;
	private LocalDate fechanacimiento;
	private String direccionresidencia;
	private String ciudadresidencia;
	private String telefono;
	private String correo;
}
