package org.enterprise.odontosoft.view.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Builder
@Setter
@Getter
public class CitaResponse {

	private Integer id;
	private String fecha;
	private String horainicio;
	private String horafin;
	private String idpaciente;
	private Boolean habilitado;
	private String idMedico;
	private LocalDate fechaNotificacion;
	private String motivoCancelacion;

}
