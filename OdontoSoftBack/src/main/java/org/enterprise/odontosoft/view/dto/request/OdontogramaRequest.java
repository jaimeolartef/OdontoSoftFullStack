package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
public class OdontogramaRequest {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    @NotNull
    private LocalDateTime fecha;

    @NotNull
    private String idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private Integer idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    private List<DetalleOdontogramaRequest> detalleodontogramas;

    @NotNull
    private Boolean habilitado;
}