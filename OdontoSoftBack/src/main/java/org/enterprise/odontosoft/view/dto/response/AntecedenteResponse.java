package org.enterprise.odontosoft.view.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Setter
@Getter
public class AntecedenteResponse {

    private Integer id;
    private String descripcion;
    private Boolean odontologico;
    private Boolean habilitado;
}
