// File: `OdontoSoftBack/src/main/java/org/enterprise/odontosoft/view/dto/request/PlanTratamientoRequest.java`

package org.enterprise.odontosoft.view.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class PlanTratamientoResponse {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    @NotNull
    private Integer idtipotratam;

    @NotNull
    private Integer idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private Integer idusuariomodificacion;

    private LocalDateTime fechamodificacion;
}