package org.enterprise.odontosoft.view.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class DetalleOdontogramaResponse {

    private Integer id;

    @NotNull
    private Integer idodontograma;

    @NotNull
    private Integer iddiente;

    @NotNull
    private Integer idestado;

    @NotNull
    private Integer idtratamiento;

    @NotNull
    private LocalDateTime fechatratamiento;

    @NotNull
    private Integer idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private Integer idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado;
}