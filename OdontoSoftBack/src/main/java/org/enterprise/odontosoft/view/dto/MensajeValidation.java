package org.enterprise.odontosoft.view.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MensajeValidation {
    private String codigoValidacion;
    private String mensajeValidacion;
}
