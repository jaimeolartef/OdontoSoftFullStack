package org.enterprise.odontosoft.view.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class DetalleOdontogramaResponse {

    private Integer id;


    private Integer idodontograma;
    private Integer iddiente;
    private String descripcionDiente;
    private String idestado;
    private String tratamiento;
    private LocalDateTime fechatratamiento;
    private String idusuariocreacion;
    private LocalDateTime fechacreacion;
    private String idusuariomodificacion;
    private LocalDateTime fechamodificacion;
    private Boolean habilitado;
    private Integer idsegmento;
}