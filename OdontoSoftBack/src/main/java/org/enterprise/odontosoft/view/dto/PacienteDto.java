package org.enterprise.odontosoft.view.dto;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.enterprise.odontosoft.model.Entity.Tipodocumento;

import java.time.LocalDate;

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
