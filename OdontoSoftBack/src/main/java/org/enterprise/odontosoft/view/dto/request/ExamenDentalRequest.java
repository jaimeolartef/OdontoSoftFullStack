// File: `OdontoSoftBack/src/main/java/org/enterprise/odontosoft/view/dto/request/ExamenDentalRequest.java`

package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Builder
@Getter
@Setter
public class ExamenDentalRequest {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    private LocalDateTime fechaexamen;

    @Size(max = 20)
    private String denticion;

    @Size(max = 20)
    private String formarcosuperior;

    @Size(max = 20)
    private String formarcoinferior;

    @Size(max = 20)
    private String simetriarcosuperior;

    @Size(max = 20)
    private String simetriarcoinferior;

    @Size(max = 20)
    private String riesgocaries;

    @NotNull
    private Integer idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private Integer idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado;
}