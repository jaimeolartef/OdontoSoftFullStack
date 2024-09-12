package org.enterprise.odontosoft.view.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
public class OdontogramaResponse {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    @NotNull
    private LocalDateTime fecha;

    @NotNull
    private Integer idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private Integer idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    private List<DetalleOdontogramaResponse> detalleodontogramas;

    @NotNull
    private Boolean habilitado;
}