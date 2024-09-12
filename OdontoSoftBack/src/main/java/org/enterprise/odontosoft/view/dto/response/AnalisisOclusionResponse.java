package org.enterprise.odontosoft.view.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.enterprise.odontosoft.model.Entity.Usuario;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Setter
@Getter
public class AnalisisOclusionResponse {

    private Integer id;

    @NotNull
    private HistoriaClinicaResponse idhistoriaclinica;

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
    private Usuario idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private Usuario idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado = false;
}
