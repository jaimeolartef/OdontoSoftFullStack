package org.enterprise.odontosoft.view.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class ConsultarPacienteDto {    
    private String documento;
    private String nombre;
}
