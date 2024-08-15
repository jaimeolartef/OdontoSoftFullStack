package org.enterprise.odontosoft.view.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class PacienteDto {

    private Integer id;
    private String idtipodocumento;
    private String documento;
    private String primernombre;
    private String segundonombre;
    private String primerapellido;
    private String segundoapellido;
    private String fechanacimiento;
    private String ciudadnacimiento;
    private String genero;
    private String estadocivil;
    private String direccionresidencia;
    private String ciudadresidencia;
    private String telefono;
    private String correo;
    private String nombreacompanante;
    private String parentescoacompanante;
    private String telefonoacompanante;

}
