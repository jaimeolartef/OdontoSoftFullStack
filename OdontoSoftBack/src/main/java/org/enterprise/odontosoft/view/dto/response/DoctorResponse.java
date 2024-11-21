package org.enterprise.odontosoft.view.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class DoctorResponse {

	private Integer idMedico;
	private String nombre;
	private String especialidad;
	private String matricula;
}
