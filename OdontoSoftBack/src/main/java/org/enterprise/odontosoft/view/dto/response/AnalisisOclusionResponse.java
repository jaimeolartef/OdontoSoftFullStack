package org.enterprise.odontosoft.view.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@Setter
@Getter
public class AnalisisOclusionResponse {

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
    private String idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private String idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado = false;
}
