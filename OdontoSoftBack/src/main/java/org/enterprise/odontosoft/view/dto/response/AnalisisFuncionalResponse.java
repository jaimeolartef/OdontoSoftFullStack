package org.enterprise.odontosoft.view.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.enterprise.odontosoft.model.Entity.Usuario;

import java.time.LocalDateTime;

@Data
@Builder
@Setter
@Getter
public class AnalisisFuncionalResponse {

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
