// File: `OdontoSoftBack/src/main/java/org/enterprise/odontosoft/view/dto/request/DiagnosticoRequest.java`

package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Builder
@Getter
@Setter
public class DiagnosticoRequest {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    @NotNull
    private Integer idtipodiagnostico;

    @NotNull
    private String idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private String idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean definitivo;

    @NotNull
    private Boolean habilitado;
}