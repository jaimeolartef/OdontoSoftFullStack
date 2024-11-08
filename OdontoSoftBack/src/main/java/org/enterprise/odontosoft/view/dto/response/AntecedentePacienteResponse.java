package org.enterprise.odontosoft.view.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Setter
@Getter
public class AntecedentePacienteResponse {

    private Integer id;
    private Integer idhistoriaclinica;
    private Integer idantecedente;
    private String opciones;
    private String idusuariocreacion;
    private LocalDateTime fechacreacion;
    private String idusuariomodificacion;
    private LocalDateTime fechamodificacion;
    private Boolean habilitado;
}
