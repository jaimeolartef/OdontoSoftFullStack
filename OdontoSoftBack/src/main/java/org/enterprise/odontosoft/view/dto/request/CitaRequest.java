package org.enterprise.odontosoft.view.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Builder
@Setter
@Getter
public class CitaRequest {

	private Integer id;
	private String fecha;
	private String horainicio;
	private String horafin;
	private String idpaciente;
	private Boolean habilitado;
	private Integer idMedico;
	private LocalDate fechaNotificacion;
	private String motivoCancelacion;

}
