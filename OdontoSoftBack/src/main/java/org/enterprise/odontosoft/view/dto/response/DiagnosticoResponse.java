// File: `OdontoSoftBack/src/main/java/org/enterprise/odontosoft/view/dto/request/DiagnosticoRequest.java`

package org.enterprise.odontosoft.view.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Builder
@Getter
@Setter
public class DiagnosticoResponse {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    @NotNull
    private Integer idtipodiagnostico;

    @NotNull
    private String codtipodiagnostico;

    @NotNull
    private String descripciontipodiagnostico;

    @NotNull
    private Integer idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private Integer idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean definitivo;

    @NotNull
    private Boolean habilitado;
}