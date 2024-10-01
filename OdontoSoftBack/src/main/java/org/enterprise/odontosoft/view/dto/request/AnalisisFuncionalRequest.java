package org.enterprise.odontosoft.view.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.enterprise.odontosoft.model.Entity.Usuario;

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
	private Usuario idusuariocreacion;
	private LocalDateTime fechacreacion;
	private Usuario idusuariomodificacion;
	private LocalDateTime fechamodificacion;
	private Boolean habilitado;
}
