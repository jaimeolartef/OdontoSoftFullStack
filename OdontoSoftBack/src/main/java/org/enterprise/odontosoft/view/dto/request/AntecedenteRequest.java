package org.enterprise.odontosoft.view.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class AntecedenteRequest {

    private Integer id;
    private String descripcion;
    private Boolean odontologico;
    private Boolean habilitado;
}
