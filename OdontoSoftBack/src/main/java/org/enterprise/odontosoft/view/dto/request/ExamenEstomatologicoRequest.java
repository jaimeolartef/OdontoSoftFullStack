// File: `OdontoSoftBack/src/main/java/org/enterprise/odontosoft/view/dto/request/ExamenEstomatologicoRequest.java`

package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;


@Builder
@Getter
@Setter
public class ExamenEstomatologicoRequest {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    @NotNull
    private Boolean labiosuperior;

    @NotNull
    private Boolean labioinferior;

    @NotNull
    private Boolean comisura;

    @NotNull
    private Boolean menton;

    @NotNull
    private Boolean frenillos;

    @NotNull
    private Boolean surcosvestibulares;

    @NotNull
    private Boolean carrillos;

    @NotNull
    private Boolean procesosalveolares;

    @NotNull
    private Boolean regionfaringea;

    @NotNull
    private Boolean paladarblando;

    @NotNull
    private Boolean paladarduro;

    @NotNull
    private Boolean pisoboca;

    @NotNull
    private Boolean dorsolengua;

    @NotNull
    private Boolean vientrelengua;

    @NotNull
    private Boolean glandulasparotidas;

    @NotNull
    private Boolean glandulassublinguales;

    @NotNull
    private Boolean glandulassubmaxilares;

    @NotNull
    private Boolean glandulassalivaresmenores;

    @NotNull
    private Boolean maxilarsuperior;

    @NotNull
    private Boolean maxilarinferior;

    @NotNull
    private String idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private String idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado;
}