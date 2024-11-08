package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;


@Builder
@Setter
@Getter
public class AntecedentePacienteRequest {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    private Integer idantecedente;

    private String opciones;

    @NotNull
    private String idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private String idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado;
}
