package org.enterprise.odontosoft.view.dto.request;

import lombok.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Builder
@Setter
@Getter
public class AyudaDiagnosticaRequest {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    @NotNull
    private Integer idtipoayudadiag;

    @NotNull
    private Integer idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private Integer idusuariomodificacion;

    private LocalDateTime fechamodificacion;
}
