package org.enterprise.odontosoft.view.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Setter
@Getter
public class AnalisisFuncionalRequest {

	private Integer id;
	private Integer idhistoriaclinica;
	private Boolean masticacion;
	private Boolean deglucion;
	private Boolean fonacion;
	private Boolean respiracion;
	private String idusuariocreacion;
	private LocalDateTime fechacreacion;
	private String idusuariomodificacion;
	private LocalDateTime fechamodificacion;
	private Boolean habilitado;
}
