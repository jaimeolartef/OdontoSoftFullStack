// File: `OdontoSoftBack/src/main/java/org/enterprise/odontosoft/view/dto/request/HabitoPacienteRequest.java`

package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class HabitoPacienteRequest {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    private Integer idhabito;

    private Boolean opciones;

    @NotNull
    private String idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private String idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado;
}