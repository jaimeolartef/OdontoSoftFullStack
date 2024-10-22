package org.enterprise.odontosoft.view.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.enterprise.odontosoft.view.dto.MensajeValidation;

import java.time.LocalDateTime;
import java.util.List;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class OdontogramaResponse extends MensajeValidation {

    private Integer id;

    @NotNull
    private Integer idhistoriaclinica;

    @NotNull
    private LocalDateTime fecha;

    @NotNull
    private Integer idusuariocreacion;

    @NotNull
    private LocalDateTime fechacreacion;

    private Integer idusuariomodificacion;

    private LocalDateTime fechamodificacion;

    private List<DetalleOdontogramaResponse> detalleodontogramas;

    @NotNull
    private Boolean habilitado;

    public OdontogramaResponse(String codigo, String mensaje) {
        super(codigo, mensaje);
    }
}