package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class DetalleOdontogramaRequest {

    private Integer id;

    @NotNull
    private Integer idodontograma;

    @NotNull
    private Integer iddiente;

    @NotNull
    private String idestado;

    @NotNull
    private Integer idtratamiento;

    @NotNull
    private LocalDateTime fechatratamiento;

    @NotNull
    private String idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private String idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado;

    @NotNull
    private Integer idsegmento;
}