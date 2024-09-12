package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class AcoplamientoDienteAntRequest {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    private LocalDateTime fechaexamen;

    private Integer idtipoacoplamiento;

    @NotNull
    private Boolean seleccion;

    @NotNull
    private Integer idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private Integer idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado;
}
