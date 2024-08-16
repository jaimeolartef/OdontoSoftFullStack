package org.enterprise.odontosoft.view.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MensajeError {
    private String codigo;
    private String mensaje;
}
