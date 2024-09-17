package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Setter
@Getter
public class AnalisisOclusionRequest {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    private LocalDateTime fechaexamen;

    private String relacionmolarderecha;

    private String relacionmolarizquierda;

    private String relacioncaninaderecha;

    private String relacioncaninaizquierda;

    private BigDecimal sobremordidahorizontal;

    private Boolean dientesausentes;

    private Boolean contactoinicialrc;

    private BigDecimal sobremordidavertical;

    private Boolean soportepostadecu;

    private Boolean deflexionmandibular;

    @NotNull
    private Integer idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private Integer idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado = false;
}
