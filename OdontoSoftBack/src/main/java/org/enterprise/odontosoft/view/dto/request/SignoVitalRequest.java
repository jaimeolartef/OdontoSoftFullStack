package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class SignoVitalRequest {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    private Double peso;

    private Double talla;

    private Double temperatura;

    private String presionarterial;

    private Double pulso;

    private Double frecuenciarespiratoria;

    @NotNull
    private String idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private String idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado;
}