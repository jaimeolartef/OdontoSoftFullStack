package org.enterprise.odontosoft.view.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class HistoriAcariesResponse {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    private LocalDateTime fechaexamen;

    private Integer idtipocuadrante;

    private Integer sanos;

    private Integer cariados;

    private Integer obturados;

    private Integer perdidos;

    private Integer extraccionindicada;

    @NotNull
    private Integer idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private Integer idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado;
}