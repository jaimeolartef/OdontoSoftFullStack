package org.enterprise.odontosoft.view.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorRequest {

	private Integer idMedico;
	private String nombre;
	private String especialidad;
	private String matricula;
}
