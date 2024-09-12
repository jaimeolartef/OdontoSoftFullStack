// File: `OdontoSoftBack/src/main/java/org/enterprise/odontosoft/view/dto/request/ExamenPeriodontalRequest.java`

package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class ExamenPeriodontalRequest {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    private LocalDateTime fechaexamen;

    private Integer diente;

    private Boolean movilidad;

    private BigDecimal bolsavestibular;

    private BigDecimal bolsapalatal;

    private Boolean puntohemorragico;

    @NotNull
    private Integer idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private Integer idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado;
}